#!/bin/bash

APPDIR=../$1
CONTDIR=../$2

# Cleanup old json
if [ -f "$CONTDIR/*.json" ]; then
    rm $CONTDIR/*.json
fi
# Cleanup old pages
rm $APPDIR/src/pages/*.json
rm $APPDIR/src/pages/*.js
for DIR in $APPDIR/public/*; do
    if [ -d "$DIR" ]; then
        rm -r $DIR
    fi
done

python3 CreateIndex.py
mv $CONTDIR/index.json $APPDIR/src/pages/
mv $CONTDIR/pageIndex.js $APPDIR/src/pages/

for FILE in $CONTDIR/*; do 
    FILENAME=$(basename $FILE)
    BASENAME=${FILENAME%.md}

    if [ -d "$FILE" ] && [ -f "$FILE/index.csv" ]; then
        python3 JsonFromCsv.py $FILENAME $CONTDIR
        mv $CONTDIR/*.json $APPDIR/src/pages/
        cp -r $FILE $APPDIR/public/
        rm $APPDIR/public/$FILENAME/*.csv
    
    elif [[ $FILE == *.md ]]; then        
        cat <<EOM >$CONTDIR/$BASENAME.js
        const ${BASENAME:2} = () => {
            return (
                <main>
                    $(pandoc $FILE)
                </main>
            )
        }

        export default ${BASENAME:2};
EOM
    mv $CONTDIR/$BASENAME.js $APPDIR/src/pages/
    fi
    
done