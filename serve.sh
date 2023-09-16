#!/bin/bash
echo "mkdocs serve";
env/bin/python generate_index.py;
env/bin/mkdocs serve;