#!/bin/bash

 echo `date` >> git_pull.log

git checkout master --quiet
git fetch -p --all --quiet
git reset --hard origin/master --quiet

git pull origin master >> git_pull.log