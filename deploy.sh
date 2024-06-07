#!/bin/bash

# Get the directory size in GiB with two decimal places
size=$(ssh pablo@192.168.1.119 'du -sb /config/mcserver/world | awk "{printf \"%.2f GiB\", \$1/1024/1024/1024}"')

echo $size

# Define the file to be edited
file="/media/datos/Dev/pablob.eu/docs/minecraft.md"

# Escape forward slashes in the size variable for sed
size_escaped=$(echo "$size" | sed 's/\//\\\//g')

# update file with new world size
sed -i "s/\(<div id=\"minecraft-world-size\">\).*\(<\/div>\)/\1$size_escaped\2/" "$file"

echo "Updated world map size to ${size} in ${file}"

DATE=$(date --iso-8601);
git add .
git commit -m "deploy: $DATE";
.env/bin/python generate_index.py && \
.env/bin/mkdocs gh-deploy;