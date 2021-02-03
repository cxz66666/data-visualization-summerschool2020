import React from "react";
import {
  Tag,
  Row,
  Col,
  Divider,
  Layout,
  Breadcrumb,
  DatePicker,
  Radio,
  Input,
  message,
  Calendar,
} from "antd";
import "antd/dist/antd.css";
import Cal from "./Calender";
import { City, Province } from "./tool";
import "../App.css";
import moment from "moment";
export default class Control extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  grade = (number) => {
    if (number === 0) return 1;
    if (number <= 10) return 2;
    if (number <= 100) return 3;
    if (number <= 1000) return 4;
    if (number <= 10000) return 5;
    return 6;
  };

  search = (e) => {
    if (e === this.props.chooseCity || e === this.props.chooseProvince) return;
    if (City[e]) {
      this.props.changeChooseProvince(City[e]);
      this.props.changeChooseCity(e);
      return;
    }
    for (let x in Province) {
      if (Province[x] === e) {
        this.props.changeChooseProvince(e);
        this.props.changeChooseCity("");
        return;
      }
    }
    message.error("输入有误，请检查输入");
  };
  searchkeyBoard = (e) => {
    this.search(e.target.value);
  };
  render() {
    const { Search } = Input;
    const SVGA = (
      <svg
        t="1594798198516"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        p-id="10275"
        width="90"
        height="90"
      >
        <defs>
          <style type="text/css"></style>
        </defs>
        <path
          d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z"
          fill="#3DB1A6"
          p-id="10276"
        ></path>
        <path
          d="M356.598995 682.838191c-5.660302 13.378894-11.320603 23.155779-15.437186 29.330653-4.631156 6.174874-14.922613 8.747739-30.874372 8.233166-15.951759-0.514573-27.786935-6.174874-34.990955-15.951759-7.20402-10.291457-10.80603-19.553769-10.291457-28.301507 0.514573-8.747739 2.058291-16.466332 5.145729-24.184925L406.512563 300.510553c11.320603-29.330653 19.039196-49.398995 23.670352-59.17588s12.864322-20.582915 24.699497-31.903517c12.349749-11.320603 29.330653-17.495477 50.942714-19.039196 21.61206-1.543719 39.622111 3.087437 54.03015 12.864321 11.320603 8.233166 22.126633 22.641206 31.903518 43.224121 9.776884 20.582915 18.01005 39.622111 25.21407 57.632161l130.701508 343.2201c3.087437 9.262312 4.631156 18.524623 5.145729 28.816081 0 10.291457-4.116583 19.553769-12.349749 28.301507-8.233166 8.747739-19.553769 13.893467-33.447236 14.922613-13.893467 1.029146-24.184925-1.029146-30.874372-7.20402-6.174874-5.660302-11.835176-14.922613-15.951759-26.757789l-50.942714-136.361809c-7.20402 12.864322-14.922613 24.184925-23.670351 32.932664-8.233166 8.747739-21.097487 14.40804-38.078392 15.437185-11.835176 1.029146-25.21407-1.029146-38.592965-7.20402l-28.816081-13.893467c-12.864322-5.660302-24.699497-8.233166-36.0201-9.262312-11.320603-0.514573-19.553769 0.514573-25.21407 2.572865l-15.951759 5.660301-46.311558 107.545729z m165.692462-380.78392l-3.60201-12.349748c-2.572864-5.145729-5.145729-7.718593-7.20402-7.718593-2.058291 0-4.116583 2.572864-6.174874 6.689447l-3.60201 11.835176-94.166834 241.334673c12.349749-11.320603 23.670352-20.068342 33.447236-26.243216 9.776884-6.174874 20.582915-9.262312 32.41809-10.291457 9.262312 0 19.553769 1.543719 30.874372 5.660301l27.272362 11.320603c8.747739 3.087437 18.01005 5.145729 28.81608 5.660302 13.378894 1.029146 23.155779 0 28.816081-2.572865l13.893467-5.660301-80.78794-217.664322z"
          fill="#FFFFFF"
          p-id="10277"
        ></path>
      </svg>
    );
    const SVGB = (
      <svg
        t="1594798573411"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        p-id="17430"
        width="90"
        height="90"
      >
        <defs>
          <style type="text/css"></style>
        </defs>
        <path
          d="M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512-230.4-512-512-512z m0 950.857143c-241.371429 0-438.857143-197.485714-438.857143-438.857143s197.485714-438.857143 438.857143-438.857143 438.857143 197.485714 438.857143 438.857143-197.485714 438.857143-438.857143 438.857143z"
          fill="#FFAE46"
          p-id="17431"
        ></path>
        <path
          d="M405.942857 689.810286V300.397714h114.468572c34.157714 0 61.44 8.118857 81.92 24.502857 20.48 16.310857 30.72 38.034286 30.72 64.950858 0 21.504-6.070857 40.448-18.285715 56.832a97.792 97.792 0 0 1-50.102857 34.962285v1.024c26.477714 2.998857 47.616 13.019429 63.488 29.988572 15.798857 17.042286 23.771429 38.619429 23.771429 64.804571 0 33.499429-12.068571 60.635429-36.132572 81.334857-24.064 20.699429-54.857143 31.012571-92.379428 31.012572H406.016z m50.322286-345.453715v121.929143h45.787428c24.283429 0 43.373714-5.851429 57.197715-17.700571 13.824-11.776 20.699429-28.16 20.699428-49.152 0-36.717714-24.429714-55.076571-73.362285-55.076572h-50.322286z m0 165.741715V645.851429h60.342857c26.331429 0 46.665143-6.070857 61.001143-18.285715 14.336-12.141714 21.504-28.964571 21.504-50.614857 0-44.617143-30.281143-66.852571-90.770286-66.852571h-52.077714z"
          fill="#FFAE46"
          p-id="17432"
        ></path>
      </svg>
    );
    const SVGC = (
      <svg
        t="1594798781697"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        p-id="23739"
        width="90"
        height="90"
      >
        <defs>
          <style type="text/css"></style>
        </defs>
        <path
          d="M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512-230.4-512-512-512z m0 950.857143c-241.371429 0-438.857143-197.485714-438.857143-438.857143s197.485714-438.857143 438.857143-438.857143 438.857143 197.485714 438.857143 438.857143-197.485714 438.857143-438.857143 438.857143z"
          fill="#4697FF"
          p-id="23740"
        ></path>
        <path
          d="M637.366857 673.718857c-28.598857 15.140571-64.585143 22.674286-107.812571 22.674286-55.808 0-100.425143-17.773714-133.778286-53.174857-33.353143-35.474286-50.029714-82.358857-50.029714-140.726857 0-62.683429 18.797714-113.078857 56.32-151.332572 37.522286-38.180571 85.211429-57.344 143.067428-57.344 37.229714 0 67.949714 5.266286 92.233143 15.872v52.516572a186.148571 186.148571 0 0 0-91.721143-23.113143c-43.446857 0-78.774857 14.482286-106.130285 43.373714-27.282286 28.891429-40.96 67.949714-40.96 117.028571 0 46.592 12.726857 83.602286 38.180571 111.030858 25.526857 27.428571 58.88 41.106286 100.059429 41.106285 38.546286 0 72.118857-8.777143 100.571428-26.185143v48.274286z"
          fill="#4697FF"
          p-id="23741"
        ></path>
      </svg>
    );
    const SVGD = (
      <svg
        t="1594798971926"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        p-id="27084"
        width="90"
        height="90"
      >
        <defs>
          <style type="text/css"></style>
        </defs>
        <path
          d="M957.53 335.48a484.48 484.48 0 1 0 38 188 481.35 481.35 0 0 0-38-188zM696 727.52a268.85 268.85 0 0 1-85.79 62.74 252.35 252.35 0 0 1-106 23.23H504L393.24 813c-31.3-0.07-56.74-26.69-56.74-59.41V292.41c0-32.76 25.5-59.41 56.86-59.41h0.16l110.7 0.5a252.35 252.35 0 0 1 105.93 23.23A268.85 268.85 0 0 1 696 319.48c50.33 54.64 78 127.1 78 204s-27.72 149.4-78 204.04z"
          fill="#333333"
          p-id="27085"
        ></path>
        <path
          d="M504.13 303.5H504l-97.47-0.44v440l97.71 0.44c110.17 0 199.79-98.72 199.79-220s-89.69-220-199.9-220z"
          fill="#333333"
          p-id="27086"
        ></path>
      </svg>
    );
    const props = this.props;
    const { data, date, chooseCountry, chooseProvince, chooseCity } = props;
    const chooseGrade = chooseCity
      ? "city"
      : chooseProvince
      ? "province"
      : "country";

    var briefComment;
    var svg;
    if (chooseGrade === "country") {
      let increaseNum = 0;

      for (let i in data[date]) {
        increaseNum += data[date][i]["province_increase"];
      }
      let g = this.grade(increaseNum) - 2;
      svg = g <= 1 ? SVGA : g <= 2 ? SVGB : g <= 3 ? SVGC : SVGD;
      briefComment =
        g <= 1
          ? "Great! today only have " + increaseNum + " increase people"
          : g <= 2
          ? "Well. today have " + increaseNum + " increase people"
          : g <= 3
          ? "Not so good! today have " + increaseNum + " people increase"
          : "damn it! today increased " + increaseNum + " people";
    }
    if (chooseGrade === "province") {
      let increaseNum = data[date][chooseProvince]["province_increase"];
      let g = this.grade(increaseNum) - 1;
      svg = g <= 1 ? SVGA : g <= 2 ? SVGB : g <= 3 ? SVGC : SVGD;
      briefComment =
        g <= 1
          ? "Great today only have " + increaseNum + " increase people"
          : g <= 2
          ? "Well today have " + increaseNum + " increase people"
          : g <= 3
          ? "Not so good today have " + increaseNum + " people"
          : "damn it today increased " + increaseNum + " people";
    }
    if (chooseGrade === "city") {
      var increaseNum;
      if (chooseCountry === "China") {
        let citys = data[date][chooseProvince]["citys"];

        for (let city in citys) {
          if (citys[city]["citysName"] === chooseCity)
            increaseNum = citys[city]["city_increase"];
        }
        let g = this.grade(increaseNum);
        svg = g <= 1 ? SVGA : g <= 2 ? SVGB : g <= 3 ? SVGC : SVGD;
        briefComment =
          g <= 1
            ? "Great today only have " + increaseNum + " increase people"
            : g <= 2
            ? "Well today have " + increaseNum + " increase people"
            : g <= 3
            ? "Not so good today have " + increaseNum + " people"
            : "dame it today increased " + increaseNum + " people";
      } else {
        svg = SVGA;
        briefComment = "Dame it! we don't have enough data";
      }
    }

    const NowPositon = (
      <Breadcrumb style={{ color: "rgba(0, 0, 0, 0.85)", fontsize: 16 }}>
        <Breadcrumb.Item>{this.props.chooseCountry}</Breadcrumb.Item>
        <Breadcrumb.Item>{this.props.chooseProvince}</Breadcrumb.Item>
        <Breadcrumb.Item>{this.props.chooseCity}</Breadcrumb.Item>
      </Breadcrumb>
    );
    return (
      <Layout>
        <div>
          Grades:&nbsp;&nbsp;
          {
            <Tag color="#3DB1A6" style={{ width: 40, textAlign: "center" }}>
              <b>A</b>
            </Tag>
          }
          {
            <Tag color="#FFAE46" style={{ width: 40, textAlign: "center" }}>
              <b>B</b>
            </Tag>
          }
          {
            <Tag color="#4697FF" style={{ width: 40, textAlign: "center" }}>
              <b>C</b>
            </Tag>
          }
          {
            <Tag color="#333333" style={{ width: 40, textAlign: "center" }}>
              <b>D</b>
            </Tag>
          }
        </div>
        <Layout>
          <div style={{ marginTop: 10 }}>{NowPositon}</div>
          <Row>
            <Col span={7} style={{ marginTop: 10, textAlign: "center" }}>
              {svg}
            </Col>
            <Col span={1}></Col>
            <Col span={10}>
              <p className="site-description-item-profile-p">{briefComment}</p>
              <p className="site-description-item-profile-p"></p>
            </Col>
          </Row>
        </Layout>

        <Cal
          date={this.props.date}
          chooseCountry={this.props.chooseCountry}
          changeDate={this.props.changeDate}
        ></Cal>
        <Row style={{ marginTop: 30, textAlign: "center" }}>
          <Col span={4}>染色方法</Col>
          <Col span={15}>
            <Radio.Group
              defaultValue="确诊"
              buttonStyle="solid"
              onChange={this.props.changedyeingMethod}
            >
              <p>染色方法</p>
              <Radio.Button value="现存">现存</Radio.Button>
              <Radio.Button value="确诊">确诊</Radio.Button>
              <Radio.Button value="治愈">治愈</Radio.Button>
              <Radio.Button value="死亡">死亡</Radio.Button>
            </Radio.Group>
          </Col>
        </Row>
        <Search
          style={{ marginTop: 30 }}
          placeholder="input search city"
          enterButton="Search"
          size="large"
          disabled={this.props.chooseCountry === "China" ? false : true}
          onSearch={this.search}
          onPressEnter={this.searchkeyBoard}
        />
      </Layout>
    );
  }
}
