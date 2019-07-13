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
      name: "",
      errors: {}
    };
  }
  render() {
    const { name } = this.state;
    const save = (
      <button onClick={this.handleSubmit} className={"btn"}>
        Create
      </button>
    );
    return (
      <div className={"form"}>
        <div className={"title"}>
          <h3>category create</h3>
          <div className={"actions"}>{save}</div>
        </div>
        <form autoComplete="off" onSubmit={this.handleSubmit}>
          <div className={"row"}>
            <label>name:</label>
            <input name="name" onChange={this.handleChange} value={name} />
            <span className={"validationError"}>
              {this.state.errors["name"]}
            </span>
          </div>
        </form>
      </div>
    );
  }

  handleChange(e) {
    this.setState({ name: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { name } = this.state;
    if (this.handleValidation()) {
      this.props.addCategory({ name, id: uuid.v4() });
      this.setState({ name: "" });
    }
  }

  handleValidation() {
    const { name } = this.state;
    const errors = {};
    let isValid = true;

    if (name === "") {
      isValid = false;
      errors["name"] = "name can't be empty";
    }

    this.setState({ errors: errors });
    return isValid;
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
