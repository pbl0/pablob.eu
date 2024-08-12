#!/bin/bash

# Get the directory size in GiB with two decimal places
size=$(ssh pablo@192.168.1.119 '
    du -sb /config/mcserver/world /config/mcserver/world_nether /config/mcserver/world_the_end | 
    awk "{total += \$1} END {printf \"%.2f GiB\", total/1024/1024/1024}"
')

echo $size

# Define the file to be edited
file="/media/datos/Dev/pablob.eu/docs/minecraft.md"

# Escape forward slashes in the size variable for sed
size_escaped=$(echo "$size" | sed 's/\//\\\//g')

# update file with new world size
sed -i "s/\(<div id=\"minecraft-world-size\">\).*\(<\/div>\)/\1$size_escaped\2/" "$file"

echo "Updated world map size to ${size} in ${file}"