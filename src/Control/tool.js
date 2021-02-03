const Province = [
  "上海市",
  "云南省",
  "内蒙古自治区",
  "北京市",
  "台湾省",
  "吉林省",
  "四川省",
  "天津市",
  "宁夏回族自治区",
  "安徽省",
  "山东省",
  "山西省",
  "广东省",
  "广西壮族自治区",
  "新疆维吾尔自治区",
  "江苏省",
  "江西省",
  "河北省",
  "河南省",
  "浙江省",
  "海南省",
  "湖北省",
  "湖南省",
  "澳门特别行政区",
  "甘肃省",
  "福建省",
  "西藏自治区",
  "贵州省",
  "辽宁省",
  "重庆市",
  "陕西省",
  "青海省",
  "香港特别行政区",
  "黑龙江省",
];
const City = {
  黄浦区: "上海市",
  徐汇区: "上海市",
  长宁区: "上海市",
  静安区: "上海市",
  普陀区: "上海市",
  虹口区: "上海市",
  杨浦区: "上海市",
  闵行区: "上海市",
  宝山区: "上海市",
  嘉定区: "上海市",
  浦东新区: "上海市",
  金山区: "上海市",
  松江区: "上海市",
  青浦区: "上海市",
  奉贤区: "上海市",
  崇明区: "上海市",
  昆明市: "云南省",
  曲靖市: "云南省",
  玉溪市: "云南省",
  保山市: "云南省",
  昭通市: "云南省",
  丽江市: "云南省",
  普洱市: "云南省",
  临沧市: "云南省",
  楚雄彝族自治州: "云南省",
  红河哈尼族彝族自治州: "云南省",
  文山壮族苗族自治州: "云南省",
  西双版纳傣族自治州: "云南省",
  大理白族自治州: "云南省",
  德宏傣族景颇族自治州: "云南省",
  怒江傈僳族自治州: "云南省",
  迪庆藏族自治州: "云南省",
  呼和浩特市: "内蒙古自治区",
  包头市: "内蒙古自治区",
  乌海市: "内蒙古自治区",
  赤峰市: "内蒙古自治区",
  通辽市: "内蒙古自治区",
  鄂尔多斯市: "内蒙古自治区",
  呼伦贝尔市: "内蒙古自治区",
  巴彦淖尔市: "内蒙古自治区",
  乌兰察布市: "内蒙古自治区",
  兴安盟: "内蒙古自治区",
  锡林郭勒盟: "内蒙古自治区",
  阿拉善盟: "内蒙古自治区",
  东城区: "北京市",
  西城区: "北京市",
  朝阳区: "北京市",
  丰台区: "北京市",
  石景山区: "北京市",
  海淀区: "北京市",
  门头沟区: "北京市",
  房山区: "北京市",
  通州区: "北京市",
  顺义区: "北京市",
  昌平区: "北京市",
  大兴区: "北京市",
  怀柔区: "北京市",
  平谷区: "北京市",
  密云区: "北京市",
  延庆区: "北京市",
  台湾省: "台湾省",
  长春市: "吉林省",
  吉林市: "吉林省",
  四平市: "吉林省",
  辽源市: "吉林省",
  通化市: "吉林省",
  白山市: "吉林省",
  松原市: "吉林省",
  白城市: "吉林省",
  延边朝鲜族自治州: "吉林省",
  成都市: "四川省",
  自贡市: "四川省",
  攀枝花市: "四川省",
  泸州市: "四川省",
  德阳市: "四川省",
  绵阳市: "四川省",
  广元市: "四川省",
  遂宁市: "四川省",
  内江市: "四川省",
  乐山市: "四川省",
  南充市: "四川省",
  眉山市: "四川省",
  宜宾市: "四川省",
  广安市: "四川省",
  达州市: "四川省",
  雅安市: "四川省",
  巴中市: "四川省",
  资阳市: "四川省",
  阿坝藏族羌族自治州: "四川省",
  甘孜藏族自治州: "四川省",
  凉山彝族自治州: "四川省",
  和平区: "天津市",
  河东区: "天津市",
  河西区: "天津市",
  南开区: "天津市",
  河北区: "天津市",
  红桥区: "天津市",
  东丽区: "天津市",
  西青区: "天津市",
  津南区: "天津市",
  北辰区: "天津市",
  武清区: "天津市",
  宝坻区: "天津市",
  滨海新区: "天津市",
  宁河区: "天津市",
  静海区: "天津市",
  蓟州区: "天津市",
  银川市: "宁夏回族自治区",
  石嘴山市: "宁夏回族自治区",
  吴忠市: "宁夏回族自治区",
  固原市: "宁夏回族自治区",
  中卫市: "宁夏回族自治区",
  合肥市: "安徽省",
  芜湖市: "安徽省",
  蚌埠市: "安徽省",
  淮南市: "安徽省",
  马鞍山市: "安徽省",
  淮北市: "安徽省",
  铜陵市: "安徽省",
  安庆市: "安徽省",
  黄山市: "安徽省",
  滁州市: "安徽省",
  阜阳市: "安徽省",
  宿州市: "安徽省",
  六安市: "安徽省",
  亳州市: "安徽省",
  池州市: "安徽省",
  宣城市: "安徽省",
  济南市: "山东省",
  青岛市: "山东省",
  淄博市: "山东省",
  枣庄市: "山东省",
  东营市: "山东省",
  烟台市: "山东省",
  潍坊市: "山东省",
  济宁市: "山东省",
  泰安市: "山东省",
  威海市: "山东省",
  日照市: "山东省",
  莱芜市: "山东省",
  临沂市: "山东省",
  德州市: "山东省",
  聊城市: "山东省",
  滨州市: "山东省",
  菏泽市: "山东省",
  太原市: "山西省",
  大同市: "山西省",
  阳泉市: "山西省",
  长治市: "山西省",
  晋城市: "山西省",
  朔州市: "山西省",
  晋中市: "山西省",
  运城市: "山西省",
  忻州市: "山西省",
  临汾市: "山西省",
  吕梁市: "山西省",
  广州市: "广东省",
  韶关市: "广东省",
  深圳市: "广东省",
  珠海市: "广东省",
  汕头市: "广东省",
  佛山市: "广东省",
  江门市: "广东省",
  湛江市: "广东省",
  茂名市: "广东省",
  肇庆市: "广东省",
  惠州市: "广东省",
  梅州市: "广东省",
  汕尾市: "广东省",
  河源市: "广东省",
  阳江市: "广东省",
  清远市: "广东省",
  东莞市: "广东省",
  中山市: "广东省",
  东沙群岛: "广东省",
  潮州市: "广东省",
  揭阳市: "广东省",
  云浮市: "广东省",
  南宁市: "广西壮族自治区",
  柳州市: "广西壮族自治区",
  桂林市: "广西壮族自治区",
  梧州市: "广西壮族自治区",
  北海市: "广西壮族自治区",
  防城港市: "广西壮族自治区",
  钦州市: "广西壮族自治区",
  贵港市: "广西壮族自治区",
  玉林市: "广西壮族自治区",
  百色市: "广西壮族自治区",
  贺州市: "广西壮族自治区",
  河池市: "广西壮族自治区",
  来宾市: "广西壮族自治区",
  崇左市: "广西壮族自治区",
  乌鲁木齐市: "新疆维吾尔自治区",
  克拉玛依市: "新疆维吾尔自治区",
  吐鲁番市: "新疆维吾尔自治区",
  哈密市: "新疆维吾尔自治区",
  昌吉回族自治州: "新疆维吾尔自治区",
  博尔塔拉蒙古自治州: "新疆维吾尔自治区",
  巴音郭楞蒙古自治州: "新疆维吾尔自治区",
  阿克苏地区: "新疆维吾尔自治区",
  克孜勒苏柯尔克孜自治州: "新疆维吾尔自治区",
  喀什地区: "新疆维吾尔自治区",
  和田地区: "新疆维吾尔自治区",
  伊犁哈萨克自治州: "新疆维吾尔自治区",
  塔城地区: "新疆维吾尔自治区",
  阿勒泰地区: "新疆维吾尔自治区",
  石河子市: "新疆维吾尔自治区",
  阿拉尔市: "新疆维吾尔自治区",
  图木舒克市: "新疆维吾尔自治区",
  五家渠市: "新疆维吾尔自治区",
  北屯市: "新疆维吾尔自治区",
  铁门关市: "新疆维吾尔自治区",
  双河市: "新疆维吾尔自治区",
  可克达拉市: "新疆维吾尔自治区",
  昆玉市: "新疆维吾尔自治区",
  南京市: "江苏省",
  无锡市: "江苏省",
  徐州市: "江苏省",
  常州市: "江苏省",
  苏州市: "江苏省",
  南通市: "江苏省",
  连云港市: "江苏省",
  淮安市: "江苏省",
  盐城市: "江苏省",
  扬州市: "江苏省",
  镇江市: "江苏省",
  泰州市: "江苏省",
  宿迁市: "江苏省",
  南昌市: "江西省",
  景德镇市: "江西省",
  萍乡市: "江西省",
  九江市: "江西省",
  新余市: "江西省",
  鹰潭市: "江西省",
  赣州市: "江西省",
  吉安市: "江西省",
  宜春市: "江西省",
  抚州市: "江西省",
  上饶市: "江西省",
  石家庄市: "河北省",
  唐山市: "河北省",
  秦皇岛市: "河北省",
  邯郸市: "河北省",
  邢台市: "河北省",
  保定市: "河北省",
  张家口市: "河北省",
  承德市: "河北省",
  沧州市: "河北省",
  廊坊市: "河北省",
  衡水市: "河北省",
  郑州市: "河南省",
  开封市: "河南省",
  洛阳市: "河南省",
  平顶山市: "河南省",
  安阳市: "河南省",
  鹤壁市: "河南省",
  新乡市: "河南省",
  焦作市: "河南省",
  濮阳市: "河南省",
  许昌市: "河南省",
  漯河市: "河南省",
  三门峡市: "河南省",
  南阳市: "河南省",
  商丘市: "河南省",
  信阳市: "河南省",
  周口市: "河南省",
  驻马店市: "河南省",
  济源市: "河南省",
  杭州市: "浙江省",
  宁波市: "浙江省",
  温州市: "浙江省",
  嘉兴市: "浙江省",
  湖州市: "浙江省",
  绍兴市: "浙江省",
  金华市: "浙江省",
  衢州市: "浙江省",
  舟山市: "浙江省",
  台州市: "浙江省",
  丽水市: "浙江省",
  海口市: "海南省",
  三亚市: "海南省",
  三沙市: "海南省",
  儋州市: "海南省",
  五指山市: "海南省",
  琼海市: "海南省",
  文昌市: "海南省",
  万宁市: "海南省",
  东方市: "海南省",
  定安县: "海南省",
  屯昌县: "海南省",
  澄迈县: "海南省",
  临高县: "海南省",
  白沙黎族自治县: "海南省",
  昌江黎族自治县: "海南省",
  乐东黎族自治县: "海南省",
  陵水黎族自治县: "海南省",
  保亭黎族苗族自治县: "海南省",
  琼中黎族苗族自治县: "海南省",
  武汉市: "湖北省",
  黄石市: "湖北省",
  十堰市: "湖北省",
  宜昌市: "湖北省",
  襄阳市: "湖北省",
  鄂州市: "湖北省",
  荆门市: "湖北省",
  孝感市: "湖北省",
  荆州市: "湖北省",
  黄冈市: "湖北省",
  咸宁市: "湖北省",
  随州市: "湖北省",
  恩施土家族苗族自治州: "湖北省",
  仙桃市: "湖北省",
  潜江市: "湖北省",
  天门市: "湖北省",
  神农架林区: "湖北省",
  长沙市: "湖南省",
  株洲市: "湖南省",
  湘潭市: "湖南省",
  衡阳市: "湖南省",
  邵阳市: "湖南省",
  岳阳市: "湖南省",
  常德市: "湖南省",
  张家界市: "湖南省",
  益阳市: "湖南省",
  郴州市: "湖南省",
  永州市: "湖南省",
  怀化市: "湖南省",
  娄底市: "湖南省",
  湘西土家族苗族自治州: "湖南省",
  花地玛堂区: "澳门特别行政区",
  花王堂区: "澳门特别行政区",
  望德堂区: "澳门特别行政区",
  大堂区: "澳门特别行政区",
  风顺堂区: "澳门特别行政区",
  嘉模堂区: "澳门特别行政区",
  路凼填海区: "澳门特别行政区",
  圣方济各堂区: "澳门特别行政区",
  兰州市: "甘肃省",
  嘉峪关市: "甘肃省",
  金昌市: "甘肃省",
  白银市: "甘肃省",
  天水市: "甘肃省",
  武威市: "甘肃省",
  张掖市: "甘肃省",
  平凉市: "甘肃省",
  酒泉市: "甘肃省",
  庆阳市: "甘肃省",
  定西市: "甘肃省",
  陇南市: "甘肃省",
  临夏回族自治州: "甘肃省",
  甘南藏族自治州: "甘肃省",
  福州市: "福建省",
  厦门市: "福建省",
  莆田市: "福建省",
  三明市: "福建省",
  泉州市: "福建省",
  漳州市: "福建省",
  南平市: "福建省",
  龙岩市: "福建省",
  宁德市: "福建省",
  拉萨市: "西藏自治区",
  日喀则市: "西藏自治区",
  昌都市: "西藏自治区",
  林芝市: "西藏自治区",
  山南市: "西藏自治区",
  那曲地区: "西藏自治区",
  阿里地区: "西藏自治区",
  贵阳市: "贵州省",
  六盘水市: "贵州省",
  遵义市: "贵州省",
  安顺市: "贵州省",
  毕节市: "贵州省",
  铜仁市: "贵州省",
  黔西南布依族苗族自治州: "贵州省",
  黔东南苗族侗族自治州: "贵州省",
  黔南布依族苗族自治州: "贵州省",
  沈阳市: "辽宁省",
  大连市: "辽宁省",
  鞍山市: "辽宁省",
  抚顺市: "辽宁省",
  本溪市: "辽宁省",
  丹东市: "辽宁省",
  锦州市: "辽宁省",
  营口市: "辽宁省",
  阜新市: "辽宁省",
  辽阳市: "辽宁省",
  盘锦市: "辽宁省",
  铁岭市: "辽宁省",
  朝阳市: "辽宁省",
  葫芦岛市: "辽宁省",
  万州区: "重庆市",
  涪陵区: "重庆市",
  渝中区: "重庆市",
  大渡口区: "重庆市",
  江北区: "重庆市",
  沙坪坝区: "重庆市",
  九龙坡区: "重庆市",
  南岸区: "重庆市",
  北碚区: "重庆市",
  綦江区: "重庆市",
  大足区: "重庆市",
  渝北区: "重庆市",
  巴南区: "重庆市",
  黔江区: "重庆市",
  长寿区: "重庆市",
  江津区: "重庆市",
  合川区: "重庆市",
  永川区: "重庆市",
  南川区: "重庆市",
  璧山区: "重庆市",
  铜梁区: "重庆市",
  潼南区: "重庆市",
  荣昌区: "重庆市",
  开州区: "重庆市",
  梁平区: "重庆市",
  城口县: "重庆市",
  丰都县: "重庆市",
  垫江县: "重庆市",
  武隆区: "重庆市",
  忠县: "重庆市",
  云阳县: "重庆市",
  奉节县: "重庆市",
  巫山县: "重庆市",
  巫溪县: "重庆市",
  石柱土家族自治县: "重庆市",
  秀山土家族苗族自治县: "重庆市",
  酉阳土家族苗族自治县: "重庆市",
  彭水苗族土家族自治县: "重庆市",
  西安市: "陕西省",
  铜川市: "陕西省",
  宝鸡市: "陕西省",
  咸阳市: "陕西省",
  渭南市: "陕西省",
  延安市: "陕西省",
  汉中市: "陕西省",
  榆林市: "陕西省",
  安康市: "陕西省",
  商洛市: "陕西省",
  西宁市: "青海省",
  海东市: "青海省",
  海北藏族自治州: "青海省",
  黄南藏族自治州: "青海省",
  海南藏族自治州: "青海省",
  果洛藏族自治州: "青海省",
  玉树藏族自治州: "青海省",
  海西蒙古族藏族自治州: "青海省",
  中西区: "香港特别行政区",
  湾仔区: "香港特别行政区",
  东区: "香港特别行政区",
  南区: "香港特别行政区",
  油尖旺区: "香港特别行政区",
  深水埗区: "香港特别行政区",
  九龙城区: "香港特别行政区",
  黄大仙区: "香港特别行政区",
  观塘区: "香港特别行政区",
  荃湾区: "香港特别行政区",
  屯门区: "香港特别行政区",
  元朗区: "香港特别行政区",
  北区: "香港特别行政区",
  大埔区: "香港特别行政区",
  西贡区: "香港特别行政区",
  沙田区: "香港特别行政区",
  葵青区: "香港特别行政区",
  离岛区: "香港特别行政区",
  哈尔滨市: "黑龙江省",
  齐齐哈尔市: "黑龙江省",
  鸡西市: "黑龙江省",
  鹤岗市: "黑龙江省",
  双鸭山市: "黑龙江省",
  大庆市: "黑龙江省",
  伊春市: "黑龙江省",
  佳木斯市: "黑龙江省",
  七台河市: "黑龙江省",
  牡丹江市: "黑龙江省",
  黑河市: "黑龙江省",
  绥化市: "黑龙江省",
  大兴安岭地区: "黑龙江省",
};

export { City, Province };
