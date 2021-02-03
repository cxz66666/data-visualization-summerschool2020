import json
import os

PATH = "./USAGeo/"
averageX = 0
averageY = 0
num = 0


def LLL(list1):

    if (type(list1[0]) != float):
        for x in list1:
            LLL(x)
    else:
        global averageX, averageY, num
        averageX += list1[0]
        averageY += list1[1]
        num += 1


files = os.listdir(PATH)
for x in files:

    fr = open(PATH + x, encoding="utf-8")
    file = json.load(fr)
    fr.close()

    citys = file["features"]

    for city in citys:
        averageX = 0
        averageY = 0
        num = 0
        position = city["geometry"]["coordinates"]

        LLL(position)
        averageX /= num
        averageY /= num

        city['properties']['center'] = [averageX, averageY]

    jsObj = json.dumps(file, ensure_ascii=False)
    with open(PATH + x, "w", encoding="utf-8") as fw:
        fw.write(jsObj)
        fw.close()