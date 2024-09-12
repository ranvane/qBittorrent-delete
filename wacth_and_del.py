import os
import time
import re
from pathlib import Path
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
from utils import file_extensions


def check_and_del(file_or_folder_name):
    # 这里可以根据实际需求进行判断是否需要删除

    file_path = Path(__file__).parent / file_or_folder_name
    print(file_path, file_path.is_file(), file_path.suffix)
    if file_path.is_file():
        file_extension = file_path.suffix
        # print(file_extension)
        if file_extension in file_extensions:
            try:
                file_path.unlink()
                print(f"{file_path} 已成功删除。")
            except Exception as e:
                print(f"删除文件时出现错误：{e}")


class MyHandler(FileSystemEventHandler):
    def on_created(self, event):
        if event.is_directory:
            # print(f"文件夹创建：{event.src_path}")
            check_and_del(os.path.basename(event.src_path))
        else:
            # print(f"文件创建：{event.src_path}")
            check_and_del(os.path.basename(event.src_path))


if __name__ == "__main__":
    path_to_watch = "./test"  # 监控当前目录，可以根据需要修改为特定的目录路径
    event_handler = MyHandler()
    observer = Observer()
    observer.schedule(event_handler, path_to_watch, recursive=True)
    observer.start()
    try:
        while True:
            pass
    except KeyboardInterrupt:
        observer.stop()
    observer.join()
