datelist = [
    '2020-01-25', '2020-01-26', '2020-01-27', '2020-01-28', '2020-01-29',
    '2020-01-30', '2020-01-31', '2020-02-01', '2020-02-02', '2020-02-03',
    '2020-02-04', '2020-02-05', '2020-02-06', '2020-02-07', '2020-02-08',
    '2020-02-09', '2020-02-10', '2020-02-11', '2020-02-12', '2020-02-13',
    '2020-02-14', '2020-02-15', '2020-02-16', '2020-02-17', '2020-02-18',
    '2020-02-19', '2020-02-20', '2020-02-21', '2020-02-22', '2020-02-23',
    '2020-02-24', '2020-02-25', '2020-02-26', '2020-02-27', '2020-02-28',
    '2020-02-29', '2020-03-01', '2020-03-02', '2020-03-03', '2020-03-04',
    '2020-03-05', '2020-03-06', '2020-03-07', '2020-03-08', '2020-03-09',
    '2020-03-10', '2020-03-11', '2020-03-12', '2020-03-13', '2020-03-14',
    '2020-03-15', '2020-03-16', '2020-03-17', '2020-03-18', '2020-03-19',
    '2020-03-20', '2020-03-21', '2020-03-22', '2020-03-23', '2020-03-24',
    '2020-03-25', '2020-03-26', '2020-03-27', '2020-03-28', '2020-03-29',
    '2020-03-30', '2020-03-31', '2020-04-01', '2020-04-02', '2020-04-03',
    '2020-04-04', '2020-04-05', '2020-04-06', '2020-04-07', '2020-04-08',
    '2020-04-09', '2020-04-10', '2020-04-11', '2020-04-12', '2020-04-13',
    '2020-04-14', '2020-04-15', '2020-04-16', '2020-04-17', '2020-04-18',
    '2020-04-19', '2020-04-20', '2020-04-21', '2020-04-22', '2020-04-23',
    '2020-04-24', '2020-04-25', '2020-04-26', '2020-04-27', '2020-04-28',
    '2020-04-29', '2020-04-30', '2020-05-01', '2020-05-02', '2020-05-03',
    '2020-05-04', '2020-05-05', '2020-05-06', '2020-05-07', '2020-05-08',
    '2020-05-09', '2020-05-10', '2020-05-11', '2020-05-12', '2020-05-13',
    '2020-05-14', '2020-05-15', '2020-05-16', '2020-05-17', '2020-05-18',
    '2020-05-19', '2020-05-20', '2020-05-21', '2020-05-22', '2020-05-23',
    '2020-05-24', '2020-05-25', '2020-05-26', '2020-05-27', '2020-05-28',
    '2020-05-29', '2020-05-30', '2020-05-31', '2020-06-01', '2020-06-02',
    '2020-06-03', '2020-06-04', '2020-06-05', '2020-06-06', '2020-06-07',
    '2020-06-08', '2020-06-09', '2020-06-10', '2020-06-11', '2020-06-12',
    '2020-06-13', '2020-06-14', '2020-06-15', '2020-06-16', '2020-06-17',
    '2020-06-18', '2020-06-19', '2020-06-20', '2020-06-21', '2020-06-22',
    '2020-06-23', '2020-06-24', '2020-06-25', '2020-06-26', '2020-06-27',
    '2020-06-28', '2020-06-29', '2020-06-30', '2020-07-01', '2020-07-02',
    '2020-07-03', '2020-07-04', '2020-07-05', '2020-07-06', '2020-07-07',
    '2020-07-08'
]
import pandas as pd
import json
import os
import copy

ans = {}

f = pd.read_csv("./tmpdata.csv", encoding="utf-8")
csv_file = pd.DataFrame(f)

f1 = open("./China.json", encoding="utf-8")
json_file = json.load(f1)
f1.close()

for day, value in enumerate(datelist):
    print(day, value)

    json_file_copy = copy.deepcopy(json_file)
    for x, y in json_file_copy.items():

        citys = y["citys"]
        if (x in ["香港特别行政区", "澳门特别行政区", "台湾省"]):
            day_tmp = day

            area = ""
            if (x == "香港特别行政区"):
                area = "香港"
            if (x == "澳门特别行政区"):
                area = "澳门"
            if (x == "台湾省"):
                area = "台湾"
            while (len(csv_file[(csv_file.updateTime == datelist[day_tmp]) & (
                    csv_file.provinceName == area)].values.tolist()) == 0):
                day_tmp -= 1
                if (day_tmp < 0):
                    break
            test1 = csv_file[(csv_file.updateTime == datelist[day_tmp]) &
                             (csv_file.provinceName == area)].values.tolist()
            if (len(test1)):
                tmpvalue = test1[0]

                y["province_confirmedCount"] = tmpvalue[1]
                y["province_suspectedCount"] = tmpvalue[2]
                y["province_curedCount"] = tmpvalue[3]
                y["province_deadCount"] = tmpvalue[4]
        else:
            for city in citys:
                day_tmp = day
                name = city["citysName"]
                code = city["adcode"]

                while (len(csv_file[(csv_file.updateTime == datelist[day_tmp])
                                    & (csv_file.city_zipCode == code)].values.
                           tolist()) == 0):
                    day_tmp -= 1
                    if (day_tmp < 0):
                        break
                if (day_tmp >= 0):

                    test1 = csv_file[(csv_file.updateTime == datelist[day_tmp])
                                     & (csv_file.city_zipCode == code)]
                    if (len(test1.values.tolist())):

                        tmpvalue = test1.values.tolist()[0]

                        city["city_confirmedCount"] = int(tmpvalue[8])

                        city["city_suspectedCount"] = int(tmpvalue[9])

                        city["city_curedCount"] = int(tmpvalue[10])

                        city["city_deadCount"] = int(tmpvalue[11])

                        y["province_confirmedCount"] = int(tmpvalue[1])
                        y["province_suspectedCount"] = int(tmpvalue[2])

                        y["province_curedCount"] = int(tmpvalue[3])
                        y["province_deadCount"] = int(tmpvalue[4])
            day_tmp = day

            area = x
            while (len(csv_file[(csv_file.updateTime == datelist[day_tmp]) & (
                    csv_file.provinceName == area)].values.tolist()) == 0):
                day_tmp -= 1
                if (day_tmp < 0):
                    break
            test1 = csv_file[(csv_file.updateTime == datelist[day_tmp]) &
                             (csv_file.provinceName == area)].values.tolist()
            if (len(test1)):
                tmpvalue = test1[0]

                y["province_confirmedCount"] = max(
                    tmpvalue[1], y["province_confirmedCount"])
                y["province_suspectedCount"] = max(
                    tmpvalue[2], y["province_suspectedCount"])
                y["province_curedCount"] = max(tmpvalue[3],
                                               y["province_curedCount"])
                y["province_deadCount"] = max(tmpvalue[4],
                                              y["province_deadCount"])

    ans[value] = json_file_copy

jsObj = json.dumps(ans, ensure_ascii=False)
with open("demo.json", "w", encoding="utf-8") as fw:
    fw.write(jsObj)
    fw.close()

# test1 = csv_file[(csv_file.updateTime == "2020-07-09")
#                  & (csv_file.city_zipCode == 212310200)]
# print(test1.values.tolist())