import React from "react";
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/pie";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import ReactEcharts from "echarts-for-react";

class PieChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            option: {}
        }
    }

    UNSAFE_componentWillReceiveProps(props) {
        const { data, date, chooseCountry, chooseProvince, chooseCity } = this.props;
        let cure = 0, dead = 0, patient = 0, increase = 0;

        if(chooseCity) {
            let citys = data[date][chooseProvince]["citys"];
            for(let i in citys) {
                if (citys[i]["citysName"] === chooseCity) {
                    cure = citys[i]["city_curedCount"];
                    dead = citys[i]["city_deadCount"];
                    increase = citys[i]["city_increase"];
                    patient = citys[i]["city_confirmedCount"];
                }
            }
        } else if (chooseProvince) {
                cure = data[date][chooseProvince]["province_curedCount"];
                dead = data[date][chooseProvince]["province_deadCount"];
                increase = data[date][chooseProvince]["province_increase"];
                patient = data[date][chooseProvince]["province_confirmedCount"];
        } else if (chooseCountry) {
            for(let i in data[date]) {
                cure += data[date][i]["province_curedCount"];
                dead += data[date][i]["province_deadCount"];
                increase += data[date][i]["province_increase"];
                patient += data[date][i]["province_confirmedCount"];
            }
        }

        patient = patient - cure - dead - increase;

        let options = {
            title: {
                text: '累计确诊分析',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            series : [
                {
                    name: '累计确诊分析',
                    type: 'pie',
                    radius: '55%',
                    data:[
                        {value:cure, name:'已治愈'},
                        {value:patient, name:'救治中'},
                        {value:dead, name:'死亡'},
                        {value:increase, name:'新增'}
                    ]
                }
            ]
        };
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

export default PieChart;