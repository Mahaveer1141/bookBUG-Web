# ! /usr/local/bin/bash

osascript -e 'activate application "iTerm"' \
    -e 'tell application "System Events" to tell process "iTerm" to keystroke "cd server && npm run watch"' \
    -e 'tell application "System Events" to tell process "iTerm" to key code 52' \
    -e 'tell application "System Events" to keystroke "t" using command down' \
    -e 'tell application "System Events" to tell process "iTerm" to keystroke "cd server && npm run dev"' \
    -e 'tell application "System Events" to tell process "iTerm" to key code 52'

osascript -e 'activate application "iTerm"' \
    -e 'tell application "System Events" to keystroke "t" using command down' \
    -e 'tell application "System Events" to tell process "iTerm" to keystroke "cd client && npm run dev"' \
    -e 'tell application "System Events" to tell process "iTerm" to key code 52'
