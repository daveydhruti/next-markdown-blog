#!/usr/bin/env fish

# create_post.fish - Create a new blog post with frontmatter
# Usage: ./create-post.fish [OPTIONS] FILENAME
# Example: ./create-post.fish --title "My Post" --author "John" my-new-post

function show_help
    echo "Usage: create-post.fish [OPTIONS] FILENAME"
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
end

# Parse command line arguments
set -l title ""
set -l author ""
set -l excerpt ""
set -l tags ""
set -l filename ""
set -l prompt false

# Parse flags
set -l i 1
while test $i -le (count $argv)
    set -l arg $argv[$i]
    
    switch $arg
        case -h --help
            show_help
            exit 0
        case --prompt
            set prompt true
        case -t --title
            set i (math $i + 1)
            if test $i -le (count $argv)
                set title $argv[$i]
            else
                echo "Error: --title requires an argument" >&2
                exit 1
            end
        case -a --author
            set i (math $i + 1)
            if test $i -le (count $argv)
                set author $argv[$i]
            else
                echo "Error: --author requires an argument" >&2
                exit 1
            end
        case -e --excerpt
            set i (math $i + 1)
            if test $i -le (count $argv)
                set excerpt $argv[$i]
            else
                echo "Error: --excerpt requires an argument" >&2
                exit 1
            end
        case --tags
            set i (math $i + 1)
            if test $i -le (count $argv)
                set tags $argv[$i]
            else
                echo "Error: --tags requires an argument" >&2
                exit 1
            end
        case '*'
            # If it doesn't start with -, assume it's the filename
            if not string match -q -- '-*' $arg
                set filename $arg
            else
                echo "Error: Unknown option: $arg" >&2
                show_help
                exit 1
            end
    end
    
    set i (math $i + 1)
end

# Check if filename was provided
if test -z "$filename"
    echo "Error: Filename is required" >&2
    show_help
    exit 1
end

# Remove .md extension if provided
set filename (string replace -r '\.md$' '' $filename)

# Get current date in YYYY-MM-DD format
set -l current_date (date +%Y-%m-%d)

# Check for config file in project root
set -l config_file ".post-config"
if test -f $config_file
    # Read config file
    while read -l line
        # Skip empty lines and comments
        if test -z "$line"; or string match -q '#*' $line
            continue
        end
        
        # Parse key=value pairs
        set -l key (string split -m 1 '=' $line)[1]
        set -l value (string split -m 1 '=' $line)[2]
        
        switch $key
            case author
                if test -z "$author"
                    set author $value
                end
            case tags
                if test -z "$tags"
                    set tags $value
                end
            case excerpt
                if test -z "$excerpt"
                    set excerpt $value
                end
        end
    end < $config_file
end

# Prompt for missing fields (if --prompt is set)
if $prompt
    if test -z "$title"
        read -P "Post title: " title
    end
    
    if test -z "$author"
        read -P "Author name: " author
    end
    
    if test -z "$excerpt"
        read -P "Post excerpt (optional): " excerpt
    end
    
    if test -z "$tags"
        read -P "Tags (comma-separated, optional): " tags
    end
end

# Use defaults if still empty
if test -z "$title"
    set title "Untitled Post"
end

if test -z "$author"
    set author "Anonymous"
end

# Create _posts directory if it doesn't exist
if not test -d _posts
    mkdir -p _posts
    echo "Created _posts directory"
end

# Full file path
set -l filepath "_posts/$filename.md"

# Check if file already exists
if test -f $filepath
    echo "Error: File already exists: $filepath" >&2
    read -P "Overwrite? (y/N): " -n 1 confirm
    echo
    if not string match -qi 'y' $confirm
        echo "Aborted."
        exit 1
    end
end

# Format tags as YAML array
set -l tags_yaml "[]"
if test -n "$tags"
    # Split tags by comma and create YAML array
    set -l tag_list (string split ',' $tags)
    set -l formatted_tags
    for tag in $tag_list
        set -l trimmed_tag (string trim $tag)
        set -a formatted_tags "\"$trimmed_tag\""
    end
    set tags_yaml "["(string join ', ' $formatted_tags)"]"
end

# Create the markdown file with frontmatter
echo "---" > $filepath
echo "title: \"$title\"" >> $filepath
echo "date: \"$current_date\"" >> $filepath
echo "author: \"$author\"" >> $filepath
echo "tags: $tags_yaml" >> $filepath
if test -n "$excerpt"
    echo "excerpt: \"$excerpt\"" >> $filepath
end
echo "---" >> $filepath
echo "" >> $filepath
echo "# $title" >> $filepath
echo "" >> $filepath
echo "Your content here..." >> $filepath

echo "Created new post: $filepath"
echo ""
echo "Frontmatter:"
echo "  Title: $title"
echo "  Date: $current_date"
echo "  Author: $author"
echo "  Tags: $tags_yaml"
if test -n "$excerpt"
    echo "  Excerpt: $excerpt"
end