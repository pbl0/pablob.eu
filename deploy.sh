#!/bin/bash

./update_mc_world_size.sh;

DATE=$(date --iso-8601);
git add .
git commit -m "deploy: $DATE";
.env/bin/python generate_index.py && \
.env/bin/mkdocs gh-deploy;