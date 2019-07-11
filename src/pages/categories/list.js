import * as React from "react";
import { connect } from "react-redux";
import { removeCategory } from "../../redux/actions/categories";
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

  handleRemove(category) {
    this.props.removeCategory(category);
  }
}

function mapDispatchToProps(dispatch) {
  return {
    removeCategory: category => dispatch(removeCategory(category))
  };
}

export default connect(
  null,
  mapDispatchToProps
)(List);
