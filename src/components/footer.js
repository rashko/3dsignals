import * as React from "react";
import { NavLink } from "react-router-dom";

export default class Footer extends React.Component {
  render() {
    return (
      <div className={"footer"}>
        <NavLink className={'btn gray'} to={"/books/"}>books</NavLink>
        <NavLink className={'btn gray'} to={"/categories/"}>categories</NavLink>
      </div>
    );
  }
}
