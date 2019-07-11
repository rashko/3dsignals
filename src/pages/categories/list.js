import * as React from "react";
import { connect } from "react-redux";
import { removeCategory } from "../../redux/actions/categories";
import { Link } from "react-router-dom";
class List extends React.Component {
    constructor(props){
        super(props);

    }
  render() {
    const { items, match } = this.props;
    return (
      items &&
      items.list.map(category => {
          const remove = <span onClick={() => this.handleRemove(category)}>remove</span>
          const edit = <Link to={`${match.path}edit/${category.id}`}>edit</Link>
        return <li key={category.id}>{category.name} {remove} {edit}</li>;
      })
    );
  }

  handleRemove(category){
      this.props.removeCategory(category);
  }
}

function mapDispatchToProps(dispatch) {
    return {
        removeCategory: category => dispatch(removeCategory(category))
    };
  }
  
  export default connect(
    null,
    mapDispatchToProps
  )(List);
  
