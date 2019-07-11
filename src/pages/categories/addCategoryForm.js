import * as React from "react";
import uuid from "uuid";
import { connect } from "react-redux";
import { addCategory } from "../../redux/actions/categories";
class AddCategoryForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      category: ""
    };
  }
  render() {
    const { category } = this.state;
    return (
      <form autoComplete="off" onSubmit={this.handleSubmit}>
        <input name="category" onChange={this.handleChange} value={category} />
        <button>Add</button>
      </form>
    );
  }

  handleChange(e) {
    this.setState({ category: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { category } = this.state;
    if (category !== "") {
      this.props.addCategory({ name: category, id: uuid.v4() });
      this.setState({ category: "" });
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addCategory: category => dispatch(addCategory(category))
  };
}

export default connect(
  null,
  mapDispatchToProps
)(AddCategoryForm);
