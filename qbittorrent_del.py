#!/usr/bin/env python3
import qbittorrentapi
import os
import time
import re
from pathlib import Path

completed_dir = "/mnt/u_disk/downloads/completed/"

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
    domain_suffix_pattern + r"\.mp4",
    r"_91.*",
    r"爭霸江山美人.*",
    r"度灰.*",
    r"帝王恩宠.*",
    r".*H漫.*",
    r".*H動漫.mp4",
    r"AI色色.*",
    r"工作室.*",
    r"三国志.*",
    r"私房猛药.*",
    r"❤麻豆传媒映画❤.*",
    r"猎艳传奇.*",
    r"成人抖音.*",
    r"全国外围.*",
    r"国产精品资源.*",
    r".mp4.jpg",
    r"草榴.*",
    r"萌妹屋.*",
    r"极乐禁地.*",
    r"金三角.*",
    r"二维码.*",
    r"扫码.*",
    r".*品茶" + image_suffix_pattern,
    r".*微密圈" + image_suffix_pattern,
    r".*蚂蚁翻墙" + image_suffix_pattern,
    r".*记录美好性生活" + image_suffix_pattern,
    r".*抖阴.*" + image_suffix_pattern,
    r".*交友" + image_suffix_pattern,
    r".*猪仔生活" + image_suffix_pattern,
    r".*本色" + image_suffix_pattern,
    r".*好色" + image_suffix_pattern,
    r".*不断更" + image_suffix_pattern,
    r".*世界" + image_suffix_pattern,
    r".*同步更新" + image_suffix_pattern,
    r".*感兴趣的.*" + image_suffix_pattern,
    r"国产资源库.*",
    r"全网解密.*",
    r"_图灵传媒.*",
    r"重新定义.*",
    r"二维码.*",
    r"新番更不停.*",
    r"献妻虎狼熟女.*",
    r"聚集中心.*",
    r"百万部.*",
    r"来自糖心.*",
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
    r"2048\(QR\)(社区|社區).*",
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


def extract_chinese_characters(text):
    """
    提取字符串中的所有中文字符。

    :param text: 输入的字符串
    :return: 包含所有中文字符的列表
    """
    pattern = re.compile(r"[\u4e00-\u9fa5]")
    chinese_chars = pattern.findall(text)
    return "".join(chinese_chars)


# 重命名包含指定字符串的文件夹
def rename_folders(client, replace_str_list):
    """
    重命名包含指定字符串的文件夹，对于bt来说，只替换最顶层的文件夹

    参数：
    client（qbittorrentapi.Client）：与qBittorrent客户端的连接对象，用于获取种子信息和执行操作。
    replace_str_list（list of str）：包含要替换的字符串的列表，或者是用于匹配文件夹名称的正则表达式字符串列表。

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

    这个函数会遍历给定的qBittorrent客户端中的所有种子文件，并检查每个种子文件中的文件。
    对于每个文件，如果文件名包含在replace_str_list中的任何字符串，函数将会替换这些字符串。
    使用正则表达式来匹配字符串，并且忽略大小写。

    参数:
    client: qBittorrent客户端对象，用于获取种子信息和执行操作。
    replace_str_list: 一个正则表达式字符串列表，用于匹配文件名中的字符串。

    返回值:
    无

    异常:
    如果在重命名文件过程中发生错误，它将会被捕获并作为异常抛出。
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

    这个函数用于取消下载指定后缀名的文件，其作用是遍历qBittorrent客户端中的所有种子文件，并检查每个文件的后缀名是否在给定的文件扩展名列表中。如果找到匹配的文件，并且文件的优先级大于0，函数将使用qBittorrent客户端提供的API调用来取消该文件的下载，设置其优先级为0。

    参数：
    client（qbittorrentapi.Client）：与qBittorrent客户端的连接对象，用于获取种子信息和执行操作。
    file_extensions（list of str）：包含要取消下载的文件扩展名的列表。例如，[".mp4", ".mkv"]将取消下载所有.mp4和.mkv文件。
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
    """
    取消下载符合正则表达式的文件和文件夹

    参数:
    client: qBittorrent客户端对象，用于获取种子信息和执行操作。
    cancel_download_list: 正则表达式字符串列表，用于匹配要取消下载的文件或文件夹名称。

    返回值:
    无

    异常:
    如果在取消下载过程中发生错误，将抛出异常。
    """
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
    此函数的目的是遍历qbittorrent客户端中的所有种子，找到每个种子中优先级大于0的文件，
    并以该文件的文件名（不包括扩展名）作为新的种子名。如果新种子名与原种子名不同，则进行重命名操作。
    """
    print("重命名种子名...")
    for torrent in client.torrents.info():
        tmp_name = ""
        torrent_name = torrent.name
        for file in torrent.files:
            if file.priority > 0:  # 优先级大于0的文件
                p = Path(file.name)
                tmp_name = p.parts[0]

        if torrent_name != tmp_name:
            tmp_name_chinese_characters = extract_chinese_characters(tmp_name)
            torrent_name_chinese_characters = extract_chinese_characters(torrent_name)

            # 如果 根文件夹的中文字符数大于种子名中文字符数，则替换种子名
            if len(tmp_name_chinese_characters) > len(torrent_name_chinese_characters):

                try:
                    print(f"重命名种子：{torrent.name} -> {tmp_name}")
                    client.torrents_rename(torrent.hash, new_torrent_name=tmp_name)
                except Exception as e:
                    print(f"重命名种子：{torrent.name} -> {tmp_name} 失败")

            elif len(tmp_name_chinese_characters) < len(
                torrent_name_chinese_characters
            ):
                # 如果 根文件夹的中文字符数小于种子名中文字符数，则种子名使用种子名替换根文件名

                try:
                    client.torrents_rename_folder(
                        torrent_hash=torrent.hash,
                        old_path=p.parts[0],
                        new_path=torrent_name_chinese_characters,
                    )
                except Exception as e:
                    print(f"重命名文件夹失败：{e}")


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


def gen_del_bash():
    bash_list = []
    for str in cancel_download_list:
        _str = f"find {completed_dir} -type f -name '{str}'"
        _str = _str.replace(".*", "*")
        bash_list.append(_str + r" -exec rm -rf {} \;")

        _str = f"find {completed_dir} -type d -name '{str}'"
        _str = _str.replace(".*", "*")
        bash_list.append(_str + r" -exec rm -rf {} \;")

    for extension in file_extensions:

        _str = f"find {completed_dir} -type f -name '*{extension[1:]}'"
        bash_list.append(_str + r" -exec rm -rf {} \;")

    with open("qb_del.sh", "w") as file:

        file.write('#!/bin/bash' + "\n\n")
        for item in bash_list:
            try:
                file.write(item + "\n")
            except Exception as e:
                print(item)


if __name__ == "__main__":
    # * 0-23 * * * /usr/local/bin/python3.9  /opt/qbittorrentee/qbittorrent_del.py
    # 0 */1 * * * sh /opt/qbittorrentee/qb_del.sh
    # 0 */1 * * * sh /opt/qbittorrentee/rename.sh

    main()
    gen_del_bash()
