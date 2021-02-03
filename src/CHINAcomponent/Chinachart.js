import React from "react";
import * as d3 from "d3";
import {
  China,
  colorConfig,
  colorMap,
  colorMapNew,
  active,
  dead,
  recovered,
  confirm,
} from "./tool";
export default class Dcharts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillReceiveProps(props) {
    if (props.mapData === [] || !props.data) return;

    // console.log(props.chooseProvince, props.mapData);
    const Data = props.data;
    var province_TotalData = [0, 0, 0, 0, 0];
    for (let i in Data) {
      let province = Data[i];
      province_TotalData[0] +=
        province["province_confirmedCount"] -
        province["province_curedCount"] -
        province["province_deadCount"];
      province_TotalData[1] += province["province_curedCount"];
      province_TotalData[2] += province["province_deadCount"];
      province_TotalData[3] += province["province_confirmedCount"];
      province_TotalData[4] += province["province_increase"];
    }
    // var ans = {};
    // props.mapData.features.map((item) => {
    //   ans[item.properties.name] = item.properties.center;
    // });
    // console.log(ans);
    const padding = 50;
    const svg = d3.select("#svg");
    svg.selectAll("*").remove();
    const width = svg.node().parentNode.clientWidth;
    const height = svg.node().parentNode.clientHeight;
    const w = d3.scaleLinear().domain([0, 485]).range([0, width]);
    const tooltip = d3
      .select("#tooltips")
      .style("opacity", "0")
      .style("background-color", "#f50")
      .style("color", "white")
      .style("border-width", w(1.5) + "px")
      .style("border-radius", w(5) + "px")
      .style("padding", w(5) + "px")
      .style("position", "absolute")
      .style("text-align", "center")
      .style("width", w(100) + "px")
      .style("font-size", w(9) + "px");
    // console.log(width);
    // console.log(height);

    const Number1_scaleLinear = d3
      .scaleLinear()
      .domain([0, 10])
      .range([0, 0.2]);
    const Number2_scaleLinear = d3
      .scaleLinear()
      .domain([10, 100])
      .range([0.2, 0.4]);
    const Number3_scaleLinear = d3
      .scaleLinear()
      .domain([100, 1000])
      .range([0.4, 0.6]);
    const Number4_scaleLinear = d3
      .scaleLinear()
      .domain([1000, 10000])
      .range([0.6, 0.8]);
    const Number5_scaleLinear = d3
      .scaleLinear()
      .domain([10000, 300000])
      .range([0.8, 1]);
    const config =
      props.dyeingMethod === "现存"
        ? active
        : props.dyeingMethod === "死亡"
        ? dead
        : props.dyeingMethod === "确诊"
        ? confirm
        : recovered;

    const computerColor = d3.piecewise(d3.interpolateRgb, config);
    // console.log(computerColor(0), computerColor(1));
    svg
      .attr("height", height)
      .attr("width", width)
      .style("background-color", "f3f3f3");
    svg.call(
      d3
        .zoom()
        .extent([
          [0, 0],
          [width, height],
        ])
        .scaleExtent([0.5, 8])
        .on("zoom", zoomed)
    ); //缩放

    const projection = d3
      .geoMercator()
      .center([105.55, 36.32])
      .scale((600 * width) / 760)
      .translate([width / 2, height / 2]);
    const path = d3.geoPath().projection(projection);

    const g = svg.append("g");

    var svgGroup = g
      .selectAll("path")
      .data(props.mapData.features)
      .enter()
      .append("g")
      .attr("id", function (d, index) {
        return index;
      });

