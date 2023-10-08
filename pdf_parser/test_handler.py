import json
from pathlib import Path
from pprint import pprint

from pdf_parser import read_pdf_and_output_text, drop_unnecessary_text_from_output, \
    fetch_section_ids_from_index_page, split_text_by_sections, extract_definitions, drop_unnecessary_sections


def test_read_pdf_and_output_text():
    pdf_path = Path(r"C:\Users\reube\Desktop\Projects\SpaceHack2K23-STAR\pdf_parser\test_pdf.pdf")

    data = read_pdf_and_output_text(pdf_path=pdf_path)
    data = drop_unnecessary_text_from_output(data)
    final_string = "\n".join([value for _, value in data.items()])
    with open("pure_text_output.txt", "w", encoding='utf8') as output:
        output.write(final_string)

    section_data = fetch_section_ids_from_index_page(data)
    section_text_data = split_text_by_sections(data, section_data)
    clean_section_data_intermediate = drop_unnecessary_sections(section_text_data,['scope','applicable documents'])

    definitions = extract_definitions(clean_section_data_intermediate)
    with open("definitions.json", "w", encoding='utf8') as output:
        json.dump(definitions, output, indent=2)

    clean_section_data_final = drop_unnecessary_sections(clean_section_data_intermediate, ['definitions'])
    with open("section_split_up.json", "w", encoding='utf8') as output:
        json.dump(clean_section_data_final, output, indent=2)

