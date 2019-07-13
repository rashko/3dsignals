import * as React from "react";
import { connect } from "react-redux";
import { editCategory } from "../../redux/actions/categories";
class EditCategoryForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      name: "",
      id: ""
    };
  }
  componentDidMount() {
    this.setState(this.props.category);
  }
  render() {
    const { name } = this.state;
    const originalName = this.props.category.name;
    const save = <button onClick={this.handleSubmit}  className={"btn"}>Update</button>;
    return (
      <div className={"form"}>
        <div className={"title"}>
          <h3>category update: {originalName}</h3>
          <div className={"actions"}>{save}</div>
        </div>
        <form autoComplete="off" onSubmit={this.handleSubmit}>
          <div className={"row"}>
            <label>name:</label>
            <input name="name" onChange={this.handleChange} value={name} />
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
    const { name, id } = this.state;
    const { history } = this.props;
    this.props.editCategory({ name, id });
    history.push("/categories/");
  }
}

function mapDispatchToProps(dispatch) {
  return {
    editCategory: category => dispatch(editCategory(category))
  };
}

const mapStateToProps = (state, props) => {
  const { id } = props.match.params;
  return {
    category: state.categories.list.find(category => category.id === id)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCategoryForm);
