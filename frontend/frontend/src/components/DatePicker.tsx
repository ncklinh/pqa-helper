import { Component } from "react";
import { DateRangePicker } from "react-date-range";

export class MyComponent extends Component {
  handleSelect(ranges: any) {
    console.log(ranges);
    // {
    //   selection: {
    //     startDate: [native Date Object],
    //     endDate: [native Date Object],
    //   }
    // }
  }
  render() {
    const selectionRange = {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    };
    return (
      <DateRangePicker ranges={[selectionRange]} onChange={this.handleSelect} />
    );
  }
}
