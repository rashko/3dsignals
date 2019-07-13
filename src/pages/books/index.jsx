import * as React from "react";
import { connect } from "react-redux";
import List from "./list";
import AddBookForm from "./addBookForm";
import EditBookForm from "./editBookForm";
import { Route, Link } from "react-router-dom";
class Books extends React.Component {
  render() {
    const { books, match } = this.props;
    return (
      <div className={'page'}>
        <List items={books} match={match} />
        <Route path={`${match.path}create`} component={AddBookForm} />
        <Route
          path={`${match.path}edit/:id`}
          render={props => (
            <EditBookForm key={props.match.params.id} {...props} />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { books: state.books };
};

export default connect(mapStateToProps)(Books);
