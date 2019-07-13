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
    const { id } = this.props.match.params;
    const categories = this.props.categories;
    const category = categories.list.find(category => category.id === id);
    if (category) {
      this.setState(category);
    }
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
          <button className={'btn'}>Update</button>
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

const mapStateToProps = state => {
  return { categories: state.categories };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCategoryForm);
