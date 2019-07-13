import * as React from "react";
import { connect } from "react-redux";
import { removeBook } from "../../redux/actions/books";
import { Link } from "react-router-dom";
class List extends React.Component {
  render() {
    const { items, match } = this.props;
    const details = (
      <Link className={"btn"} to={`${match.path}create/`}>
        Add new
      </Link>
    );
    return (
      <div className={"list"}>
        <div className={"title"}>
          <h3>books list</h3>
          <div className={"actions"}>{details}</div>
        </div>
        <ul>
          {items &&
            items.list.map(item => {
              const details = (
                <Link className={"btn"} to={`${match.path}details/${item.id}`}>
                  details
                </Link>
              );
              const info = <div className={"info"}>{item.name}</div>;
              return (
                <li key={item.id}>
                  {info} {details}
                </li>
              );
            })}
        </ul>
      </div>
    );
  }

  handleRemove(book) {
    this.props.removeBook(book);
  }
}

function mapDispatchToProps(dispatch) {
  return {
    removeBook: book => dispatch(removeBook(book))
  };
}

export default connect(
  null,
  mapDispatchToProps
)(List);
