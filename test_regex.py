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


def connect_to_qbittorrent():
    client = qbittorrentapi.Client(
        host="192.168.10.200", port=8080, username="ranvane", password="fjgh1148028"
    )
    try:
        client.auth_log_in()
        logger.info("成功连接到 qBittorrent 客户端")
        return client
    except qbittorrentapi.LoginFailed as e:
        logger.info(f"连接到 qBittorrent 客户端失败：{e}")
        return None


def disconnect_from_qbittorrent(client):
    try:
        client.auth_log_out()
        logger.info("已断开与 qBittorrent 客户端的连接")
    except Exception as e:
        logger.info(f"断开与 qBittorrent 客户端的连接失败：{e}")


def set_excluded_file_names():
    client = connect_to_qbittorrent()
    if client:
        try:
            qb_excluded_file_names = client.app_preferences()["excluded_file_names"]
            if not qb_excluded_file_names:
                qb_excluded_file_names = []
            else:
                qb_excluded_file_names = [
                    name.strip() for name in qb_excluded_file_names.split("\n")
                ]
            with open("排除的文件名.txt", "r", encoding="utf-8") as file:
                lines = file.readlines()
                # 去除每行末尾的换行符并生成列表
                file_excluded_file_names = [line.strip() for line in lines]

            new_excluded_file_names = []
            for item in qb_excluded_file_names + file_excluded_file_names:
                if item not in new_excluded_file_names:
                    new_excluded_file_names.append(item)
            new_excluded_file_names = "\n".join(new_excluded_file_names)

            client.app_set_preferences({"excluded_file_names": new_excluded_file_names})

            with open("排除的文件名.txt", "w", encoding="utf-8") as file:
                file.writelines(new_excluded_file_names)

            logger.info("成功设置排除的文件名功能")

        except Exception as e:
            logger.info(f"设置排除的文件名功能失败：{e}")
        finally:
            disconnect_from_qbittorrent(client)


def test():

    filename = "IPZZ-444 婚妇女的家庭美容院美丽的美容师 被她丑陋的邻居的猥亵鸡巴不断地射精 仲村みう  中字原創"
    #     filename = filename.replace(" ", "")
    #     # cancel_regex_list = [
    #     #     re.compile(regex, re.IGNORECASE) for regex in cancel_download_list
    #     # ]
    #     # for regex in cancel_regex_list:
    #     #     match = re.search(regex, filename)
    #     #     if match:
    #     #         print(f"cancel_download_list: {regex.pattern}")
    #     # cancel_regex_list = [
    #     #     re.compile(regex, re.IGNORECASE) for regex in cancel_download_list
    #     # ]
    #     # for regex in cancel_regex_list:
    #     #     match = re.search(regex, filename)
    #     #     if match:
    #     #         print(f"cancel_download_list: {regex.pattern}")

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
    # regex = re.compile(r"^\d{1,6}\.", re.IGNORECASE)
    # print(re.sub(regex, "", filename))


if __name__ == "__main__":
    test()
