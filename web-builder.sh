#!/bin/bash
cd -- "$(dirname "$BASH_SOURCE")"

APPDIR=waf_web
CONTDIR=Content

BASEDIR=/

echo "Write:"
echo "index      - to initialize CSV files in new image folders"
echo "build      - to build the web application"
echo "test       - to test the web application"
echo "push       - to put the web application on the internet"
echo "exit       - to close this terminal"

read input

while [ $input != "exit" ]; do

    case $input in

        "index")
            shopt -s globstar
            for DIR in $CONTDIR/**/*; do
                # if [ -d $DIR ] && [ ! -f $DIR/index.csv ]; then
                if [ -d $DIR ] ; then
                    python3 .Assembler/CsvFromFolder.py "$DIR" $BASEDIR
                fi
            done
            echo "Done initializing."
            echo ""
            ;;

        "indexreset")
            shopt -s globstar
            for DIR in $CONTDIR/**/*; do
                if [ -d $DIR ]; then
                    if [ -f $DIR/index.csv ]; then
                        rm $DIR/index.csv
                    fi
                    python3 .Assembler/CsvFromFolder.py "$DIR" $BASEDIR
                fi
            done
            echo "Done initializing."
            echo ""
            ;;

        "build")
            echo "Assembling content..."
            cd .Assembler 
            ./Assembler.sh $APPDIR $CONTDIR
            echo "Done assembling."
            echo ""
            cd ..
            ;;

        "test")
            cd $APPDIR
            npm start
            ;;

        "push")
            cd $APPDIR

            BUILD="$(date +%s)"

            # commit
            git add .
            git commit -m "build $BUILD"
            # push

            # Backup
            cd ..
            if [ ! -d backup ]; then
                mkdir backup
            fi
            tar -cf $APPDIR-$BUILD.tar $APPDIR
            mv $APPDIR-*.tar backup
            ;;

        *)
            echo "Invalid input"
            ;;
    
    esac

    read input
done
