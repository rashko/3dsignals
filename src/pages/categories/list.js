import * as React from "react";
import { connect } from "react-redux";
import { removeCategory } from "../../redux/actions/categories";

class List extends React.Component {
    constructor(props){
        super(props);

    }
  render() {
    const { items } = this.props;
    return (
      items &&
      items.list.map((category, index) => {
          const remove = <span onClick={() => this.handleRemove(category)}>remove</span>
        return <li key={index}>{category.name} {remove}</li>;
      })
    );
  }

  handleRemove(category){
      this.props.rrremoveCategory(category);
  }
}

function mapDispatchToProps(dispatch) {
    return {
        rrremoveCategory: category => dispatch(removeCategory(category))
    };
  }
  
  export default connect(
    null,
    mapDispatchToProps
  )(List);
  
