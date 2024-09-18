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
    filename = "865539.xyz 1800RMB拿下极品学生妹，丰满阴户流水潺潺充满粘液的拉丝 抽插潮吹体质高潮子宫不断的痉挛"
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
    # for regex in replace_regex_list:
    #     match = re.search(regex, filename)
    #     if match:
    #         new_name = re.sub(regex, "", filename).replace(" ", "").strip() #re.sub替换
    #         print(f"replace_list: {regex.pattern}")
    #         print(new_name)
    #         print(domain_suffix_pattern)
    regex = re.compile(r"^\d{1,6}" + domain_suffix_pattern, re.IGNORECASE)
    print(re.sub(regex, "", filename))


if __name__ == "__main__":
    test()
