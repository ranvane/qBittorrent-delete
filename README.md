# qBittorrent-utils

## `qbittorrent_del.py`功能：


1、根据suffix_keyword_list列表包含的字符串取消bt任务中的文件下载


2、如果文件名中包含replace_str_list列表的字符串，替换为空


3、过滤、不下载suffix_list列表中包含的后缀名



## `tracker_servers.py`功能：


 下载tracker_url = (
        "https://jsdelivr.b-cdn.net/gh/XIU2/TrackersListCollection/best.txt"
    )中的tracker和site_url = "https://www.u3c3.club/"首页所有的磁力链中的tracker，去重tracker服务器、测试tracker服务器是否可以访问，生成best.txt，使用web服务器提供访问，以便qBittorrent使用。

## 使用方法：

使用定时任务执行`qbittorrent_del.py`和`tracker_servers.py`
