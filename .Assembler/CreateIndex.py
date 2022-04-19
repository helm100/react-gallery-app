#!/usr/bin/python3

import json
import os

def remove_suffix(str, sfx):
    if (str.endswith(sfx)):
        return str[0:(len(str) - len(sfx))]
    return str

def main():
    directoryStr = '../Content/'
    directory = os.fsencode(directoryStr)

    output = []

    for file in os.listdir(directory):
        filename = jsName = name = os.fsdecode(file)
        # print(filename)
        name = name[2:]
        jsName = 'v' + jsName

        if (filename.endswith(".md")):
            output.append({
                "name": remove_suffix(name, ".md"),
                "jsName": remove_suffix(jsName, ".md"),
                "type": "text",
                "import": remove_suffix(filename, ".md")
            })

        elif (os.path.isdir(directoryStr + "/" + filename) & os.path.isfile(directoryStr + "/" + filename + "/index.csv")):
            output.append({
                "name": name,
                "jsName": jsName,
                "type": "gallery",
                "import": filename + ".json"
            })

    outputSorted = sorted(output, key=lambda p: p['import'])

    jsonStr = json.dumps(outputSorted)
    file = open(directoryStr + "/index.json", "w")
    file.write(jsonStr)
    file.close()
    print("Created index.json")

    pageIndexJs = ""
    for p in outputSorted:
        pageIndexJs += "import " + p["jsName"] + " from './" + p["import"] + "';\n"

    pageIndexJs += "\nconst pageMapper = {"
    for p in outputSorted:
        pageIndexJs += '"{jsName}": {jsName}, '.format(jsName = p["jsName"])
    pageIndexJs = pageIndexJs[0:-2] + "};\n\n"

    pageIndexJs += "export {pageMapper};"

    file = open(directoryStr + "/pageIndex.js", "w")
    file.write(pageIndexJs)
    file.close()
    print("Created pageIndex.js")

if __name__ == "__main__":
    main()