#!/bin/bash
RUN_FILE='./save.sh'
WAIT_TIME=7d

while true
do
    echo "Running $RUN_FILE"
    $RUN_FILE
    sleep $WAIT_TIME
done
