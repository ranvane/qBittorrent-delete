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

# 取消下载正则表达式字符串
cancel_download_list = [
    domain_suffix_pattern + "\.mp4",
    r"_91.*",
    r"51.*",
    r"AI色色.*",
    r"磁力.*",
    r"最新.*" + image_suffix_pattern,
    r"资源.*" + image_suffix_pattern,
    r"三国志.*",
    r"草榴.*",
    r"重磅核弹国产.*",
    r"地址发布.*",
    r"H動漫.*",
    r"H漫",
    r"萌妹屋.*",
    r"金三角.*",
    r"老王社区.*",
    r"__乱伦社区.*",
    r"内涵AV.*",
    r"麻豆传媒破解版.*",
    r"外网禁忌.*",
    r"妻友.*",
    r"广告.*",
    r"暗香阁.*",
    r"黑料社.*",
    r"91短视频",
    r"挑战自我.*释放天性.*",
    r"度灰.*",
    r"窥视TV.*",
    r"_麻豆传媒.*",
    r"_TikTok成人版.*",
    r"宣傳文檔.*",
    r"成人.{0,1}游.*",
    r"_快手社区.*",
    r"每日更新*",
    r"贝塔诺体育*",
    r"_暗网.*",
    r"暗网禁地.*",
    r"_海角乱伦.*",
    r"在线影城.*",
    r"__麻豆传媒.*",
    r"汇聚全球.*",
    r"缅北禁地.*",
    r"_?暗网解密.*",
    r"_欲漫涩.*",
    r"视频资源.*",
    r"_抖阴pro.*",
    r"_乱伦社区.*",
    r"_AI色色.*",
    r"91制片厂.*",
    r"扫码.*",
    r"AI处理技术.*",
    r"2048\(QR\)(社区|社區).*",
    r"美女直播.*(mp4|jpg|png)",
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
    r" H.*漫.*",
    r" H漫.*",
    r"凤凰娱乐.*mp4",
    r"成人版.*mp4",
    r"-重磅核弹国产.*(mp4|avi)",
    r"最新地址.*",
    r"最新地址.*mp4",
    r"星空天使.*",
    r"九游.*",
    r"游戏分享.*",
    r"VPN.*",
    r"鬥魂覺醒.*",
    r"约炮平台" + image_suffix_pattern,
    r"入有.*" + image_suffix_pattern,
    r"同城.*" + image_suffix_pattern,
    r"工口.*" + image_suffix_pattern,
]


def test():
    str = "海角社区泡良大神跟着房东后面陪她贴小-广告路边和母-狗房东车震中途拉出车外站马路牙子上操她骚穴全部射满"
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
