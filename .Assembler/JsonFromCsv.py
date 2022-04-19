#!/usr/bin/python

import json
import sys
import csv

folder = sys.argv[1]
parentDirStr = sys.argv[2]
directoryStr = parentDirStr + '/' + folder

try:
    csvFile = open(directoryStr + "/index.csv", "r")

    dict_reader = csv.DictReader(csvFile, delimiter=';')
    dict_from_csv = list(dict_reader)
    for i in reversed(range(len(dict_from_csv))):
        if (dict_from_csv[i]['enabled'] == '0'):
            dict_from_csv.pop(i)

    json_from_csv = json.dumps(dict_from_csv)
    # print(json_from_csv)

    csvFile.close()

    file = open(parentDirStr + "/" + folder + ".json", "w")
    file.write(json_from_csv)
    file.close()

except:
    print("No index.csv found in " + directoryStr + ".")