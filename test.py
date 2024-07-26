#!/usr/bin/env python3
import qbittorrentapi
import os
import time
import re
from pathlib import Path


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


def main():

    client = connect_to_qbittorrent()
    if client:
        try:

            for torrent in client.torrents.info():
                # print(torrent.files)
                for file in torrent.files:
                    p = Path(file.name)
                    print(p.parts[0])

            # try:
            #     client.torrents_rename_folder(
            #         torrent_hash=torrent.hash,
            #         old_path="云盘高质露脸泄密，旅游社高颜值拜金气质美女导游甘愿做金主小三，各种日常性爱自拍，无套内射无水印高清原版",
            #         new_path="test",
            #     )
            # except Exception as e:
            #     print(f"重命名文件夹失败：{e}")

        finally:
            disconnect_from_qbittorrent(client)


if __name__ == "__main__":
    main()
