import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { removeCategory } from "../../redux/actions/categories";
class CategoryDetails extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemove = this.handleRemove.bind(this);
  }
  render() {
    const { category, match } = this.props;
    const remove = (
      <button className={"btn danger"} onClick={this.handleRemove}>
        remove
      </button>
    );
    const edit = (
      <Link className={"btn"} to={`/categories/edit/${category.id}`}>
        edit
      </Link>
    );
    return (
      <div className={"form"}>
        <div className={'title'}>
            <h3>category details: {category.name}</h3>
            <div className={"actions"}>{remove} {edit}</div>
        </div>
        
        <div className={"row"}>
          <label>name:</label>
          {category.name}
        </div>
      </div>
    );
  }

  handleRemove() {
    const { removeCategory, history } = this.props;
    removeCategory(this.props.category);
    history.push("/categories/");
  }
}

const mapStateToProps = (state, props) => {
  const { id } = props.match.params;
  return {
    category: state.categories.list.find(category => category.id === id)
  };
};

function mapDispatchToProps(dispatch) {
  return {
    removeCategory: category => dispatch(removeCategory(category))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryDetails);
