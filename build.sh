#!/usr/bin/env bash


green='\e[21;32m%s\e[0m\n'
printf "$green" "git pull\n"
git pull
printf "$green" "yarn build\n"
yarn build
printf "$green" "yarn start\n"
yarn start
printf "$green" "yarn done\n"
