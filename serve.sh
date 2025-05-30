#!/bin/bash

./update_mc_world_size.sh;
.venv/bin/python generate_index.py && \
.venv/bin/mkdocs serve -a 0.0.0.0:8000;