    var svgProvince = svgGroup
      .append("path")
      .attr("d", path)
      .attr("fill", function (d, i) {
        if (d.properties.name === props.chooseProvince) return "#70d6ff";
        return chooseColor(d, i);
      })
      .attr("opacity", 1)
      .attr("stroke-width", 1)
      .on("click", (d, i) => {
        if (d.properties.name !== props.chooseProvince) {
          props.changeChooseProvince(d.properties.name);

          d3.select("#svg_province").selectAll("*").remove();
        }
      })
      .on("mouseenter", function (d) {
        tooltip.style("opacity", "1");
        d3.select(this)
          .style("stroke", "#ffadad")
          .style("opacity", 1)
          .attr("fill", "#70d6ff");
      })
      .on("mousemove", function (d) {
        if (d.properties.name !== "") {
          let province = Data[d.properties.name];
          let province_current_confirmed =
            province["province_confirmedCount"] -
            province["province_curedCount"] -
            province["province_deadCount"];

          tooltip
            .html(
              "名称: " +
                d.properties.name +
                "<br>" +
                "<b style=font-size:16px>现存确诊: " +
                province_current_confirmed +
                "</b><br>" +
                "新增确诊: " +
                province["province_increase"] +
                "<br>" +
                "累计确诊: " +
                province["province_confirmedCount"] +
                "<br>" +
                "累计死亡 " +
                province["province_deadCount"] +
                "<br>" +
                "累计治愈: " +
                province["province_curedCount"]
            )
            .style("left", d3.mouse(this)[0] + 50 + "px")
            .style("top", d3.mouse(this)[1] + 40 + "px");
        }
      })
      .on("mouseleave", function (d) {
        tooltip.style("opacity", "0");
        d3.select(this)
          .style("stroke", "none")
          .style("opacity", 1)
          .attr("fill", (d, i) => {
            if (d.properties.name === props.chooseProvince) return "#70d6ff";
            return chooseColor(d, i);
          });
      }); //tooltip
    var svgCircle = svgGroup
      .append("circle")
      .attr("r", 1)
      .attr("stroke", "red")
      .attr("stroke-width", "0.75")
      .attr("fill", "none")
      .attr("transform", (d) => {
        if (
          d.properties.name !== "香港特别行政区" &&
          d.properties.name !== "澳门特别行政区" &&
          d.properties.name !== ""
        ) {
          let coor = projection([
            d.properties.center[0],
            d.properties.center[1],
          ]);

          return "translate(" + coor[0] + "," + coor[1] + ")";
        }
      });

    var svgText = g
      .selectAll("text")
      .data(props.mapData.features)
      .enter()
      .append("text")
      .text((d) => {
        if (d.properties.name !== "") return China[d.properties.name];
      })
      .style("font-weight", "bold")
      .attr("x", function (d) {
        if (d.properties.name !== "") {
          let coor = projection([
            d.properties.centroid[0],
            d.properties.centroid[1],
          ]);
          if (d.properties.name === "澳门特别行政区") return coor[0] - 10;
          if (d.properties.name === "广东省") return coor[0] + 5;
          if (d.properties.name === "宁夏回族自治区") return coor[0] - 15;
          else return coor[0] - 10;
        }
      })
      .attr("y", function (d) {
        if (d.properties.name !== "") {
          let coor = projection([
            d.properties.centroid[0],
            d.properties.centroid[1],
          ]);
          if (d.properties.name === "天津市") return coor[1] + 6;
          if (d.properties.name === "澳门特别行政区") return coor[1] + 10;
          if (d.properties.name === "山西省") return coor[1] - 16;
          else return coor[1];
        }
      })
      .attr("font-size", "10px")
      .attr("font-family", "SimSun")
      .attr("fill", "#8a817c")
      .style("opacity", 1)
      .attr("cursor", "default");

    const lengend = svg.append("g");
    lengend
      .append("text")
      .text("数据截止日期" + props.date + " 24:00")
      .attr("transform", `translate(80,${height - 40})`)
      .attr("font-size", "17px")
      .attr("font-weight", "bold")
      .attr("fill", "#ffbf69");
    const lengends = lengend
      .selectAll("g")
      .data(config)
      .enter()
      .append("g")
      .attr("transform", (d, i) => {
        return `translate(30,${height - (i + 3) * 20})`;
      });
    lengends
      .append("rect")
      .attr("width", 16)
      .attr("height", 16)
      .attr("fill", (d) => {
        return d;
      })
      .attr("transform", `translate${(0, -13)}`);
    lengends
      .append("text")
      .text((d) => {
        return colorMapNew[d];
      })
      .style("font-size", "10px")
      .style("color", "red")
      .attr("transform", `translate(20,13)`);
    const foot = lengend
      .append("g")
      .attr("transform", `translate(50,${height - 40})`)
      .append("text")
      .text("")
      .attr("height", 16)
      .attr("width", 30)
      .attr("font-size", "15px")
      .attr("font-family", "SimSun")
      .attr("fill", "#8a817c")
      .style("opacity", 1)
      .attr("cursor", "default");
    var title = d3
      .select("#title")

