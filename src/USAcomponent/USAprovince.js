import React from "react";
import * as d3 from "d3";
import { getShortName } from "./tools";
import { Empty } from "antd";
import {
  colorMapNew,
  active,
  dead,
  recovered,
  confirm,
} from "../CHINAcomponent/tool";
export default class Pcharts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  UNSAFE_componentWillReceiveProps(props) {
    if (props.chooseProvince === "" || props.mapProvinceData.length === 0)
      return;
    // console.log(props.mapProvinceData);
    const Data = props.data;
    d3.select("#svg_provinceUSA").selectAll("*").remove();
    var city_TotalData = [0, 0, 0, 0, 0];
    let city = Data[props.chooseProvince];
    city_TotalData[0] +=
      city["province_confirmedCount"] -
      city["province_curedCount"] -
      city["province_deadCount"];
    city_TotalData[1] += city["province_curedCount"];
    city_TotalData[2] += city["province_deadCount"];
    city_TotalData[3] += city["province_confirmedCount"];
    city_TotalData[4] += city["province_increase"];

    const svg = d3.select("#svg_provinceUSA");

    const width = svg.node().parentNode.clientWidth;
    const height = svg.node().parentNode.clientHeight;
    const w = d3.scaleLinear().domain([0, 485]).range([0, width]);
    const tooltip = d3
      .select("#tooltips_cityUSA")
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
    svg
      .attr("height", height)
      .attr("width", width)
      .style("background-color", "f3f3f3");
    // const centerConfig = centerMap[China[props.chooseProvince]];
    // console.log(centerConfig);
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

    const g = svg.append("g");
    const projection = d3
      .geoMercator()
      .center(props.mapProvinceData["center"])
      .scale((3000 * width) / 760)
      .translate([width / 2, height / 2]);
    const path = d3.geoPath().projection(projection);
    var svgGroup = g
      .selectAll("path")
      .data(props.mapProvinceData.features)
      .enter()
      .append("g")
      .attr("id", function (d, index) {
        return index;
      });

    var svgCity = svgGroup
      .append("path")
      .attr("d", path)
      .attr("fill", function (d, i) {
        if (d.properties.name === props.chooseCity) return "#70d6ff";
        return chooseColor(d, i);
      })
      .attr("opacity", 0.8)
      .attr("stroke-width", 0.4)
      .attr("stroke", "#f4a261")
      .on("click", (d, i) => {
        props.changeChooseCity(d.properties.name);
      })
      .on("mouseenter", function (d) {
        tooltip.style("opacity", "1");
        d3.select(this)
          .style("stroke", "#ffadad")
          .style("opacity", 1)
          .attr("fill", "#70d6ff");
      })
      .on("mousemove", function (d) {
        tooltip
          .html("<b>数据见左上角</b>")
          .style("left", d3.mouse(this)[0] + 50 + "px")
          .style("top", d3.mouse(this)[1] + 40 + "px");
      })
      .on("mouseleave", function (d) {
        tooltip.style("opacity", "0");
        d3.select(this)
          .style("stroke", "#f4a261")
          .style("opacity", 0.8)
          .attr("fill", (d, i) => {
            if (d.properties.name === props.chooseCity) return "#70d6ff";
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
        if (d.properties.name !== "") {
          let coor = projection([
            d.properties.center[0],
            d.properties.center[1],
          ]);

          return "translate(" + coor[0] + "," + coor[1] + ")";
        }
      });
    var svgText = g
      .selectAll("text")
      .data(props.mapProvinceData.features)
      .enter()
      .append("text")
      .text((d) => {
        if (d.properties.name !== "") return d.properties.name;
      })
      .attr("x", function (d) {
        if (d.properties.center) {
          let coor = projection([
            d.properties.center[0],
            d.properties.center[1],
          ]);

          return coor[0] - 15;
        }
      })
      .attr("y", function (d) {
        if (d.properties.center) {
          let coor = projection([
            d.properties.center[0],
            d.properties.center[1],
          ]);

          return coor[1];
        }
      })
      .attr("font-size", "10px")
      .attr("fill", "#c0fdfb")
      .style("opacity", 1)
      .attr("cursor", "default");

    var title = d3
      .select("#title_cityUSA")

      .style("border-width", w(1) + "px")
      .style("border-radius", w(3) + "px")
      .style("padding", w(5) + "px")
      .style("position", "absolute")
      .style("text-align", "left")
      .style("width", w(200) + "px");

    title
      .html(
        "<div style=font-size:18px;color:#de7a7e><b>" +
          props.chooseProvince +
          "现存" +
          city_TotalData[0] +
          "例</b></div>" +
          "<div style=font-size:14px;color:#3e4a6d>" +
          "新增: " +
          "<b style=color:#de7a7e;font-size:20px>" +
          city_TotalData[4] +
          "</b>" +
          "例</div>" +
          "<div style=font-size:14px;color:#3e4a6d>" +
          "治愈: " +
          "<b style=color:#de7a7e;font-size:20px>" +
          city_TotalData[1] +
          "</b>" +
          "例</div>" +
          "<div style=font-size:14px;color:#3e4a6d>" +
          "死亡: " +
          "<b style=color:#de7a7e;font-size:20px>" +
          city_TotalData[2] +
          "</b>" +
          "例</div>" +
          "<div style=font-size:14px;color:#3e4a6d>" +
          "累计确诊:" +
          "<b style=color:#de7a7e;font-size:20px>" +
          city_TotalData[3] +
          "</b>" +
          "例</div>"
      )
      .style("top", "10px")
      .style("left", "20px");

    const lengend = svg.append("g");

    const lengends = lengend
      .selectAll("g")
      .data(config)
      .enter()
      .append("g")
      .attr("transform", (d, i) => {
        return `translate(0,${height - (i + 3) * 20})`;
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

    function zoomed() {
      g.attr("transform", d3.event.transform);
    }
    function chooseColor(d, i) {
      if (d.properties.name !== "") {
        let province = props.chooseProvince;
        province = Data[province];

        let dyeingMethod = props.dyeingMethod;
        let city_current_confirmed =
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
        if (city_current_confirmed <= 10)
          return computerColor(Number1_scaleLinear(city_current_confirmed));
        if (city_current_confirmed <= 100)
          return computerColor(Number2_scaleLinear(city_current_confirmed));
        if (city_current_confirmed <= 1000) {
          return computerColor(Number3_scaleLinear(city_current_confirmed));
        }

        if (city_current_confirmed <= 10000)
          return computerColor(Number4_scaleLinear(city_current_confirmed));

        return computerColor(Number5_scaleLinear(city_current_confirmed));
      }
    }
  }
  render() {
    const svg = <div></div>;
    return (
      <div
        style={{
          height: document.body.clientHeight * 0.7,
        }}
      >
        <svg id="svg_provinceUSA"></svg>
        <div id="tooltips_cityUSA"></div>
        <div id="title_cityUSA"></div>
      </div>
    );
  }
}
