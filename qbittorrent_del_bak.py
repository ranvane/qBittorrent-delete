#!/usr/bin/env python3
import qbittorrentapi
import os
import time
from pathlib import Path

# pip install qbittorrent-api

suffix_list = [
    ".gif",
    ".txt",
    ".TXT",
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
# 重命名字符串
replace_str_list = [
    "同城美女真实裸聊",
    "jpbt1.com",
    "jpbt2.com",
    "jpbt3.com",
    "jpbt4.com",
    "jpbt5.com",
    "jpbt6.com",
    "jpbt7.com",
    "jpbt8.com",
    "jpbt9.com",
    "jingpinbt.com",
    "【1234VV.COM】",
    "(",
    ")",
    "( )",
    " ",
    "。",
    "gc2048.com-",
    "xuu73.com",
    "xuu72.com",
    "xuu71.com",
    "xuu74.com",
    "xuu75.com",
    "d66e.com@",
    "rh2048.com",
    "woxav.com@",
    "aavv39.xyz@",
    "aavv40.xyz@",
    "x3f3.com ",
    "d5e5.com ",
    "2048.cc-",
    "kfa11.com@",
    "www.98T.la@",
]
# 取消下载字符串
suffix_keyword_list = [
    "扫码免費",
    "猎艳传奇",
    "_❤",
    "欲漫",
    "星空天使",
    "[资源推荐]",
    "歡迎加入",
    "成人抖音",
    "女神集結",
    "麻豆传媒映画",
    "妻友社区",
    "百万精品原创.jpg",
    "迷药针孔",
    "色中色",
    "网址",
    "成人游戏",
    "_❤",
    "成人版抖音",
    "51猎奇",
    "视频平台.png",
    "同城上门",
    "50度灰",
    "约啪平台",
    "_91暗网",
    "官网",
    "扫码看到爽",
    "淫邪的魔族發動了祭典",
    "小黄片",
    "大人版",
    "GL.gif",
    "成人免费吃瓜",
    "汤头条",
    "泡芙成人",
    "无极限直播",
    "扫码免费玩",
    "扫描访问",
    "久度空間",
    "萌妹屋",
    "金三角揭密",
    "_91毛片",
    "_窥视TV",
    "满足一切性幻想",
    "_暗网",
    "_bilibili",
    "_老王社区",
    "_51动漫",
    "黑料社",
    "xuu62.com.mp4",
    "开放平台",
    "顶级AI处理",
    "换妻平台",
    "第一品牌",
    "极选手游",
    "成人手游",
    "腥城手游",
    "小优视频",
    "抖阴视频",
    "91PORN",
    "缅北禁地",
    "暗网解密",
    "__滴滴约炮",
    "资源平台",
    "__海角乱伦",
    "__乱伦社区",
    "__快手社区",
    "妻友",
    "91短视频",
    "独家秘宝",
    "91PORN",
    "广告位招商",
    "爱同城约炮",
    "色TV",
    "只做精品",
    "覆盖全国",
    "小优视频",
    "H.GM63.CC.mp4",
    "次元高能污漫",
    "全国各地约炮",
    "购买微信",
    "1000W+",
    "英皇体育",
    "妖精动漫",
    "腥城手游",
    "51品茶官网 ",
    "2048地址",
    "2048社区",
    "2048论坛",
    "最新最快",
    "同城一",
    "找美女",
    "同城少妇",
    "萌界",
    "爱姬远征",
    "放置-video",
    "小舞归来",
    "女皇-video",
    "同城交友",
    "三国志",
    "覆盖全国",
    "约啪中心",
    "重磅核弹",
    "资源更新",
    "乱伦平台",
    "博彩APP",
    "妻友APP",
    "暗网禁区",
    "51PC",
    "日韩同步",
    "斗罗大陆",
    "乱伦平台",
    "覆盖全国",
    "成人社区",
    "约啪中心",
    "妹妹在精彩表演",
    "推 荐.mp4",
    "逼哩",
    "cc.mp4",
    "磁力秒播",
    "最新资讯",
    "Land",
    "U6A6.COM",
    "U9A9.COM",
    "性视界",
    "发布器",
    "VIP会员破解",
    "多盘",
    "LA.jpg",
    "com.png",
    "com.mp4",
    "界杯最方便的",
    "邮箱",
    "注册",
    "发布",
    "javhd",
    "com.jpg",
    "Powered",
    "論壇",
    "最齊全",
    "如果您看到此文件",
    "最齐全",
    "凤凰娱乐vip",
    "虎牙成人",
    "云赌场",
    "人间尤物",
    "社 区 最 新 情",
    "虎牙成人",
    "云赌场",
    "人间尤物",
    "威尼斯",
    "快感上",
    "月色基地",
    "成功致",
    "大聯歡",
    "扫码下载",
    "暗香阁",
    "最新地址",
    "萌萝社",
    "最新bt合",
    "最新地址",
    "美女直播.mp4",
    "美女荷官竟",
    "N房间的精彩直播",
    "N间房",
    "大聯歡",
    "千姬",
    "都在玩的",
    "直播大秀",
    "動作片",
    "沒有饒恕.mp4",
    "魔族",
    "妖姬天下",
    "萌界戰",
    "快進來爽一爽",
    "游戏导航",
    "最新情报.mp4",
    "国产传媒.mp4",
    "花样zbzb66.mp4",
    "vip2209.mp4",
    "H漫.mp4",
    "AVmans.mp4",
    "基地",
    "放置傳說",
    "大平台",
    "fangzhi",
    "宅男搬运工",
    "nvhuang",
    "YP.MOV",
    "张信哲",
    "致富",
    "视频.mp4",
    "在线播放",
    "存款方便",
    "电子竞技",
    "体育",
    "娱乐城",
    "优惠",
    "美女直播",
    "台湾美女主播",
    "直播大",
    "草榴",
    "私房猛药",
    "楼凤外围",
    "广告",
    "一个会员享受",
    "增大增粗",
    "扫码",
    "二维码",
    "福利网站",
    "文宣",
    "尖叫视频",
    "海角社区最大原创乱伦平台",
    "萌萝社",
    "文宣",
    "小黄片",
    "度灰下载",
    "全能版",
    "出品短",
    "美女集中地",
    "点击这里",
    "最新网址",
    "下载地址",
    "com.mp4",
    "報.mp4",
    "c o m.mp4",
    "社 區",
    "收费网盘",
    "磁力搜索",
    "一对一",
    "奇迹少女",
    "奇迹少女",
    "手游",
    "平台推荐.mp4",
]


def determine_del_file(name):
    suffix = os.path.splitext(name)[-1]
    if suffix in suffix_list:
        return True

    for keyword in suffix_keyword_list:
        if keyword in name:
            return True

    return False


def get_path_list(path):
    # 创建Path对象
    p = Path(path)

    # 获取目录名和文件名
    dir_names = p.parents
    file_name = p.name

    # 输出目录名和文件名
    folder_name = []
    for dir_name in reversed(dir_names):
        if len(dir_name.name) > 0:
            folder_name.append(dir_name.name)
    # print(f"目录名：{ folder_name } 文件名：{file_name}")
    return folder_name, file_name


# 连接到qBittorrent客户端
qbt_client = qbittorrentapi.Client(
    host="192.168.31.200", port=8080, username="ranvane", password="fjgh1148028"
)

try:
    qbt_client.auth_log_in()
except qbittorrentapi.LoginFailed as e:
    print(e)

# 打印 qBittorrent info
for k, v in qbt_client.app.build_info.items():
    print(f"{k}: {v}")


def cancel_download_torrent_file():
    """取消下载包含指定字符串的文件"""
    print("取消下载包含指定字符串的文件")
    for torrent in qbt_client.torrents_info():
        # print(f'{torrent.name} ({torrent.state})')
        files = qbt_client.torrents_files(torrent.hash)
        for file in files:
            # print(f'{file.name}  {file.index} {file.size} {file.priority}')
            if file.priority > 0 and determine_del_file(file.name):
                print(f"取消下载：{file.name} {file.priority}")
                qbt_client.torrents_file_priority(torrent.hash, file.index, 0)
                time.sleep(0.5)


def rename_torrent_folder():
    """重命名包含指定字符串的文件夹,并且根据种子根文件夹重命名"""
    print("重命名包含指定字符串的文件夹,并且根据种子根文件夹重命名")
    # 获取所有种子
    torrents = qbt_client.torrents.info()
    for torrent in torrents:
        torrent_files = torrent.files
        for file in torrent_files:
            folder_name, file_name = get_path_list(file["name"])
            new_path = folder_name[0]
            old_path = folder_name[0]

            if torrent.name != old_path:  # 根据种子根文件夹重命名种子文件名
                try:
                    torrent.rename(old_path)
                except Exception as e:
                    print(e)

            for replace_str in replace_str_list:
                if len(folder_name) > 0 and replace_str in folder_name[0]:
                    new_path = new_path.replace(replace_str, "")

            if new_path != old_path:
                print(f"old_path:{folder_name[0]} , new_path:{new_path}")
                try:
                    torrent.rename_folder(
                        old_path=folder_name[0],
                        new_path=new_path,
                    )

                    if torrent.name == old_path:  # 根据种子根文件夹重命名
                        try:
                            torrent.rename(new_path)

                        except Exception as e:
                            print(e)
                except Exception as e:
                    print(e)


# 重命名包含指定字符串的文件
def rename_torrent_filename():
    """重命名包含指定字符串的文件"""
    print("重命名包含指定字符串的文件")
    # 获取所有种子
    torrents = qbt_client.torrents.info()
    # 遍历每个种子
    for torrent in torrents:
        torrent_files = torrent.files
        for file in torrent_files:
            # 获取文件的父文件夹路径和文件名
            parent_dir, file_name = os.path.split(file["name"])

            # print(f"Parent Directory:{parent_dir}   File Name:{file_name}")
            # 组合新的文件名和父文件夹路径
            # new_path = os.path.join(parent_folder, new_name)
            old_name = file_name
            new_name = file_name
            for replace_str in replace_str_list:
                if replace_str in new_name:
                    new_name = (
                        new_name.replace(replace_str, "")
                        .replace(" ", "")
                        .replace(" ", "")
                    )

                    if old_name != new_name and len(new_name) > 0:  # 确保旧文件路径有效
                        # 组合新的文件名和父文件夹路径
                        new_path = os.path.join(parent_dir, new_name)
                        # print(
                        #     f'file["id"]:{file["id"]} old_path:{file["name"]}  new_path:{new_path}'
                        # )
                        try:
                            torrent.rename_file(
                                file_id=file["id"], new_file_name=new_path
                            )

                        except Exception as e:
                            print(e)


cancel_download_torrent_file()
rename_torrent_folder()
rename_torrent_filename()

qbt_client.auth_log_out()
