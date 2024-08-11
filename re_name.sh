#!/bin/bash
completed_dir="/mnt/u_disk/downloads/completed/"  # 注意这里等号两边不能有空格
# 去掉标点，
for item in "$completed_dir"/*; do
    if [[ $item =~ ^，.* ]]; then
        new_item=${item:1}
        mv "$item" "$new_item"
    fi
done

# 去掉标点,
for item in "$completed_dir"/*; do
    if [[ $item =~ ^,.* ]]; then
        new_item=${item:1}
        mv "$item" "$new_item"
    fi
done

# 去掉@
for item in "$completed_dir"/*; do
    if [[ $item =~ ^@.* ]]; then
        new_item=${item:1}
        mv "$item" "$new_item"
    fi
done

# 去掉空格
for item in "$completed_dir"/*; do
    if [[ $item =~ ^[[:space:]].* ]]; then
        new_item=${item:1}
        mv "$item" "$new_item"
    fi
done

# 去掉xyz
for item in "$completed_dir"/*; do
    if [[ $item =~ ^xyz.* ]]; then
        new_item=${item:3}
        mv "$item" "$new_item"
    fi
done

# 去掉开头的网址
process_item() {
    local item="$1"
    # 匹配不带 "http" 的域名主名称
    if [[ $item =~ ^([a-zA-Z0-9.-]+\.[a-zA-Z]{2,}) ]]; then
        local domain="${BASH_REMATCH[1]}"
        local new_item="${item#$domain}"
        mv "$item" "$new_item"
    fi
}

for item in "$completed_dir"/*; do
    process_item "$item"
done

