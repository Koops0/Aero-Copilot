#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys

from spaceHack2k23.dynamodb import DynamoDB

# from spaceHack2k23 import dynamodb


def main():
    """Run administrative tasks."""
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "spaceHack2k23.settings")
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc

    execute_from_command_line(sys.argv)

    # initialize dynamodb


if __name__ == "__main__":
    main()
