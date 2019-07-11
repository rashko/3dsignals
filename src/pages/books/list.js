import * as React from "react";
import { connect } from "react-redux";
import { removeBook } from "../../redux/actions/books";
import { Link } from "react-router-dom";
class List extends React.Component {
  render() {
    const { items, match } = this.props;
    return (
      items &&
      items.list.map(item => {
        const remove = (
          <span onClick={() => this.handleRemove(item)}>remove</span>
        );
        const edit = <Link to={`${match.path}edit/${item.id}`}>edit</Link>;
        return (
          <li key={item.id}>
            {item.name} {remove} {edit}
          </li>
        );
      })
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
