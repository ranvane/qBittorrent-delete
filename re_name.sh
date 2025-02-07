#!/bin/bash
# Configuration variables
completed_dir="/vol1/1000/download/complete/"
strings_to_remove=("@" "xyz" "，" "," " Chinese homemade video")
domain_regex='^([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(?=\/|$| |\.[a-zA-Z]{3,})'

# Enable case-insensitive regex and handle spaces in filenames
shopt -s nocasematch
IFS=$'\n'

# Main processing function with error handling
process_item() {
    local item="$1"
    local parent_dir current_name new_name
    
    parent_dir=$(dirname "$item")
    current_name=$(basename "$item")
    new_name="$current_name"
    
    # Remove prefix strings
    for prefix in "${strings_to_remove[@]}"; do
        if [[ $current_name == "$prefix"* ]]; then
            new_name="${current_name:${#prefix}}"
            break
        fi
    done
    
    # Remove domain prefixes if still matches
    if [[ $new_name =~ $domain_regex ]] && [[ $new_name != *.* ]]; then
        domain_part="${BASH_REMATCH[1]}"
        new_name="${new_name:${#domain_part}}"
    fi
    
    # Only rename if changed and target doesn't exist
    if [[ "$new_name" != "$current_name" ]] && [[ -n "$new_name" ]]; then
        new_path="${parent_dir}/${new_name}"
        if [[ ! -e "$new_path" ]]; then
            mv -v -- "$item" "$new_path" || echo "Error renaming $item"
        else
            echo "Skipped: $item → Target exists: $new_path"
        fi
    fi
}

# Main script execution with parallel processing
export -f process_item
export strings_to_remove domain_regex
find "$completed_dir" \( -type f -o -type d \) \
    -exec bash -c 'for i; do process_item "$i"; done' bash {} +
