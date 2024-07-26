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


# 重命名字符串列表
# * 零次或多次 + 至少一次 ？ 最多匹配一次
# [_.]：方括号表示字符集 匹配 either _（下划线）或.（点）中的任意一个字符。

replace_list = [
    r"[a-z0-9]{3,9}" + domain_suffix_pattern + r"-?",
    r"[a-z0-9]{3,9}" + domain_suffix_pattern + r"@?",
    r"[a-z0-9]{3,9}" + domain_suffix_pattern,
    r"^\d{1,4}[_.]",
    r"(同城美女.+)\d{1,4}",
    r"【.*】",
    r"-最新国产资源秒下-",
]

cancel_download_list = [
    domain_suffix_pattern + "\.mp4",
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


def test():
    str = "大神探店喇叭哥四处寻花探秘冒死潜入暗藏在南巷社区德才武艺洗浴偷拍小姐的大保健服务"
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


if __name__ == "__main__":
    test()
