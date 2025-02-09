#!/bin/sh

yarn install --frozen-lockfile

echo "Container is ready"

tail -f /dev/null