      .style("border-width", w(1) + "px")
      .style("border-radius", w(3) + "px")
      .style("padding", w(3) + "px")
      .style("position", "absolute")
      .style("text-align", "left")
      .style("width", w(200) + "px");

    title
      .html(
        "<div style=font-size:18px;color:#de7a7e><b>全国现存<b>" +
          province_TotalData[0] +
          "</b>例</b></div>" +
          "<div style=font-size:14px;color:#3e4a6d>" +
          "新增: " +
          "<b style=color:#de7a7e;font-size:20px>" +
          province_TotalData[4] +
          "</b>" +
          "例</div>" +
          "<div style=font-size:14px;color:#3e4a6d>" +
          "治愈: " +
          "<b style=color:#de7a7e;font-size:20px>" +
          province_TotalData[1] +
          "</b>" +
          "例</div>" +
          "<div style=font-size:14px;color:#3e4a6d>" +
          "死亡: " +
          "<b style=color:#de7a7e;font-size:20px>" +
          province_TotalData[2] +
          "</b>" +
          "例</div>" +
          "<div style=font-size:14px;color:#3e4a6d>" +
          "累计确诊:" +
          "<b style=color:#de7a7e;font-size:20px>" +
          province_TotalData[3] +
          "</b>" +
          "例</div>"
      )
      .style("top", "10px")
      .style("left", "20px");

    // var svgMap = svg
    //   .selectAll("path")
    //   .data(props.data.features)
    //   .enter()
    //   .append("path")
    //   .attr("d", path)
    //   .attr("fill", function (d, i) {
    //     return d3.interpolateRainbow(i / 360);
    //   })

    //   .attr("stroke-width", 1)
    //   .on("click", (d, i) => {
    //     console.log(d);
    //     console.log(i);
    //   })
    //   .append("circle")
    //   .attr("r", 4);

    // var provincial = svg
    //   .selectAll("location")
    //   .data(props.data.features)
    //   .enter()
    //   .append("circle")
    //   .attr("r", 4);
    //   .attr("class", "location")
    //   .attr("transform", (d) => {
    //     const coor = d3
    //       .geoMercator()
    //       .center([d.properties.center[0], d.properties.center[1]])
    //       .scale(500)
    //       .translate([width / 2, height / 2]);
    //     console.log(coor);
    //     return "translate(" + coor[0] + "," + coor[1] + ")";
    //   })
    //   .append("circle")
    //   .attr("r", 4)
    //   .attr("fill", "#e91e63")
    //   .attr("class", "location");
    function zoomed() {
      g.attr("transform", d3.event.transform);
    }
    function chooseColor(d, i) {
      if (d.properties.name !== "") {
        let province = Data[d.properties.name];
        // console.log(province);
        let dyeingMethod = props.dyeingMethod;
        let province_current_confirmed =
          dyeingMethod === "现存"
            ? province["province_confirmedCount"] -
              province["province_curedCount"] -
              province["province_deadCount"]
            : dyeingMethod === "治愈"
            ? province["province_curedCount"]
            : dyeingMethod === "死亡"
            ? province["province_deadCount"]
            : province["province_confirmedCount"];
        // console.log(d.properties.name, province_current_confirmed);
        if (province_current_confirmed <= 10)
          return computerColor(Number1_scaleLinear(province_current_confirmed));
        if (province_current_confirmed <= 100)
          return computerColor(Number2_scaleLinear(province_current_confirmed));
        if (province_current_confirmed <= 1000) {
          return computerColor(Number3_scaleLinear(province_current_confirmed));
        }

        if (province_current_confirmed <= 10000)
          return computerColor(Number4_scaleLinear(province_current_confirmed));

        return computerColor(Number5_scaleLinear(province_current_confirmed));
      }
    }
  }
  render() {
    return (
      <div
        style={{
          height: document.body.clientHeight * 0.7,
        }}
      >
        <svg id="svg" />
        <div id="tooltips"></div>
        <div id="title"></div>
      </div>
    );
  }
}
