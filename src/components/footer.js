import * as React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faList } from "@fortawesome/free-solid-svg-icons";
export default class Footer extends React.Component {
  render() {
    return (
      <footer>
        <NavLink className={"btn info"} to={"/books/"}>
          <FontAwesomeIcon icon={faBookOpen} /> books
        </NavLink>
        <NavLink className={"btn info"} to={"/categories/"}>
          <FontAwesomeIcon icon={faList} /> categories
        </NavLink>
      </footer>
    );
  }
}
