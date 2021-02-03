import os
import json

Province = {
    "01": "AL",
    "02": "AK",
    "04": "AZ",
    "05": "AR",
    "06": "CA",
    "08": "CO",
    "09": "CT",
    "10": "DE",
    "11": "DC",
    "12": "FL",
    "13": "GA",
    "15": "HI",
    "16": "ID",
    "17": "IL",
    "18": "IN",
    "19": "IA",
    "20": "KS",
    "21": "KY",
    "22": "LA",
    "23": "ME",
    "24": "MD",
    "25": "MA",
    "26": "MI",
    "27": "MN",
    "28": "MS",
    "29": "MO",
    "30": "MT",
    "31": "NE",
    "32": "NV",
    "33": "NH",
    "34": "NJ",
    "35": "NM",
    "36": "NY",
    "37": "NC",
    "38": "ND",
    "39": "OH",
    "40": "OK",
    "41": "OR",
    "42": "PA",
    "44": "RI",
    "45": "SC",
    "46": "SD",
    "47": "TN",
    "48": "TX",
    "49": "UT",
    "50": "VT",
    "51": "VA",
    "53": "WA",
    "54": "WV",
    "55": "WI",
    "56": "WY",
    "72":"PR"
}
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


path = "./USAGeo/"

for wenjian in os.listdir(path):
    if (wenjian == "USA_ALL.json"):
        continue
    fr = open(path + wenjian, encoding="utf-8")
    file = json.load(fr)
    fr.close()
    file["features"] = []
    jsObj = json.dumps(file, ensure_ascii=False)
    with open(path + wenjian, "w", encoding="utf-8") as fw:
        fw.write(jsObj)
        fw.close()

fr = open("./highlyUSAdata.json", encoding="utf-8")
ALL = json.load(fr)
fr.close()

for file in ALL["features"]:
    averageX = 0
    averageY = 0
    num = 0
    state = file["properties"]["STATE"]
    stateName = Province[state]

    position = file["geometry"]["coordinates"]
    LLL(position)
    averageX /= num
    averageY /= num
    file['properties']['center'] = [averageX, averageY]
    file['properties']["name"] = file['properties'].pop("NAME")
    fr = open(path + stateName + ".json", encoding="utf-8")
    test = json.load(fr)
    fr.close()
    test["features"].append(file)
    jsObj = json.dumps(test, ensure_ascii=False)
    with open(path + stateName + ".json", "w", encoding="utf-8") as fw:
        fw.write(jsObj)
        fw.close()
