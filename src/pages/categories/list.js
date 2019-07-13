import * as React from "react";
import { connect } from "react-redux";
import { removeCategory } from "../../redux/actions/categories";
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
              const info = (<div className={'info'}>{item.name}</div>)
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
