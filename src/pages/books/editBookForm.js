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
    this.setState(this.props.book);
  }
  render() {
    const { name, author, category, price } = this.state;
    const { categories } = this.props;
    const originalName = this.props.book.name;
    const save = (
      <button onClick={this.handleSubmit} className={"btn"}>
        Update
      </button>
    );
    return (
      <div className={"form"}>
        <div className={"title"}>
          <h3>book update: {originalName}</h3>
          <div className={"actions"}>{save}</div>
        </div>
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
            <select
              name="category"
              value={category}
              onChange={this.handleChange}
            >
              <option>-- select category --</option>
              {categories.list.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className={"row"}>
            <label>price:</label>
            <input name="price" onChange={this.handleChange} value={price} />
          </div>
        </form>
      </div>
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

const mapStateToProps = (state, props) => {
  const { id } = props.match.params;
  return {
    categories: state.categories,
    book: state.books.list.find(book => book.id === id)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditBookForm);
