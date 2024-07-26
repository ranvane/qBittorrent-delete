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
    r"[a-z0-9]{2,10}" + domain_suffix_pattern,
    r"^\d{1,5}\.",
    r"^\d{1,5} ",
    r"^\d{1,5}",
    r"(同城美女.+)\d{1,4}",
    r"【.*】",
    r"^@",
    r"^-",
    r"^,",
    r"^\.",
    r"^ ",
    r"^_",
    r"^=",
    r"網紅原創--",
    r"-搶先發布-",
]
# 取消下载正则表达式字符串
cancel_download_list = [
    domain_suffix_pattern + "\.mp4",
    r"_91.*",
    r"度灰.*",
    r"帝王恩宠.*",
    r".*H漫.*",
    r".*H動漫.mp4",
    r"AI色色.*",
    r"三国志.*",
    r"草榴.*",
    r"萌妹屋.*",
    r"金三角.*",
    r"老王社区.*",
    r"_乱伦社区.*",
    r"妻友.*",
    r"广告.*",
    r"暗香阁.*",
    r"黑料社.*",
    r"91短视频.*",
    r"使用方法.*",
    r"番號大全.*",
    r"在线播放.*",
    r"磁力.*",
    r"最新资讯.*",
    r"挑战自我.*释放天性.*",
    r"发布.*jpg",
    r"窥视TV.*",
    r"麻豆传媒破解.*",
    r"外网禁忌.*",
    r"_TikTok成人版.*",
    r"宣傳文檔.*",
    r"成人.{0,1}游.*",
    r"_快手社区.*",
    r"_暗网.*",
    r"_海角乱伦.*",
    r"在线影城.*",
    r"内涵AV.*",
    r"汇聚全球.*",
    r"缅北禁地.*",
    r"极乐禁地.*",
    r"_?暗网解密.*",
    r"_欲漫涩.*",
    r"视频资源.*",
    r"_抖阴pro.*",
    r"_乱伦社区.*",
    r"_AI色色.*",
    r"91制片厂.*",
    r"_bilibili.*",
    r"_糖心.*",
    r"_杏吧.*",
    r"平台.*",
    r"下载.*(mp4|jpg|png)",
    r"BETANO.*",
    r"__哔咔.*",
    r"AI处理技术.*",
    r"2048(QR)|(社区)|(社區).*",
    r"美女直播.*(mp4|jpg|png)",
    r"直播.*推荐.*mp4",
    r"逼哩.*",
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
    r" H.*漫.*",
    r"凤凰娱乐.*mp4",
    r"成人版.*mp4",
    r"-重磅核弹国产.*(mp4|avi)",
    r"全网最新.*",
    r"最新地址.*",
    r"成人18禁游.*",
    r"星空天使.*",
    r"污漫.*",
    r"九游.*",
    r"手游.*",
    r"小舞.*",
    r"VPN.*",
    r"色中色.*",
    r"约炮平台" + image_suffix_pattern,
    r"入有.*" + image_suffix_pattern,
    r"同城.*" + image_suffix_pattern,
    r"工口.*" + image_suffix_pattern,
    r"QRCODE.*" + image_suffix_pattern,
    r"含羞草.*",
    r"俱樂部.*",
    r"積分.*",
    r"註冊.*",
    r"悠亞陪玩.*",
    r"遊戲.*",
    r"宝可梦.*",
    r"次元穿越.*",
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


# 重命名包含指定字符串的文件夹
def rename_folders(client, replace_str_list):
    """
    重命名包含指定字符串的文件夹,对于bt来说，只替换最顶层的文件夹
    """
    print("重命名包含指定字符串的文件夹...")
    # 使用列表推导式批量编译这些正则表达式
    regex_list = [re.compile(regex) for regex in replace_str_list]
    for torrent in client.torrents.info():
        for file in torrent.files:
            # 创建Path实例
            p = Path(file.name)

            # 获取各部分
            top_folder = p.parts[0]

            for regex in regex_list:

                new_folder_path = re.sub(regex, "", top_folder)
                new_folder_path = new_folder_path.strip()

                try:
                    if new_folder_path != p.parts[0]:

                        client.torrents_rename_folder(
                            torrent_hash=torrent.hash,
                            old_path=p.parts[0],
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

            p = Path(file.name)
            filename = p.name

            if (
                file.priority > 0 and len(p.suffix) > 0
            ):  # 只替换优先级大于0的文件和有后缀名的文件
                for regex in regex_list:

                    new_name = re.sub(regex, "", filename).replace(" ", "").strip()
                    # print(
                    #     f"重命名包含指定字符串的文件：{filename} {new_name} {regex.pattern}"
                    # )

                    # 组合新的文件名和父文件夹路径
                    new_path = p.parent / new_name

                    try:

                        if new_path != file.name:

                            client.torrents_rename_file(
                                torrent_hash=torrent.hash,
                                old_path=file.name,
                                new_path=new_path,
                            )
                            time.sleep(0.5)
                    except Exception as e:
                        print(f"重命名文件失败：{e}")


def cancel_downloading_files_with_extension(client, file_extensions):
    """
    取消下载指定后缀名的文件
    """
    print("取消下载指定后缀名的文件...")
    for torrent in client.torrents.info():
        for file in torrent.files:

            # 创建Path实例
            p = Path(file.name)

            # 使用os.path.splitext()提取后缀
            file_extension = p.suffix

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
            _name = file.name.replace(" ", "")
            # print(f"{file.name}")
            if file.priority > 0:  # 只取消优先级大于0的文件
                for regex in regex_list:
                    if regex.search(_name):
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
                p = Path(file.name)
                tmp_name = p.parts[0]

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
