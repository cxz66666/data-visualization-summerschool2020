import React from "react";
import "../node_modules/antd/dist/antd.css";
import "./App.css";
import * as d3 from "d3";
import "whatwg-fetch";
import Dchart1 from "./CHINAcomponent/Chinachart";
import Pchart1 from "./CHINAcomponent/Provincechart";
import { getShortName } from "./USAcomponent/tools";
import USAchart from "./USAcomponent/USAchart.js";
import USApchart from "./USAcomponent/USAprovince";
import Control from "./Control/Control";
import PieChart from "./echart/PieChart";
import LineChart from "./echart/LineChart";
import {
  Alert,
  Button,
  Card,
  Layout,
  Drawer,
  Menu,
  Breadcrumb,
  Row,
  Col,
  Empty,
} from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const beginDate = {
  China: "2020-01-25",
  USA: "2020-03-16",
};

const endDate = {
  China: "2020-07-08",
  USA: "2020-07-10",
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ChinaMapData: [], //全国地图
      ChinaData: [], //总数据
      USAMapData: [],
      USAData: [],
      nowDate: "2020-02-01", //时间
      chooseCountry: "China", //选择的国家，China或USA
      chooseProvince: "", //选择的省
      chooseCity: "", //选择的市
      mapProvinceData: [], //选择省的地图
      collapsed: false, //左侧菜单是否折叠
      collapsedControl: false, //控制面板是否展示
      dyeingMethod: "确诊",
      errorVisible: false, //错误信息是否展示
    };
  }

  UNSAFE_componentWillMount() {
    d3.json("./china_GeoJson_useful/全国.json", {
      method: "GET",
    }).then((result) => {
      this.setState({ ChinaMapData: result });
    });
    d3.json("./China_all_data.json", {
      method: "GET",
    }).then((result) => {
      this.setState({ ChinaData: result });
    });
    d3.json("./usa_GeoJson_useful/USA_ALL.json", {
      method: "GET",
    }).then((result) => {
      this.setState({ USAMapData: result });
    });
    d3.json("./USA_all_data.json", {
      method: "GET",
    }).then((result) => {
      this.setState({ USAData: result });
    });
    if (this.state.chooseProvince === "") return;
    let inputFile =
      this.state.chooseCountry === "China"
        ? "./china_GeoJson_useful/" + this.state.chooseProvince + ".json"
        : "./usa_GeoJson_useful/" +
          getShortName(this.state.chooseProvince) +
          ".json";
    d3.json(inputFile, {
      method: "GET",
    }).then((result) => {
      this.setState({ mapProvinceData: result });
    });
  }

  changeChooseCountry = (country) => {
    this.setState({
      chooseCountry: country,
      chooseProvince: "",
      chooseCity: "",
    });
  };

  changeChooseProvince = (province) => {
    this.setState({
      chooseProvince: province,
      chooseCity: "",
    });
  };

  changeDate = (str) => {
    if (
      str >= beginDate[this.state.chooseCountry] &&
      str <= endDate[this.state.chooseCountry]
    ) {
      this.setState({ nowDate: str });
    } else {
      this.setState({ errorVisible: true });
    }
  };

  changeChooseCity = (city) => {
    this.setState({ chooseCity: city });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.chooseCountry !== this.state.chooseCountry) {
      this.setState({
        chooseProvince: "",
        chooseCity: "",
      });
    }

    if (
      prevState.chooseProvince !== this.state.chooseProvince &&
      this.state.chooseProvince !== ""
    ) {
      let inputFile =
        this.state.chooseCountry === "China"
          ? "./china_GeoJson_useful/" + this.state.chooseProvince + ".json"
          : "./usa_GeoJson_useful/" +
            getShortName(this.state.chooseProvince) +
            ".json";
      d3.json(inputFile, {
        method: "GET",
      }).then((result) => {
        this.setState({ mapProvinceData: result });
      });
    }
  }

  handleMenuClick = (e) => {
    if (
      this.state.nowDate >= beginDate[e.key] &&
      this.state.nowDate <= endDate[e.key]
    ) {
      this.changeChooseCountry(e.key);
    } else {
      this.setState({ errorVisible: true });
    }
  };

  toggle = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  toggleControl = () => {
    this.setState({ collapsedControl: !this.state.collapsedControl });
  };
  changedyeingMethod = (value) => {
    console.log(value.target.value);
    this.setState({ dyeingMethod: value.target.value });
  };
  render() {
    const { Header, Footer } = Layout;
    const empty = <Empty description="请选择地区"></Empty>;
    return (
      <Layout>
        <Header
          style={{
            marginLeft: -45,
            height: 40,
            textAlign: "center",
            lineHeight: 1.7,
          }}
        >
          <Button
            style={{ float: "left" }}
            type="primary"
            size="large"
            onClick={this.toggle}
            icon={this.state.collapsed ? <RightOutlined /> : <LeftOutlined />}
          ></Button>
          <h1
            style={{
              display: "inline",
              color: "#FFFFFF",
              fontSize: "150%",
            }}
          >
            COVID-19 Visualization
          </h1>
          <Button
            type="primary"
            style={{ float: "right" }}
            onClick={this.toggleControl}
            size="large"
          >
            控制台
          </Button>
        </Header>
        {this.state.errorVisible && (
          <Alert
            message="请将日期调整至可查询范围（中国1.25-7.8，美国3.16-7.10）"
            type="error"
            closable
            onClose={() => {
              this.setState({ errorVisible: false });
            }}
          />
        )}

        <Layout>
          <Drawer
            title="选择国家"
            placement="left"
            visible={!this.state.collapsed}
            onClose={this.toggle}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={["China"]}
              onClick={this.handleMenuClick}
            >
              <Menu.Item key="China">China</Menu.Item>
              <Menu.Item key="USA">USA</Menu.Item>
            </Menu>
          </Drawer>
        </Layout>

        <Layout>
          <Drawer
            title="控制面板"
            placement="right"
            visible={this.state.collapsedControl}
            onClose={this.toggleControl}
            width={480}
          >
            <Control
              data={
                this.state.chooseCountry === "China"
                  ? this.state.ChinaData
                  : this.state.USAData
              }
              date={this.state.nowDate}
              chooseCountry={this.state.chooseCountry}
              chooseProvince={this.state.chooseProvince}
              changeChooseProvince={this.changeChooseProvince}
              changeChooseCity={this.changeChooseCity}
              chooseCity={this.state.chooseCity}
              changeDate={this.changeDate}
              changedyeingMethod={this.changedyeingMethod}
            />
          </Drawer>
        </Layout>

        <Layout>
          <Breadcrumb style={{ fontSize: 17, marginLeft: 20, marginTop: 10 }}>
            <Breadcrumb.Item
              onClick={() => {
                this.setState({
                  chooseProvince: "",
                  chooseCity: "",
                });
              }}
            >
              {this.state.chooseCountry}
            </Breadcrumb.Item>
            <Breadcrumb.Item
              onClick={() => {
                this.setState({ chooseCity: "" });
              }}
            >
              {this.state.chooseProvince}
            </Breadcrumb.Item>
            <Breadcrumb.Item>{this.state.chooseCity}</Breadcrumb.Item>
          </Breadcrumb>

          <Row>
            <Col span={12}>
              {this.state.chooseCountry === "China" ? (
                <Dchart1
                  mapData={this.state.ChinaMapData} //全国地图geoJson
                  data={this.state.ChinaData[this.state.nowDate]} //当天数据就行
                  chooseCountry={this.state.chooseCountry}
                  chooseProvince={this.state.chooseProvince}
                  chooseCity={this.state.chooseCity}
                  changeChooseProvince={this.changeChooseProvince}
                  dyeingMethod={this.state.dyeingMethod}
                  date={this.state.nowDate}
                />
              ) : (
                <USAchart
                  mapData={this.state.USAMapData} //全国地图geoJson
                  data={this.state.USAData[this.state.nowDate]} //当天数据就行
                  chooseCountry={this.state.chooseCountry}
                  chooseProvince={this.state.chooseProvince}
                  chooseCity={this.state.chooseCity}
                  changeChooseProvince={this.changeChooseProvince}
                  dyeingMethod={this.state.dyeingMethod}
                  date={this.state.nowDate}
                />
              )}
            </Col>
            <Col span={12}>
              {this.state.chooseProvince !== "" ? (
                this.state.chooseCountry === "China" ? (
                  <Pchart1
                    data={this.state.ChinaData[this.state.nowDate]}
                    mapProvinceData={this.state.mapProvinceData}
                    chooseCountry={this.state.chooseCountry}
                    chooseProvince={this.state.chooseProvince}
                    chooseCity={this.state.chooseCity}
                    changeChooseCity={this.changeChooseCity}
                    dyeingMethod={this.state.dyeingMethod}
                  />
                ) : (
                  <USApchart
                    data={this.state.USAData[this.state.nowDate]}
                    mapProvinceData={this.state.mapProvinceData}
                    chooseCountry={this.state.chooseCountry}
                    chooseProvince={this.state.chooseProvince}
                    chooseCity={this.state.chooseCity}
                    changeChooseCity={this.changeChooseCity}
                    dyeingMethod={this.state.dyeingMethod}
                  />
                )
              ) : (
                empty
              )}
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Card>
                <LineChart
                  data={
                    this.state.chooseCountry === "China"
                      ? this.state.ChinaData
                      : this.state.USAData
                  }
                  date={this.state.nowDate}
                  beginDate={beginDate[this.state.chooseCountry]}
                  chooseCountry={this.state.chooseCountry}
                  chooseProvince={this.state.chooseProvince}
                  chooseCity={this.state.chooseCity}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card>
                <PieChart
                  data={
                    this.state.chooseCountry === "China"
                      ? this.state.ChinaData
                      : this.state.USAData
                  }
                  date={this.state.nowDate}
                  chooseCountry={this.state.chooseCountry}
                  chooseProvince={this.state.chooseProvince}
                  chooseCity={this.state.chooseCity}
                />
              </Card>
            </Col>
          </Row>
        </Layout>
        <Footer style={{ textAlign: "center" }}>
          Project of ZJU Vis Summer Course ©2020 Created by Raynor D10scxy Tony
          <Button
            type="primary"
            style={{ float: "right" }}
            onClick={this.toggleControl}
            size="large"
          >
            控制台
          </Button>
        </Footer>
      </Layout>
    );
  }
}

export default App;
