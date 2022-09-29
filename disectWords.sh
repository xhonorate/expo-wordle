echo "[`cat words.json | grep -o '\"[a-z][a-z][a-z]\",' | sed '$ s/,//g'`]" > 3letterwords.json
echo "[`cat words.json | grep -o '\"[a-z][a-z][a-z][a-z]\",' | sed '$ s/,//g'`]" > 4letterwords.json
echo "[`cat words.json | grep -o '\"[a-z][a-z][a-z][a-z][a-z]\",' | sed '$ s/,//g'`]" > 5letterwords.json
echo "[`cat words.json | grep -o '\"[a-z][a-z][a-z][a-z][a-z][a-z]\",' | sed '$ s/,//g'`]" > 6letterwords.json
echo "[`cat words.json | grep -o '\"[a-z][a-z][a-z][a-z][a-z][a-z][a-z]\",' | sed '$ s/,//g'`]" > 7letterwords.json
echo "[`cat words.json | grep -o '\"[a-z][a-z][a-z][a-z][a-z][a-z][a-z][a-z]\",' | sed '$ s/,//g'`]" > 8letterwords.json

echo "[`cat commonWords.json | grep -o '\"[a-z][a-z][a-z]\",' | sed '$ s/,//g'`]" > 3lettercommonwords.json
echo "[`cat commonWords.json | grep -o '\"[a-z][a-z][a-z][a-z]\",' | sed '$ s/,//g'`]" > 4lettercommonwords.json
echo "[`cat commonWords.json | grep -o '\"[a-z][a-z][a-z][a-z][a-z]\",' | sed '$ s/,//g'`]" > 5lettercommonwords.json
echo "[`cat commonWords.json | grep -o '\"[a-z][a-z][a-z][a-z][a-z][a-z]\",' | sed '$ s/,//g'`]" > 6lettercommonwords.json
echo "[`cat commonWords.json | grep -o '\"[a-z][a-z][a-z][a-z][a-z][a-z][a-z]\",' | sed '$ s/,//g'`]" > 7lettercommonwords.json
echo "[`cat commonWords.json | grep -o '\"[a-z][a-z][a-z][a-z][a-z][a-z][a-z][a-z]\",' | sed '$ s/,//g'`]" > 8lettercommonwords.json