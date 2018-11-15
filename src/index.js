import { React } from "./library/myReact";

import "./styles.css";

const MyTitle = React.createClass({
  render() {
    return React.createElement("h1", null, this.props.message);
  }
});

// function MyMessage(){
//   render() {
//     if (this.props.asTitle) {
//       return React.createElement(MyTitle, {
//         message: this.props.message
//       });
//     } else {
//       return React.createElement("p", null, this.props.message);
//     }
//   }
// }

/// <div class="name">Test</div> -> React.createElement('div',{className : 'name'},Test) -> {
// {
// type : 'div',
// props : {
//  ....props,
// . childere
// }
// }
// }

const MyMessage = React.createClass({
  render() {
    if (this.props.asTitle) {
      return React.createElement(MyTitle, {
        message: this.props.message
      });
    } else {
      return React.createElement("p", null, this.props.message);
    }
  }
});

const rootElement = document.getElementById("root");

React.render(
  React.createElement(MyTitle, { asTitle: "Test", message: "test2" }),
  rootElement
);
