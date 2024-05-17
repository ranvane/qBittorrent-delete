#!/usr/bin/env python3
import qbittorrentapi
import os
import time
import re
from pathlib import Path

# 定义图片后缀的正则表达式片段
image_suffix_pattern = (
    r"\.(?:"
    + "|".join(
        [
            "png",
            "jpg",
            "gif",
        ]
    )
    + ")"
)
# 定义域名后缀的正则表达式片段
domain_suffix_pattern = (
    r"\.(?:"
    + "|".join(
        [
            "com",
            "net",
            "org",
            "edu",
            "gov",
            "biz",
            "info",
            "uk",
            "cn",
            "xyz",
            "cc",
        ]
    )
    + ")"
)


file_extensions = [
    ".gif",
    ".txt",
    ".url",
    ".chm",
    ".CHM",
    ".apk",
    ".zip",
    ".rar",
    ".htm",
    ".html",
    ".mhtml",
    ".apk",
    ".mht",
]


# 重命名字符串列表
# * 零次或多次 + 至少一次 ？ 最多匹配一次

replace_list = [
    r"[a-z0-9]{3,9}" + domain_suffix_pattern + r"-?",
    r"[a-z0-9]{3,9}" + domain_suffix_pattern + r"@?",
    r"[a-z0-9]{3,9}" + domain_suffix_pattern,
    r"\d{1,4}_",
    r"(同城美女.+)\d{1,4}",
    r"【.*】",
]

# 取消下载正则表达式字符串
cancel_download_list = [
    domain_suffix_pattern + "\.mp4",
    r"_91.*",
    r"_51.*",
    r"_麻豆传媒.*",
    r"_TikTok成人版.*",
    r"宣傳文檔.*",
    r"成人.{0,1}游.*",
    r"_快手社区.*",
    r"_暗网禁地.*",
    r"_海角乱伦.*",
    r"_缅北禁地.*",
    r"_?暗网解密.*",
    r"_欲漫涩.*",
    r"视频资源.*",
    r"_抖阴pro.*",
    r"_乱伦社区.*",
    r"_AI色色.*",
    r"91制片厂.*",
    r"扫码下载.*",
    r"AI处理技术.*",
    r"2048(QR)|(社区)|(社區).*",
    r"美女直播.*mp4",
    r"直播.*推荐.*mp4",
    r"直播大秀.*mp4",
    r"激情隨時看.*mp4",
    r"荷官.*mp4",
    r"N房间.*mp4",
    r"★★★.*",
    r"斗罗大陆.*",
    r"狗仔视频.*",
    r"人间尤物.mp4",
    r"注册.*",
    r".*fun.*mp4",
    r"《★.*》.*",
    r"社.*区.*报.mp4",
    r" H.*漫.*画.",
    r"凤凰娱乐.*mp4",
    r"成人版.*mp4",
    r"-重磅核弹国产.*mp4|avi",
    r"最新地址.*",
    r"最新地址.*mp4",
    r"星空天使.*",
    r"约炮平台" + image_suffix_pattern,
    r"入有.*" + image_suffix_pattern,
    r"同城.*" + image_suffix_pattern,
    r"工口.*" + image_suffix_pattern,
]


# 连接到 qBittorrent 客户端
def connect_to_qbittorrent():
    client = qbittorrentapi.Client(
        host="192.168.31.200", port=8080, username="ranvane", password="fjgh1148028"
    )
    try:
        client.auth_log_in()
        print("成功连接到 qBittorrent 客户端")
        return client
    except qbittorrentapi.LoginFailed as e:
        print(f"连接到 qBittorrent 客户端失败：{e}")
        return None


def disconnect_from_qbittorrent(client):
    try:
        client.auth_log_out()
        print("已断开与 qBittorrent 客户端的连接")
    except Exception as e:
        print(f"断开与 qBittorrent 客户端的连接失败：{e}")


# 提取最靠近根目录的文件夹
def get_top_level_folder(path):
    # 按路径分割成目录列表
    folders = path.split("/")
    # 去除空字符串和根目录
    folders = [folder for folder in folders if folder]
    # 返回最顶层的文件夹名
    return folders[0]


# 获取文件的父文件夹路径和文件名
def get_parent_folder_and_filename(filepath):
    parent_folder, filename = os.path.split(filepath)
    parent_folder = parent_folder.replace(" ", "")
    filename = filename.replace(" ", "")
    return parent_folder, filename


