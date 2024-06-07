#!/bin/bash

./update_mc_world_size.sh;
.env/bin/python generate_index.py && \
.env/bin/mkdocs serve;