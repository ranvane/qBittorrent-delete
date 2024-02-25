#!/usr/bin/env python3
import os
import requests
import socket
import threading
import requests
from bs4 import BeautifulSoup
import datetime
import urllib.parse
from tqdm.contrib.concurrent import thread_map
from tqdm import tqdm

global tracker_list, accessible_list, timeout, _thread_num

tracker_list = []  # 存储tracker服务器列表的数组
accessible_list = []  # 可访问的tracker服务器列表的数组
_timeout = 5  # 超时时间
_thread_num = 20  # 线程数量


def extract_trackers_from_magnet(magnet_uri):
    # 解析磁力链接
    magnet_dict = urllib.parse.parse_qs(urllib.parse.urlparse(magnet_uri).query)

    # 提取announce和announce-list（如果有多个Tracker）
    trackers = magnet_dict.get("announce", [])
    if "tr" in magnet_dict:
        trackers.extend(magnet_dict["tr"])

    return trackers


def get_magnet_links(url):
    # 提取 tracker 服务器的列表
    trackers = []
    # 发送GET请求
    response = requests.get(url)

    # 检查请求是否成功
    if response.status_code == 200:
        # 使用BeautifulSoup解析HTML内容
        soup = BeautifulSoup(response.text, "html.parser")

        # 查找所有的磁力链接（这里假设磁力链接都在a标签的href属性中，并且以'magnet:'开头）
        magnets = [
            a["href"]
            for a in soup.find_all("a", href=True)
            if a["href"].startswith("magnet:")
        ]

        for magnet in magnets:
            trackers.extend(extract_trackers_from_magnet(magnet))
        # 去重 tracker 服务器列表
        trackers = list(set(trackers))

        return trackers

    else:
        print(f"请求失败，状态码：{response.status_code}")
        return []


def parse_tracker_list():
    """
    解析tracker列表文件，获取所有tracker服务器信息
    """
    print("获取tracker列表")
    global tracker_list
    print("获取TrackersListCollection trackers")
    # 初始Tracker URL
    tracker_url = "https://js.cdn.haah.net/gh/XIU2/TrackersListCollection/best.txt"
    backup_tracker_url = "https://ghproxy.net/https://raw.githubusercontent.com/XIU2/TrackersListCollection/master/best.txt"  # 替换为你的备用URL

    try:
        response = requests.get(tracker_url)
        response.raise_for_status()  # 如果响应状态不是200，将引发HTTPError异常
    except requests.exceptions.RequestException as e:
        print(f"{tracker_url}: 访问出错，使用备用URL")
        tracker_url = backup_tracker_url  # 使用备用URL

    try:
        response = requests.get(tracker_url)
        response.raise_for_status()  # 确保备用URL的响应状态也是200
        tracker_list = response.text.strip().split("\n\n")
    except requests.exceptions.RequestException as e:
        print(f"备用URL：{tracker_url}  访问出错")
        # 在这里可以进一步处理错误，例如抛出异常、记录日志或提供默认值等

    print(f"\t TrackersListCollection 获得trackers：{len(tracker_list)}个。")

    url = "https://www.u3c3.club/"
    # u3c3 trackers
    print("获取u3c3 trackers")
    tracker_links_u3c3 = get_magnet_links(url)
    print(f"\t u3c3 获得trackers：{len(tracker_links_u3c3)}个。")

    tracker_list.extend(tracker_links_u3c3)


# 测试单个tracker服务器是否可以访问


def test_tracker(tracker):
    global tracker_list, accessible_list, _timeout, _thread_num
    try:
        requests.get(tracker, timeout=_timeout)
        accessible_list.append(tracker + os.linesep)
        # print(f"{tracker} is accessible")
    except Exception as e:
        pass

        # print(f"{tracker} is not accessible")


# 使用多线程并发测试所有tracker服务器是否可以访问
# 创建了10个线程，并将tracker列表平均分配给它们


def main():
    global tracker_list, accessible_list, timeout, _thread_num
    parse_tracker_list()
    threads = []
    thread_num = _thread_num
    trackers_per_thread = len(tracker_list) // thread_num
    print(f"多线程测试获得的{len(tracker_list)}个tracker是否可访问。")
    for i in range(thread_num):
        start_idx = i * trackers_per_thread
        end_idx = (
            start_idx + trackers_per_thread if i < thread_num - 1 else len(tracker_list)
        )
        thread_trackers = tracker_list[start_idx:end_idx]
        thread = threading.Thread(
            target=lambda trackers: [test_tracker(t) for t in trackers],
            args=(thread_trackers,),
        )
        threads.append(thread)
        thread.start()

    # 等待所有线程完成
    for thread in threads:
        thread.join()

    print(f"测试获得{len(accessible_list)}个可访问的tracker，写入文件。")

    # 获取当前脚本所在目录
    script_dir = os.path.dirname(os.path.abspath(__file__))
    fileName = os.path.join(script_dir, "best.txt")
    logName = os.path.join(script_dir, "log.txt")

    try:
        os.remove(fileName)
        print("删除源文件。")

    except Exception as e:
        print("删除源文件。")
    try:
        #        _accessible_list = list(set(accessible_list))
        with open(fileName, "w") as file:
            file.writelines(accessible_list)
        print("写入源文件。")
        with open(logName, "w+") as file:
            # 获取当前时间
            now = datetime.datetime.now()

            # 格式化当前时间（例如，格式为“年-月-日 时:分:秒”）
            formatted_time = now.strftime("%Y-%m-%d %H:%M:%S")
            file.write(
                f"{formatted_time} :测试获得{len(accessible_list)}个可访问的tracker。\n"
            )
    except Exception as e:
        print(f"写入失败:{e}")


if __name__ == "__main__":
    main()
