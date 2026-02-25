#!/usr/bin/env bash

# create_post.sh - Create a new blog post with frontmatter
# Usage: ./create_post.sh [OPTIONS] FILENAME
# Example: ./create_post.sh --title "My Post" --author "John" my-new-post

show_help() {
    echo "Usage: create_post.sh [OPTIONS] FILENAME"
    echo ""
    echo "Create a new markdown blog post in the _posts directory"
    echo ""
    echo "Arguments:"
    echo "  FILENAME              Post filename (without .md extension)"
    echo ""
    echo "Options:"
    echo "  -t, --title TITLE     Post title"
    echo "  -a, --author AUTHOR   Post author"
    echo "  -e, --excerpt TEXT    Post excerpt/summary"
    echo "  --tags TAG1,TAG2      Comma-separated list of tags"
    echo "  --prompt              Prompt for missing fields"
    echo "  -h, --help            Show this help message and exit"
    echo ""
    echo "Config file:"
    echo "  Create a .post-config file in the project root with default values:"
    echo "  author=Your Name"
    echo "  tags=default,blog"
}

title=""
author=""
excerpt=""
tags=""
filename=""
do_prompt=false

while [[ $# -gt 0 ]]; do
    case "$1" in
        -h|--help)
            show_help
            exit 0
            ;;
        --prompt)
            do_prompt=true
            shift
            ;;
        -t|--title)
            if [[ -n "$2" ]]; then
                title="$2"
                shift 2
            else
                echo "Error: --title requires an argument" >&2
                exit 1
            fi
            ;;
        -a|--author)
            if [[ -n "$2" ]]; then
                author="$2"
                shift 2
            else
                echo "Error: --author requires an argument" >&2
                exit 1
            fi
            ;;
        -e|--excerpt)
            if [[ -n "$2" ]]; then
                excerpt="$2"
                shift 2
            else
                echo "Error: --excerpt requires an argument" >&2
                exit 1
            fi
            ;;
        --tags)
            if [[ -n "$2" ]]; then
                tags="$2"
                shift 2
            else
                echo "Error: --tags requires an argument" >&2
                exit 1
            fi
            ;;
        -*)
            echo "Error: Unknown option: $1" >&2
            show_help
            exit 1
            ;;
        *)
            filename="$1"
            shift
            ;;
    esac
done

if [[ -z "$filename" ]]; then
    echo "Error: Filename is required" >&2
    show_help
    exit 1
fi

# Remove .md extension if provided
filename="${filename%.md}"

# Get current date in YYYY-MM-DD format
current_date=$(date +%Y-%m-%d)

# Check for config file in project root
config_file=".post-config"
if [[ -f "$config_file" ]]; then
    while IFS= read -r line; do
        # Skip empty lines and comments
        [[ -z "$line" || "$line" == \#* ]] && continue

        key="${line%%=*}"
        value="${line#*=}"

        case "$key" in
            author) [[ -z "$author" ]] && author="$value" ;;
            tags)   [[ -z "$tags" ]]   && tags="$value" ;;
            excerpt)[[ -z "$excerpt" ]] && excerpt="$value" ;;
        esac
    done < "$config_file"
fi

# Prompt for missing fields (if --prompt is set)
if $do_prompt; then
    if [[ -z "$title" ]]; then
        read -rp "Post title: " title
    fi
    if [[ -z "$author" ]]; then
        read -rp "Author name: " author
    fi
    if [[ -z "$excerpt" ]]; then
        read -rp "Post excerpt (optional): " excerpt
    fi
    if [[ -z "$tags" ]]; then
        read -rp "Tags (comma-separated, optional): " tags
    fi
fi

# Use defaults if still empty
[[ -z "$title" ]]  && title="Untitled Post"
[[ -z "$author" ]] && author="Anonymous"

# Create _posts directory if it doesn't exist
if [[ ! -d "_posts" ]]; then
    mkdir -p _posts
    echo "Created _posts directory"
fi

filepath="_posts/$filename.md"

# Check if file already exists
if [[ -f "$filepath" ]]; then
    echo "Error: File already exists: $filepath" >&2
    read -rp "Overwrite? (y/N): " confirm
    if [[ ! "$confirm" =~ ^[Yy]$ ]]; then
        echo "Aborted."
        exit 1
    fi
fi

# Format tags as YAML array
tags_yaml="[]"
if [[ -n "$tags" ]]; then
    IFS=',' read -ra tag_list <<< "$tags"
    formatted_tags=()
    for tag in "${tag_list[@]}"; do
        trimmed_tag="${tag#"${tag%%[![:space:]]*}"}"
        trimmed_tag="${trimmed_tag%"${trimmed_tag##*[![:space:]]}"}"
        formatted_tags+=('"'"$trimmed_tag"'"')
    done
    tags_yaml="[$(IFS=', '; echo "${formatted_tags[*]}")]"
fi

# Create the markdown file with frontmatter
{
    echo "---"
    echo "title: \"$title\""
    echo "date: \"$current_date\""
    echo "author: \"$author\""
    echo "tags: $tags_yaml"
    [[ -n "$excerpt" ]] && echo "excerpt: \"$excerpt\""
    echo "---"
    echo ""
    echo "Your content here..."
} > "$filepath"

echo "Created new post: $filepath"
echo ""
echo "Frontmatter:"
echo "  Title: $title"
echo "  Date: $current_date"
echo "  Author: $author"
echo "  Tags: $tags_yaml"
[[ -n "$excerpt" ]] && echo "  Excerpt: $excerpt"
