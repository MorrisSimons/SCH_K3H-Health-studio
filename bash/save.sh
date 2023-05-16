#!/bin/bash
FILE_PATH='../db/'
FILE='k3h.sqlite3'
DESTINATION_PATH='../db/backups/'
FLAGS="-f -u --backup=t"

if [ "$cd $DESTINATION_PATH" != "" ]
then
	mkdir $DESTINATION_PATH -p
fi

if [ "$(ls $FILE_PATH | grep $FILE)" == $FILE ]
then
	cp $FILE_PATH$FILE $DESTINATION_PATH $FLAGS 
else 
	echo "No such file in the path given"
fi

