import os
import json
parentPath = "./USA/"
Out = "./USAGeo/"
files = os.listdir(parentPath)
for citys in files:
    sonPath = parentPath + citys + '/'
    countrys = os.listdir(sonPath)
    ans = {}
    ans["type"] = "FeatureCollection"
    ans["features"] = []
    for country in countrys:
        fr = open(sonPath + country, encoding="utf-8")
        file = json.load(fr)
        fr.close()
        ans["features"].append(file["features"][0])
    jsObj = json.dumps(ans, ensure_ascii=False)
    with open(Out + citys + ".json", "w", encoding="utf-8") as fw:
        fw.write(jsObj)
        fw.close()
