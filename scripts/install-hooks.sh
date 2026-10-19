#!/usr/bin/env sh
set -eu
git config core.hooksPath .githooks
echo 'Security pre-commit hook enabled for this repository.'
