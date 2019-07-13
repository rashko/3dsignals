import * as React from "react";
import { NavLink } from "react-router-dom";

export default class Footer extends React.Component {
  render() {
    return (
      <div className={"footer"}>
        <NavLink className={'btn info'} to={"/books/"}>books</NavLink>
        <NavLink className={'btn info'} to={"/categories/"}>categories</NavLink>
      </div>
    );
  }
}
