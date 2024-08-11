#!/bin/bash
# 定义要处理的文件夹路径
completed_dir="/mnt/u_disk/downloads/completed/"
# 定义要去掉的开头字符串数组
strings_to_remove=("@" "xyz" "，" "," " Chinese homemade video")
# 定义域名主名称的正则表达式
domain_regex="^([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(?!\.(?:jpg|jpeg|png|gif|bmp|svg|webp|tiff|ico)[^.]*$)"

# 定义处理文件或文件夹的函数
function process_item() {
    # 获取要处理的项目的完整路径
    local item="$1"
    # 获取项目的文件名
    local file_name=$(basename "$item")
    # 遍历要去掉的开头字符串
    for string in "${strings_to_remove[@]}"; do
        # 如果文件名以某个开头字符串开头
        if [[ $file_name =~ ^$string.* ]]; then
            # 获取去掉开头字符串后的新文件名
            new_item=${file_name:${#string}}
            # 构建新的文件路径
            new_path=$(dirname "$item")/$new_item
            # 执行重命名操作
            mv "$item" "$new_path"
            # 输出重命名的信息
            echo "$item 重命名为 $new_path"
            # 结束循环，避免重复处理
            break
        fi
    done
    # 如果文件名匹配域名主名称的正则表达式
    if [[ $file_name =~ $domain_regex ]]; then
        # 获取匹配到的域名部分
        local domain="${BASH_REMATCH[1]}"
        # 获取去掉域名部分后的新文件名
        new_item=${file_name:${#domain}}
        # 构建新的文件路径
        new_path=$(dirname "$item")/$new_item
        # 执行重命名操作
        mv "$item" "$new_path"
        # 输出重命名的信息
        echo "$item 重命名为 $new_path"
    fi
}

# 使用 find 命令查找指定文件夹及其子文件夹中的文件和文件夹，并进行处理
find "$completed_dir" -type f -o -type d | while read -r item; do
    process_item "$item"
done
