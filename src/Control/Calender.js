import { Calendar, Select, Radio, Col, Row, Typography } from "antd";
import moment from "moment";
import React from "react";
export default class Cal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onSelect = (value) => {
    console.log(value.format("YYYY-MM-DD"));
    this.props.changeDate(value.format("YYYY-MM-DD"));
  };

  render() {
    const beginDate = {
      China: "2020-01-25",
      USA: "2020-03-16",
    };

    const endDate = {
      China: "2020-07-08",
      USA: "2020-07-10",
    };
    const country = this.props.chooseCountry;
    return (
      <div className="site-calendar-customize-header-wrapper">
        <Calendar
          validRange={[moment(beginDate[country]), moment(endDate[country])]}
          value={moment(this.props.date)}
          fullscreen={false}
          onSelect={this.onSelect}
        />
      </div>
    );
  }
}
