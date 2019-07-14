import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

class List extends React.Component {
  constructor(props) {
    super(props);
    this.handleSort = this.handleSort.bind(this);
    this.state = {
      items: props.items.list,
      orderAsc: true
    };
  }

  componentDidMount() {
    this.handleSort();
  }

  componentDidUpdate(prevProps) {
    const { items } = this.props;
    if (prevProps.items.list !== items.list) {
      this.setState({ items: items.list });
    }
  }

  render() {
    const { match } = this.props;
    const { items, orderAsc } = this.state;
    const add = (
      <Link className={"btn"} to={`${match.path}create/`}>
        Add new
      </Link>
    );
    const sortIcon = (
      <FontAwesomeIcon icon={orderAsc ? faArrowUp : faArrowDown} />
    );
    const sortAlpha = (
      <button className={"btn"} onClick={this.handleSort}>
        sort {sortIcon}{" "}
      </button>
    );
    return (
      <div className={"list"}>
        <div className={"title"}>
          <h3>category list</h3>
          <div className={"actions"}>
            {add} {sortAlpha}
          </div>
        </div>
        {items.length === 0 && <div className={'no-items'}>No categories yet.<br /> maybe you want to add a few?</div>}
        {items && items.length > 0 && (
          <ul className={"regular-list"}>
            {items.map(item => {
              const details = (
                <Link className={"btn"} to={`${match.path}details/${item.id}`}>
                  details
                </Link>
              );
              const name = <div className={"info"}>{item.name}</div>;
              return (
                <li key={item.id}>
                  {name} {details}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }

  handleSort() {
    const { items, orderAsc } = this.state;

    let sorting = (a, b) => {
      if (orderAsc) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      } else {
        if (a.name > b.name) {
          return -1;
        }
        if (a.name < b.name) {
          return 1;
        }
        return 0;
      }
    };

    const orderedItems = [...items].sort(sorting);
    this.setState({ items: orderedItems, orderAsc: !orderAsc });
  }
}

export default connect(
  null,
  null
)(List);
