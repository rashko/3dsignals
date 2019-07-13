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
      name: ""
    };
  }
  render() {
    const { name } = this.state;
    return (
      <div className={"form"}>
        <form autoComplete="off" onSubmit={this.handleSubmit}>
          <div className={"row"}>
          <label>name:</label>
            <input name="name" onChange={this.handleChange} value={name} />
          </div>
          <button className={'btn'}>Add</button>
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
    if (name !== "") {
      this.props.addCategory({ name, id: uuid.v4() });
      this.setState({ name: "" });
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
