#!/bin/bash

# 去掉标点，
for item in *; do
    if [[ $item =~ ^，.* ]]; then
        new_item=${item:1}
        mv "$item" "$new_item"
    fi
done

# 去掉标点,
for item in *; do
    if [[ $item =~ ^,.* ]]; then
        new_item=${item:1}
        mv "$item" "$new_item"
    fi
done
# 去掉@
for item in *; do
    if [[ $item =~ ^@.* ]]; then
        new_item=${item:1}
        mv "$item" "$new_item"
    fi
done
# 去掉空格
for item in *; do
    if [[ $item =~ ^ .* ]]; then
        new_item=${item:1}
        mv "$item" "$new_item"
    fi
done

# 去掉xyz
for item in *; do
    if [[ $item =~ ^xyz.* ]]; then
        new_item=${item:1}
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

for item in *; do
    process_item "$item"
done
