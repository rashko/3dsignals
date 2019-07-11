import * as React from "react";
import { connect } from "react-redux";
import { editBook } from "../../redux/actions/books";
class EditBookForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      name: "",
      author: "",
      category: "",
      price: "",
      id: ""
    };
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    const books = this.props.books;
    const book = books.list.find(book => book.id === id);
    if (book) {
      this.setState(book);
    }
  }
  render() {
    const { name, author, category, price } = this.state;
    const { categories } = this.props;
    return (
      <form autoComplete="off" onSubmit={this.handleSubmit}>
        <div className={"row"}>
          <label>name:</label>
          <input name="name" onChange={this.handleChange} value={name} />
        </div>
        <div className={"row"}>
          <label>author:</label>
          <input name="author" onChange={this.handleChange} value={author} />
        </div>
        <div className={"row"}>
          <label>category:</label>
          <select name="category" value={category} onChange={this.handleChange}>
            <option>-- select category --</option>
            {categories.list.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div className={"row"}>
          <label>price:</label>
          <input name="price" onChange={this.handleChange} value={price} />
        </div>
        <button>Update</button>
      </form>
    );
  }

  handleChange(e) {
    const { name } = e.target;
    this.setState({ [name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { name, id } = this.state;
    const { history } = this.props;
    this.props.editBook({ name, id });
    history.push("/books/");
  }
}

function mapDispatchToProps(dispatch) {
  return {
    editBook: book => dispatch(editBook(book))
  };
}

const mapStateToProps = state => {
  return { books: state.books, categories: state.categories };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditBookForm);
