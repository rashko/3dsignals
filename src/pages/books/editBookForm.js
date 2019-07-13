import * as React from "react";
import { connect } from "react-redux";
import { editBook } from "../../redux/actions/books";
import BookForm from "./bookForm";
class EditBookForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.state = {
      name: "",
      author: "",
      category: "",
      price: "",
      id: "",
      errors: {}
    };
  }
  componentDidMount() {
    this.setState(this.props.book);
  }
  render() {
    const { name, author, category, price, errors } = this.state;
    const { categories } = this.props;
    const originalName = this.props.book.name;
    const save = (
      <button onClick={this.handleSubmit} className={"btn"}>
        Update
      </button>
    );

    const categoryFormProps = {
      handleSubmit: this.handleSubmit,
      handleChange: this.handleChange,
      errors,
      name,
      author,
      category,
      price,
      categories
    };
    return (
      <div className={"form"}>
        <div className={"title"}>
          <h3>book update: {originalName}</h3>
          <div className={"actions"}>{save}</div>
        </div>
        <BookForm {...categoryFormProps} />
      </div>
    );
  }

  handleChange(e) {
    const { name } = e.target;
    this.setState({ [name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { history } = this.props;
    const { id, name, author, category, price } = this.state;
    if (this.handleValidation()) {
      this.props.editBook({ id, name, author, category, price });
      history.push("/books/");
    }
  }

  handleValidation() {
    const { name, author, category, price } = this.state;
    const { categories } = this.props;
    const errors = {};
    let isValid = true;

    if (name === "") {
      isValid = false;
      errors["name"] = "name can't be empty";
    }
    if (author === "") {
      isValid = false;
      errors["author"] = "author can't be empty";
    }
    if (category === "" || !categories.list.find(c => c.id === category)) {
      isValid = false;
      errors["category"] = "category can't be empty";
    }
    if (price === "") {
      isValid = false;
      errors["price"] = "price can't be empty";
    }
    if (isNaN(price)) {
      isValid = false;
      errors["price"] = "price must be number";
    }
    if (price < 0) {
      isValid = false;
      errors["price"] = "price must be positive number";
    }

    this.setState({ errors: errors });
    return isValid;
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
