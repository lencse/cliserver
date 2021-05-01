#!/usr/bin/env bash

cleanup() {
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

cliserver serve cypress/fixtures/dir2 -p 7102 &

sleep 1

curl http://localhost:7102 | grep --quiet "CLIserver test page"
