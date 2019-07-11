import * as React from "react";
import { connect } from "react-redux";
import List from "./list";
import AddCategoryForm from "./addCategoryForm";
import EditCategoryForm from "./editCategoryForm";
import { Route, Link } from "react-router-dom";
class Categories extends React.Component {
  render() {
    const { categories, match } = this.props;
    return (
      <div>
        <ul>
          <List items={categories} match={match} />
        </ul>
        <Link to={`${match.path}create/`}>Add</Link>
        <Route path={`${match.path}create`} component={AddCategoryForm} />
        <Route path={`${match.path}edit/:id`} render={(props) => <EditCategoryForm key={props.match.params.id} {...props} />}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { categories: state.categories };
};

export default connect(mapStateToProps)(Categories);
