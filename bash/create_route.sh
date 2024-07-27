#!/bin/bash
if [ -z "$1" ]; then
  echo "Usage: $0 <path>"
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

PATH_TO_CREATE="$SCRIPT_DIR/../src/routes/$1"

mkdir -p "$PATH_TO_CREATE"
echo "Created route /$1"

touch "$PATH_TO_CREATE/+page.svelte"
touch "$PATH_TO_CREATE/+page.server.ts"
echo "Added to created dir: +page.svelte, +page.server.ts"
