#!/usr/bin/python3

import json
import sys
import csv
import os

folder = sys.argv[1]
parentDirStr = sys.argv[2]
directoryStr = parentDirStr + '/' + folder

def make_file_list(_dirStr):
    try:
        csvFile = open(_dirStr + "/index.csv", "r")

        dict_reader = csv.DictReader(csvFile, delimiter=';')
        dict_from_csv = list(dict_reader)
        for i in reversed(range(len(dict_from_csv))):
            if (dict_from_csv[i]['enabled'] == '0'):
                dict_from_csv.pop(i)

        csvFile.close()
        return dict_from_csv
        

    except:
        print("No index.csv found in " + _dirStr + ".")

def recursive_check(dirString):
    outputDict = {}
    for dir in os.listdir(dirString):
        fullpath = os.path.join(dirString, dir)
        if os.path.isdir(fullpath):
            # print(fullpath)
            outputDict[str(dir)] = recursive_check(fullpath)

    outputDict["_"] = make_file_list(dirString)

    return outputDict

json_from_csv = json.dumps(recursive_check(directoryStr))
# print(json_from_csv)
file = open(directoryStr + ".json", "w")
file.write(json_from_csv)
file.close()