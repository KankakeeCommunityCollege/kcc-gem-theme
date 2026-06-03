#!/usr/bin/env bash

# echo "## ================================== ##"
# echo "##        Running Jekyll build.       ##"
# echo "## ================================== ##"
# echo ""
# bundle exec jekyll build
# echo ""

# Exit immediately on error, except where explicitly handled (like curl checks)
set -e

echo "## ================================== ##"
echo "##   Checking if Pa11y is installed.  ##"
echo "## ================================== ##"
echo ""
if command -v pa11y >/dev/null 2>&1; then
  echo "## ================================== ##"
  echo "##        Pa11y is installed.         ##"
  echo "## ================================== ##"
else
  echo "## ================================== ##"
  echo "##      Pa11y is not installed.       ##"
  echo "##               ...                  ##"
  echo "##         installing pa11y.          ##"
  echo "## ================================== ##"
  npm install -g pa11y
fi
echo ""

OUTPUT_ARG_PASSED=false
SKIP_BUILD_ARG_PASSED=false

while getopts ":os" opt; do
  case $opt in
    o)
      OUTPUT_ARG_PASSED=true
      ;;
    s)
      SKIP_BUILD_ARG_PASSED=true
      ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      exit 1
      ;;
  esac
done
shift $((OPTIND-1))

# --- BASH 3 COMPATIBLE CLEANUP TRAP ---
# This ensures that Jekyll running on port 3000 is always killed when the script ends.
cleanup() {
  if [ "$SKIP_BUILD_ARG_PASSED" = false ]; then
    echo ""
    echo "Stopping background Jekyll server on port 3000..."
    pkill -f jekyll || true
  fi
}
trap cleanup EXIT
# --------------------------------------

if $SKIP_BUILD_ARG_PASSED; then
  echo "## ================================== ##"
  echo "##       Skipping Jekyll build.       ##"
  echo "## ================================== ##"
  echo ""
else
  echo "## ================================== ##"
  echo "##        Running Jekyll build.       ##"
  echo "## ================================== ##"
  echo ""
  JEKYLL_ENV=production bundle exec jekyll serve --detach
  echo ""
  
  echo "Waiting for Jekyll to finish compiling and start listening on port 3000..."
  # Pure Bash 3 syntax: directly test the curl exit status without command substitution
  until curl --output /dev/null --silent --head --fail http://localhost:3000; do
      printf '.'
      sleep 1
  done
  echo -e "\nJekyll server is ready!"
  echo ""
fi

echo "## ================================== ##"
echo "##      Running Pa11y via localhost.  ##"
echo "## ================================== ##"
echo ""

if $OUTPUT_ARG_PASSED; then
  echo ""
  echo "Argument '-o' was passed. Writing Pa11y output to log file."
  echo ""
  # Add commands for when the specific argument is passed
  timestamp=$(date +"%Y-%m-%dT%H:%M:%S")
  filename="pa11y-log.$timestamp.txt"

  echo "##     Pa11y results     ##" > $filename
  echo "" >> $filename
  # Find all HTML files recursively within the _site directory
  # and loop through each file
  # Find files and loop using standard Bash 3 string manipulation
  find _site -name "*.html" | while read -r file; do
    # Strip the "_site/" prefix to get the relative web path
    relative_path="${file#_site/}"
    target_url="http://localhost:3000/${relative_path}"
    
    echo "Checking accessibility for: $target_url" | tee -a "$filename"
    
    # Run Pa11y targeting the local web server URL
    # added "|| true" to keep loop executing if accessibility issues are found
    pa11y "$target_url" --config ./pa11y.dev.json 2>&1 | tee -a "$filename" || true
    echo "" >> "$filename"
  done
else
  echo ""
  echo "Argument '-o' was missing. Pa11y will output to stdout."
  echo ""
  # Add commands for when the argument is missing
  # Find all HTML files recursively within the _site directory
  # and loop through each file
  find _site -name "*.html" | while read -r file; do
    relative_path="${file#_site/}"
    target_url="http://localhost:3000/${relative_path}"
    
    echo "Checking accessibility for: $target_url"
    
    # Run Pa11y targeting the local web server URL
    pa11y "$target_url" --config ./pa11y.dev.json || true
    echo ""
  done
fi

echo ""
echo "## ================================== ##"
echo "##               DONE                 ##"
echo "## ================================== ##"
echo ""
