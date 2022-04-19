#!/usr/bin/python

import os
import sys
import csv
from datetime import datetime

imgExt = (".png",".jpg",".jpeg",".bmp",".gif",".mp4")

contDir = sys.argv[1]
imgDir = sys.argv[2]
baseDir = sys.argv[3]
directoryStr = contDir + '/' + imgDir
directory = os.fsencode(directoryStr)

fieldnames = ['id','enabled','name','fileLoc','location','year','month','description']

class ImageData:
    def __init__(self, enabled, name, fileLoc, location, year, month, description):
        self.enabled = enabled
        self.name = name
        self.fileLoc = fileLoc
        self.location = location
        self.year = year
        self.month = month
        self.description = description

presentFilesDict = {}

for file in os.listdir(directory):
    filename = os.fsdecode(file)
    # print(filename)
    if filename.endswith(".csv"):
        continue
    for ext in imgExt:
        if filename.endswith(ext):
            id = filename.replace(' ','_')
            name = filename.removesuffix(ext)
            fileLocation = baseDir + imgDir + "/" + filename
            unixTime = os.path.getmtime(directoryStr + "/" + filename)
            dateTime = datetime.fromtimestamp(unixTime)
            year = dateTime.year
            month = dateTime.month

            presentFilesDict[id] = ImageData(1, name, fileLocation, '', year, month, '')
            continue

indexFile = contDir + '/' + imgDir + '/index.csv'
if not os.path.exists(indexFile):
    with open(indexFile, 'w', newline='') as csvfile:
        writer = csv.DictWriter(csvfile, delimiter=';', fieldnames=fieldnames)

        writer.writeheader()
        for key in presentFilesDict:
            row = presentFilesDict[key]
            writer.writerow({
                'id': key, 
                'enabled': row.enabled, 
                'name': row.name, 
                'fileLoc': row.fileLoc, 
                'location': row.location, 
                'year': row.year, 
                'month': row.month, 
                'description': row.description})

    print(indexFile + " created.")

else:
    with open(indexFile, 'r', newline='') as csvfile:
        reader = csv.DictReader(csvfile, delimiter=';')

        for row in reader:
            key = row['id']
            if key in presentFilesDict:
                presentFilesDict[key].enabled = row['enabled']
                presentFilesDict[key].name = row['name']
                presentFilesDict[key].location = row['location']
                presentFilesDict[key].year = row['year']
                presentFilesDict[key].month = row['month']
                presentFilesDict[key].description = row['description']
            else:
                presentFilesDict[key] = ImageData(0, row['name'], '', row['location'], row['year'], row['month'], row['description'])
    
    with open(indexFile, 'w', newline='') as csvfile:
        writer = csv.DictWriter(csvfile, delimiter=';', fieldnames=fieldnames)

        writer.writeheader()
        for key in presentFilesDict:
            row = presentFilesDict[key]
            writer.writerow({
                'id': key, 
                'enabled': row.enabled, 
                'name': row.name, 
                'fileLoc': row.fileLoc, 
                'location': row.location, 
                'year': row.year, 
                'month': row.month, 
                'description': row.description})

    print(indexFile + " updated.")
 