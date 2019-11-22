#!/bin/bash/

while true; do
    read -p "Did you run 'cp ruby-version.txt .ruby-version && rvm use && nvm use'? [Y/N]: " yn
    case $yn in
        [Yy]* ) echo "" && echo "Proceeding with install" && echo ""; break;;
        [Nn]* ) exit;;
        * ) echo "" && echo "Please answer yes or no." && echo "";;
    esac
done

echo "" && echo "Running npm install" && echo ""

sleep .5

echo "NPM will return permission errors if you do not have NVM - https://github.com/creationix/nvm"

sleep 1

# NPM install
npm install

echo "Running bundle install"

sleep 1

# Bundle install
bundle install

sleep 1

uname=$(uname)
# If your on a Linux machine do...
if [ "$uname" = "Linux" ]
  then
    # fix for node.js watch ENOSPC errors
    # increases the max number of system watchers on linux
    echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
    echo "[LINUX]: Increase max watchers on Linux platforms"
    sleep 1
  else
    echo "[Skipping](optional): Increase max watchers on Linux platforms. Your system: $uname"
fi
unset UNAME

sleep 1

echo "" && echo "Installation Complete!" && echo ""
