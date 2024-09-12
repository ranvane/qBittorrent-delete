#!/usr/bin/env python3

import re
from pathlib import Path

from regex_pattern import (
    cancel_download_list,
    replace_list,
    file_extensions,
    domain_suffix_pattern,
    image_suffix_pattern,
)


def test():
    str = "1"
    str = str.replace(" ", "")
    cancel_regex_list = [
        re.compile(regex, re.IGNORECASE) for regex in cancel_download_list
    ]
    for regex in cancel_regex_list:
        match = re.search(regex, str)
        if match:
            print(f"cancel_download_list: {regex.pattern}")
    cancel_regex_list = [
        re.compile(regex, re.IGNORECASE) for regex in cancel_download_list
    ]
    for regex in cancel_regex_list:
        match = re.search(regex, str)
        if match:
            print(f"cancel_download_list: {regex.pattern}")

    replace_regex_list = [re.compile(regex, re.IGNORECASE) for regex in replace_list]
    for regex in replace_regex_list:
        match = re.search(regex, str)

        if match:
            print(f"replace_list: {regex.pattern}")
            print(re.sub(regex, "", str))


if __name__ == "__main__":
    test()
