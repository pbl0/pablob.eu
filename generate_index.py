import os
import re
from datetime import datetime

# Function to extract metadata and the first # Title from a Markdown file
def extract_metadata_and_title(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    metadata = {}
    match = re.search(r'^---(.*?)---', content, re.DOTALL)
    if match:
        metadata_content = match.group(1)
        metadata_lines = metadata_content.strip().split('\n')
        for line in metadata_lines:
            parts = line.split(':', 1)
            if len(parts) == 2:
                key, value = parts
                metadata[key.strip()] = value.strip()

    # Search for the first # Title in the content
    title_match = re.search(r'# (.+)', content)
    title = title_match.group(1).strip() if title_match else ''

    return metadata, title

# Function to list Markdown files and sort by date
def list_and_sort_markdown_files(directory):
    markdown_files = []
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.md'):
                file_path = os.path.join(root, file)
                metadata, title = extract_metadata_and_title(file_path)
                if 'date' in metadata:
                    markdown_files.append((file_path, metadata['date'], title))

    # Sort the files by date in descending order
    markdown_files.sort(key=lambda x: datetime.fromisoformat(x[1]), reverse=True)

    return markdown_files

# Function to create the index.md file with the list of recent files
def create_index_file(sorted_files, output_file):
    with open(output_file, 'w', encoding='utf-8') as md_file:
        md_file.write("# pablo's docs {  .page-title } \n\n")
        md_file.write("## Latest posts\n\n")
        # Add a list of the 5 most recent files with their titles
        for file, _, title in sorted_files[:7]:
            blog_path = file.replace('docs/', '')
            md_file.write(f"- {datetime.fromisoformat(_).strftime('%B %d, %Y')} - [{title}]({blog_path})\n")

        md_file.write("\n[See all posts](/blog)\n\n")
        md_file.write("## Other stuff\n\n")
        md_file.write("- [My programming projects](code/)\n")
        md_file.write("- [About me](me/)\n")
        md_file.write("- [Github profile](https://github.com/pbl0)\n")
        md_file.write("- [Youtube channel](https://www.youtube.com/@pbl0_o?sub_confirmation=1)\n")
        md_file.write("- [Contact me on Telegram](https://t.me/pablobls)\n")

if __name__ == "__main__":
    directory = "docs/blog/posts"
    output_file = "docs/index.md"

    sorted_files = list_and_sort_markdown_files(directory)
    create_index_file(sorted_files, output_file)
