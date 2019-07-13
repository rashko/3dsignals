import * as React from "react";
import { connect } from "react-redux";
import List from "./list";
import AddBookForm from "./addBookForm";
import EditBookForm from "./editBookForm";
import BookDetails from "./bookDetails";
import { Route } from "react-router-dom";
class Books extends React.Component {
  render() {
    const { books, match } = this.props;
    return (
      <div className={"page"}>
        <List items={books} match={match} />
        <Route path={`${match.path}create`} component={AddBookForm} />
        <Route
          path={`${match.path}edit/:id`}
          render={props => (
            <EditBookForm key={props.match.params.id} {...props} />
          )}
        />
        <Route path={`${match.path}details/:id`} component={BookDetails} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { books: state.books };
};

export default connect(mapStateToProps)(Books);
