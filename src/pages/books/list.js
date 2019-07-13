import * as React from "react";
import { connect } from "react-redux";
import { removeBook } from "../../redux/actions/books";
import { Link } from "react-router-dom";
class List extends React.Component {
  render() {
    const { items, match } = this.props;
    return (
      <div className={"list"}>
        <Link className={"btn"} to={`${match.path}create/`}>
          Add new
        </Link>
        <ul>
          {items &&
            items.list.map(item => {
              const remove = (
                <button className={'btn'} onClick={() => this.handleRemove(item)}>remove</button>
              );
              const edit = (
                <Link className={'btn'} to={`${match.path}edit/${item.id}`}>edit</Link>
              );
              const info = (
                <div className={'info'}>
                  {item.name}
                </div>
              )
              return (
                <li key={item.id}>
                  {info} {remove} {edit}
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
