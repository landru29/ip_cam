#!/bin/bash

KEEP=1000
JSON=files.json

while true;
do
   FILE_TO_DELETE=`ls -t *.jpg |tail -n +$KEEP`

   for f in $FILE_TO_DELETE
   do
      rm $f
   done

   echo "[">$JSON
   FILE_TO_FOLLOW=`ls -t *.jpg`
   for f in $FILE_TO_FOLLOW
   do
       echo "\"$f\",">>$JSON
   done 
   echo "\"\"]">>$JSON

   sleep 15

done
