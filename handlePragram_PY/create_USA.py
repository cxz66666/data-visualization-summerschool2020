import json


class Vividict(dict):
    def __missing__(self, key):
        value = self[key] = type(self)()
        return value


ans = Vividict()

fr = open("./daily.json", encoding="utf-8")
file = json.load(fr)
fr.close()

datas = file["data"]

for data in datas:
    dateId = str(data["dateId"])
    adcode = data["provinceCode"]
    provinceName = data["provinceName"]
    province_confirmedCount = data["confirmedCount"]
    province_suspectedCount = data["suspectedIncr"]
    province_curedCount = data["curedCount"]
    province_deadCount = data["deadCount"]
    province_increase = data["confirmedIncr"]
    citys = []

    year = dateId[0:4]
    month = dateId[4:6]
    day = dateId[6:]
    ans[year + '-' + month + '-' + day][provinceName] = {
        "provinceName": provinceName,
        "adcode": adcode,
        "province_confirmedCount": province_confirmedCount,
        "province_suspectedCount": province_suspectedCount,
        "province_curedCount": province_curedCount,
        "province_deadCount": province_deadCount,
        "province_increase": province_increase
    }

jsObj = json.dumps(ans, ensure_ascii=False)
with open("USA_all_data.json", "w", encoding="utf-8") as fw:
    fw.write(jsObj)
    fw.close()