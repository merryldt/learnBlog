#!/bin/bash
echo "Hello, $1!"

git add . && git commit -m"add $1" && git push origin main