import * as React from "react";
import { connect } from "react-redux";
import List from "./list";
import AddCategoryForm from "./addCategoryForm";

class Categories extends React.Component {
  render() {
    const { categories } = this.props;
    return (
      <div>
        <ul>
          <List items={categories} />
        </ul>
        <AddCategoryForm />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { categories: state.categories };
};

export default connect(mapStateToProps)(Categories);