# 重命名包含指定字符串的文件夹
def rename_folders(client, replace_str_list):
    """
    重命名包含指定字符串的文件夹
    """
    print("重命名包含指定字符串的文件夹...")
    # 使用列表推导式批量编译这些正则表达式
    regex_list = [re.compile(regex) for regex in replace_str_list]
    for torrent in client.torrents.info():
        for file in torrent.files:
            parent_folder, filename = get_parent_folder_and_filename(file.name)

            if file.priority > 0:  # 只替换优先级大于0的文件
                for regex in regex_list:

                    new_folder_path = re.sub(regex, "", parent_folder)
                    new_folder_path = new_folder_path.strip()
                    try:
                        if new_folder_path != parent_folder:
                            client.torrents_rename_folder(
                                torrent_hash=torrent.hash,
                                old_path=parent_folder,
                                new_path=new_folder_path,
                            )
                    except Exception as e:
                        print(f"重命名文件夹失败：{e}")


# 重命名包含指定字符串的文件
def rename_files(client, replace_str_list):
    """
    重命名包含指定字符串的文件
    """
    print("重命名包含指定字符串的文件...")

    # 使用列表推导式批量编译这些正则表达式
    regex_list = [re.compile(regex, re.IGNORECASE) for regex in replace_str_list]
    for torrent in client.torrents.info():
        for file in torrent.files:
            parent_folder, filename = get_parent_folder_and_filename(file.name)

            if file.priority > 0:  # 只替换优先级大于0的文件
                for regex in regex_list:
                    new_name = re.sub(regex, "", filename)
                    print(
                        f"重命名包含指定字符串的文件：{file.name} {file.priority} {regex.pattern}"
                    )
                    new_name = new_name.strip()
                    # 组合新的文件名和父文件夹路径
                    new_path = os.path.join(parent_folder, new_name)
                    try:

                        if new_path != file.name:

                            client.torrents_rename_file(
                                torrent_hash=torrent.hash,
                                old_path=file.name,
                                new_path=new_path,
                            )
                    except Exception as e:
                        print(f"重命名文件失败：{e}")


def cancel_downloading_files_with_extension(client, file_extensions):
    """
    取消下载指定后缀名的文件
    """
    print("取消下载指定后缀名的文件...")
    for torrent in client.torrents.info():
        for file in torrent.files:
            parent_folder, filename = get_parent_folder_and_filename(file.name)
            # 使用os.path.splitext()提取后缀
            _, file_extension = os.path.splitext(filename)

            if file.priority > 0:  # 只替换优先级大于0的文件

                if file_extension in file_extensions:
                    # print(f"取消下载：{file.name} {file.priority}")
                    try:
                        client.torrents_file_priority(torrent.hash, file.index, 0)
                        time.sleep(0.5)
                    except Exception as e:
                        print(f"取消下载：{file.name} 失败！")


def cancel_downloading_matching_regex(client, cancel_download_list):
    """取消下载符合正则表达式的文件和文件夹"""
    print("取消下载符合正则表达式的文件和文件夹...")
    # 使用列表推导式批量编译这些正则表达式
    regex_list = [re.compile(regex, re.IGNORECASE) for regex in cancel_download_list]
    for torrent in client.torrents.info():
        for file in torrent.files:
            parent_folder, filename = get_parent_folder_and_filename(file.name)
            # print(f"{file.name}")
            if file.priority > 0:  # 只取消优先级大于0的文件
                for regex in regex_list:
                    if regex.search(file.name):
                        print(f"取消下载：{file.name} {file.priority} {regex.pattern}")
                        client.torrents_file_priority(torrent.hash, file.index, 0)
                        time.sleep(0.5)


def rename_torrent_name(client):
    """
    重命名种子名
    """
    print("重命名种子名...")
    for torrent in client.torrents.info():
        tmp_name = ""
        for file in torrent.files:
            if file.priority > 0:  # 优先级大于0的文件
                tmp_name = get_top_level_folder(file.name)

        if torrent.name != tmp_name:

            try:
                print(f"重命名种子：{torrent.name} -> {tmp_name}")
                client.torrents_rename(torrent.hash, new_torrent_name=tmp_name)
            except Exception as e:
                print(f"重命名种子：{torrent.name} -> {tmp_name} 失败")


def main():

    client = connect_to_qbittorrent()
    if client:
        try:

            rename_folders(client, replace_list)
            cancel_downloading_files_with_extension(client, file_extensions)
            cancel_downloading_matching_regex(client, cancel_download_list)
            rename_files(client, replace_list)
            rename_torrent_name(client)
        finally:
            disconnect_from_qbittorrent(client)


if __name__ == "__main__":
    main()

