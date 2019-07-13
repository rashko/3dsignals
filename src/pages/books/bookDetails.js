import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { removeBook } from "../../redux/actions/books";
class BookDetails extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemove = this.handleRemove.bind(this);
    this.resolveCategory = this.resolveCategory.bind(this);
  }
  render() {
    const { book } = this.props;
    const remove = (
      <button className={"btn danger"} onClick={this.handleRemove}>
        remove
      </button>
    );
    const edit = (
      <Link className={"btn"} to={`/books/edit/${book.id}`}>
        edit
      </Link>
    );
    return (
      <div className={"form"}>
        <div className={"title"}>
          <h3>book details: {book.name}</h3>
          <div className={"actions"}>
            {remove} {edit}
          </div>
        </div>

        <div className={"row"}>
          <label>name:</label>
          {book.name}
        </div>
        <div className={"row"}>
          <label>author:</label>
          {book.author}
        </div>
        <div className={"row"}>
          <label>category:</label>
          {this.resolveCategory(book.category)}
        </div>
        <div className={"row"}>
          <label>price:</label>
          {book.price}
        </div>
      </div>
    );
  }

  handleRemove() {
    const { removeBook, history } = this.props;
    removeBook(this.props.book);
    history.push("/books/");
  }

  resolveCategory(id){
    const {categories} = this.props;
    const category = categories.list.find(category => category.id === id);
    return category ? category.name : 'undefined';
  }
}

const mapStateToProps = (state, props) => {
  const { id } = props.match.params;
  return {
    categories: state.categories,
    book: state.books.list.find(book => book.id === id)
  };
};

function mapDispatchToProps(dispatch) {
  return {
    removeBook: book => dispatch(removeBook(book))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookDetails);
