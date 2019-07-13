import * as React from "react";
import uuid from "uuid";
import { connect } from "react-redux";
import { addBook } from "../../redux/actions/books";
class AddBookForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      name: "",
      author: "",
      category: "",
      price: ""
    };
  }

  render() {
    const { name, author, category, price } = this.state;
    const { categories } = this.props;
    const save = (
      <button onClick={this.handleSubmit} className={"btn"}>
        Create
      </button>
    );
    return (
      <div className={"form"}>
        <div className={"title"}>
          <h3>book create</h3>
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
    const { name, author, category, price } = this.state;
    if (name !== "" && author !== "" && category !== "" && price > 0) {
      this.props.addBook({ name, author, category, price, id: uuid.v4() });
      this.setState({ name: "", author: "", category: "", price: 0 });
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addBook: book => dispatch(addBook(book))
  };
}

const mapStateToProps = state => {
  return { categories: state.categories };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddBookForm);
