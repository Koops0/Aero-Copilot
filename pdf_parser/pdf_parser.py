from pathlib import Path
from tempfile import TemporaryDirectory
from urllib.parse import unquote_plus

import boto3
import re
from unflatten import unflatten

from aws_lambda_powertools.utilities.data_classes import S3Event, event_source
from pypdf import PdfReader
import fitz

s3_client = boto3.client('s3')


def fetch_file_from_s3(temp_dir: Path, s3_bucket: str, s3_key: str) -> Path:
    local_file_path = temp_dir.joinpath('pdf_file.txt')
    s3_client.download_file(s3_bucket, s3_key, str(local_file_path))
    return local_file_path


def read_pdf_and_output_text(pdf_path: Path) -> dict:
    # reader = PdfReader(str(pdf_path))
    # number_of_pages = len(reader.pages)
    # return {i: reader.pages[i].extract_text() for i in range(number_of_pages)}

    with fitz.open(str(pdf_path)) as doc:  # open document
        return {page_no: page.get_text() for page_no, page in enumerate(doc)}
        # text = chr(12).join([page.get_text() for page in doc])


def drop_unnecessary_text_from_output(output_data: dict) -> dict:
    new_output_data = {}
    for page, text in output_data.items():
        if page == 0:
            # Skip first page
            continue

        regex = rf".*{page + 1} of \d{{2,3}}(.*)"
        subst = "\\1"
        stripped_header_footer = re.sub(regex, subst, text, 1, re.DOTALL | re.IGNORECASE)
        new_output_data[page] = stripped_header_footer.strip()

    return new_output_data


def fetch_section_ids_from_index_page(output_data: dict) -> dict:
    text_as_string = "\n".join([value for _, value in output_data.items()])

    regex = r"^(\d{1,2}\.(?:\d{1,2}|\s))(.*?)[\s+]\.\.\.\.\.\.\.\."
    matches = re.finditer(regex, text_as_string, re.MULTILINE | re.DOTALL)

    return_dict = {}
    for matchNum, match in enumerate(matches, start=1):
        section_id = match.group(1).strip()
        section_name = match.group(2).strip().replace('\n', '')
        # section_name = ' '.join(section_name.split())
        return_dict[section_id] = section_name

    return return_dict


def split_text_by_sections(output_data: dict, section_id_info: dict):
    text_as_string = "\n".join([value for _, value in output_data.items()])

    temp = None
    temp_for_display = None
    final_output = {}

    for key, value in section_id_info.items():
        blah = f"{key} {value}"
        key = key.replace('.', '\\.').strip()
        value = ' '.join(value.split()).replace(' ', r'\s+')
        if temp is None:
            temp_for_display = blah
            temp = (key, value)
            continue

        old_values = temp
        new_values = key, value
        temp = new_values

        regex = rf"{old_values[0]} \n{old_values[1]}(.*?){new_values[0]} \n{new_values[1]}"

        matches = re.findall(regex, text_as_string, re.MULTILINE | re.DOTALL)
        final_output[temp_for_display] = matches[1].strip()
        temp_for_display = blah

    final_output = unflatten(final_output)

    final_final_output = {}
    for key, section in final_output.items():
        temp_data = {}
        header = ""
        section_id = key
        for key1, subsection in section.items():
            if key1.startswith(' '):
                header = f"{section_id} -- {key1.strip()}"
            else:
                regex = r"\s?(\d+)\s?(.*)"
                matches = re.findall(regex, key1, re.MULTILINE)

                subheader_id = matches[0][0]
                subheader_text = matches[0][1]
                temp = f"{section_id}.{subheader_id} -- {subheader_text}"
                temp_data[temp.title()] = subsection
        final_final_output[header.title()] = temp_data

    return final_final_output


def drop_unnecessary_sections(section_text_dict: dict, sections_to_drop: list) -> dict:
    final_dict = {}
    for key, value in section_text_dict.items():
        for section in sections_to_drop:
            if section in key.strip().lower() :
                break
        else:
            final_dict[key] = value
    return final_dict


def extract_definitions(section_data: dict) -> dict:
    final_dict = {}
    for key, definition_data in section_data.items():
        if 'definitions' in key.lower():
            text_as_string = "\n".join([value for _, value in definition_data.items()])

            regex = r"^(.*):"
            matches = re.findall(regex, text_as_string, re.MULTILINE)

            temp = None
            for definition in matches:

                if temp is None:
                    temp = definition
                    continue

                v1 = temp.replace('(', r'\(').replace(')', '\)')
                v2 = definition.replace('(', r'\(').replace(')', '\)')
                regex = rf"{v1}:(.*){v2}:"

                matches = re.findall(regex, text_as_string, re.MULTILINE | re.DOTALL)

                value = matches[0].strip().replace('\n',' ')
                value = re.sub(r"\s\s+", " ", value)

                final_dict[temp] = value
                temp = definition

            regex = rf"{temp}:(.*)"

            matches = re.findall(regex, text_as_string, re.MULTILINE | re.DOTALL)

            value = matches[0].strip().replace('\n', ' ')
            value = re.sub(r"\s\s+", " ", value)

            final_dict[temp] = value
    return final_dict


@event_source(data_class=S3Event)
def lambda_handler(event: S3Event, context):
    bucket_name = event.bucket_name
    with TemporaryDirectory() as temp_dir:
        temp_dir_path = Path(temp_dir)
        for record in event.records:
            object_key = unquote_plus(record.s3.get_object.key)
            local_file_path = fetch_file_from_s3(temp_dir=temp_dir_path, s3_bucket=bucket_name, s3_key=object_key)
            data = read_pdf_and_output_text(pdf_path=local_file_path)
            data = drop_unnecessary_text_from_output(data)
