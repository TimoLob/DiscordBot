#!/bin/bash
pm2 stop DiscordBot
git fetch
git pull
pm2 start index.js --name "DiscordBot" --watch