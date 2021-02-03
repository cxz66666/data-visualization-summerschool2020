import React from "react";
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/line";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";
import "echarts/lib/component/title";
import ReactEcharts from "echarts-for-react";
import moment from "moment";

class LineChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            option: {}
        }
    }

    UNSAFE_componentWillReceiveProps(props) {
        let options = {
            title: {
                text: ''
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ["新增", "确诊", "治愈", "死亡"]
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: []
            },
            yAxis: {
                type: 'value'
            },
            series : [
                {
                    name: '新增',
                    type: 'line',
                    data: []
                },
                {
                    name: '确诊',
                    type: 'line',
                    data: []
                },
                {
                    name: '治愈',
                    type: 'line',
                    data: []
                },
                {
                    name: '死亡',
                    type: 'line',
                    data: []
                }
            ]
        };

        const { data, date, beginDate, chooseCountry, chooseProvince, chooseCity } = this.props;
        let curDate = moment(date, "YYYY-MM-DD").add(-6, "days");
        if(curDate.format("YYYY-MM-DD") < beginDate) {
            curDate = moment(beginDate, "YYYY-MM-DD");
        }

        while(!curDate.isAfter(date, "YYYY-MM-DD")) {
            let Date = curDate.format("YYYY-MM-DD");

            if(chooseCity) {
                let citys = data[Date][chooseProvince]["citys"];
                for(let i in citys) {
                    if (citys[i]["citysName"] === chooseCity) {
                        options.series[2].data.push(citys[i]["city_curedCount"]);
                        options.series[3].data.push(citys[i]["city_deadCount"]);
                        options.series[0].data.push(citys[i]["city_increase"]);
                        options.series[1].data.push(citys[i]["city_confirmedCount"]);
                    }
                }
            } else if(chooseProvince) {
                options.series[2].data.push(data[Date][chooseProvince]["province_curedCount"]);
                options.series[3].data.push(data[Date][chooseProvince]["province_deadCount"]);
                options.series[0].data.push(data[Date][chooseProvince]["province_increase"]);
                options.series[1].data.push(data[Date][chooseProvince]["province_confirmedCount"]);
            } else if(chooseCountry) {
                let cure = 0, dead = 0, increase = 0, confirm = 0;
                for(let i in data[Date]) {
                    cure += data[Date][i]["province_curedCount"];
                    dead += data[Date][i]["province_deadCount"];
                    increase += data[Date][i]["province_increase"];
                    confirm += data[Date][i]["province_confirmedCount"];
                }
                options.series[2].data.push(cure);
                options.series[3].data.push(dead);
                options.series[0].data.push(increase);
                options.series[1].data.push(confirm);
            }

            options.xAxis.data.push(Date);
            curDate.add(1, "days");
        }

        this.setState({ option: options });
    }

    render() {
        return (
            <div>
                <ReactEcharts option = {this.state.option} />
            </div>
        )
    }
}

export default LineChart;