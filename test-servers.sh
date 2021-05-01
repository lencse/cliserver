#!/usr/bin/env bash

cleanup() {
    # kill all processes whose parent is this process
    pkill -P $$
}

for sig in INT QUIT HUP TERM; do
    trap "
        cleanup
        trap - $sig EXIT
        kill -s $sig "'"$$"' "$sig"
done

trap cleanup EXIT

set -e

NAMES=""
COMMANDS=""

for FILE in cypress/integration/*.js;
do
    CMD=$(grep '\/\/\$' $FILE | sed 's/^\/\/\$ //')
    COMMANDS="$COMMANDS \"$CMD\""
    NAME=$(echo $FILE | sed s/\.js$// | sed "s/^.*\///")
    NAMES="$NAMES,$NAME"
done

NAMES=$(echo $NAMES | sed s/^,//)

eval "node_modules/.bin/concurrently -n $NAMES $COMMANDS"

echo $NAMES
echo $COMMANDS

wait
