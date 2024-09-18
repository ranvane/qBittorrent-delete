#!/usr/bin/env python3
import qbittorrentapi
import os
import time
import re
from pathlib import Path
from loguru import logger


from regex_pattern import (
    cancel_download_list,
    replace_list,
    file_extensions,
    domain_suffix_pattern,
    image_suffix_pattern,
)


def test():
    filename = "[MP4/ 94M] 美女在沙发上撅着屁屁 被大吊无套爆菊花 爽叫不停 射了一丢丢 | 國內原創"
    filename = filename.replace(" ", "")
    # cancel_regex_list = [
    #     re.compile(regex, re.IGNORECASE) for regex in cancel_download_list
    # ]
    # for regex in cancel_regex_list:
    #     match = re.search(regex, filename)
    #     if match:
    #         print(f"cancel_download_list: {regex.pattern}")
    # cancel_regex_list = [
    #     re.compile(regex, re.IGNORECASE) for regex in cancel_download_list
    # ]
    # for regex in cancel_regex_list:
    #     match = re.search(regex, filename)
    #     if match:
    #         print(f"cancel_download_list: {regex.pattern}")

    replace_regex_list = [re.compile(regex, re.IGNORECASE) for regex in replace_list]
    for regex in replace_regex_list:
        match = re.search(regex, filename)
        if match:
            new_name = (
                re.sub(regex, "", filename).replace(" ", "").strip()
            )  # re.sub替换
            print(f"replace_list: {regex.pattern}")
            print(new_name)
            print(domain_suffix_pattern)


if __name__ == "__main__":
    test()
