import pandas as pd
import json

f = open("./code_new.json", encoding="utf-8")
code = json.load(f)
f.close()

file = pd.read_csv("./tmpdata.csv")

a = file[(file.city_zipCode.isnull() == True)
         & (file.cityName.isnull() == False) & (file.cityName != "未知地区")]

t = a.loc[:, ['cityName', "city_zipCode"]]

for index, row in t.iterrows():
    name = row['cityName']
    if code.get(name):
        file.at[index, "city_zipCode"] = code.get(name)

        # print(code.get(name))
    elif code.get(name + "市"):
        file.at[index, "city_zipCode"] = code.get(name + "市")

        # print(code.get(name))
    elif code.get(name + "区"):
        file.at[index, "city_zipCode"] = code.get(name + "区")
    elif code.get(name + "县"):
        file.at[index, "city_zipCode"] = code.get(name + "县")

    else:
        name1 = name

        for x, y in code.items():

            if ((name1 in x) or (name1[0:-1] in x)):
                file.at[index, "city_zipCode"] = y
                break

file.to_csv("tmpdata.csv", encoding="utf-8")
