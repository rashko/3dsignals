import * as React from "react";
import { connect } from "react-redux";
import { removeBook } from "../../redux/actions/books";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
class List extends React.Component {
  constructor(props) {
    super(props);
    this.handleSort = this.handleSort.bind(this);
    this.groupByCategory = this.groupByCategory.bind(this);
    this.toggleGroupByCategoryView = this.toggleGroupByCategoryView.bind(this);
    this.state = {
      items: props.items.list,
      itemsGrouped: {},
      orderAsc: true,
      groupedByCategory: false
    };
  }

  componentDidMount() {
    this.handleSort();
    this.groupByCategory();
  }

  componentDidUpdate(prevProps) {
    const { items } = this.props;
    if (prevProps.items.list !== items.list) {
      this.groupByCategory();
      this.setState({ items: items.list }, () => this.groupByCategory());
    }
  }
  render() {
    const { match } = this.props;
    const { items, itemsGrouped, orderAsc, groupedByCategory } = this.state;
    const add = (
      <Link className={"btn"} to={`${match.path}create/`}>
        Add new
      </Link>
    );
    const sortIcon = (
      <FontAwesomeIcon icon={orderAsc ? faArrowUp : faArrowDown} />
    );
    const sortAlpha = (
      <button className={"btn"} onClick={this.handleSort}>
        sort {sortIcon}
      </button>
    );

    const groupByCategory = () => {
      const className = classNames("btn", { active: groupedByCategory });
      return (
        <button className={className} onClick={this.toggleGroupByCategoryView}>
          group by category
        </button>
      );
    };

    return (
      <div className={"list"}>
        <div className={"title"}>
          <h3>books list</h3>
          <div className={"actions"}>
            {add} {sortAlpha} {groupByCategory()}
          </div>
        </div>
        {(items.length === 0 ||
          Object.keys(groupedByCategory).length === 0) && (
          <div className={"no-items"}>
            No books yet.
            <br /> maybe you want to add a few?
          </div>
        )}
        <ul className={"regular-list"}>
          {!groupedByCategory &&
            items &&
            items.map(item => {
              const details = (
                <Link className={"btn"} to={`${match.path}details/${item.id}`}>
                  details
                </Link>
              );
              const info = <div className={"info"}>{item.name}</div>;
              return (
                <li key={item.id}>
                  {info} {details}
                </li>
              );
            })}
        </ul>
        <ul>
          {groupedByCategory &&
            Object.keys(itemsGrouped).map((category, index) => {
              return (
                <li key={index}>
                  {category} ({itemsGrouped[category].length})
                  <ul className={"regular-list"}>
                    {itemsGrouped[category].map(item => {
                      const details = (
                        <Link
                          className={"btn"}
                          to={`${match.path}details/${item.id}`}
                        >
                          details
                        </Link>
                      );
                      const info = <div className={"info"}>{item.name}</div>;
                      return (
                        <li key={item.id}>
                          {info} {details}
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
  toggleGroupByCategoryView() {
    const { groupedByCategory } = this.state;
    this.setState({ groupedByCategory: !groupedByCategory });
  }
  groupByCategory() {
    const { items } = this.state;
    const { categories } = this.props;
    const itemsGrouped = {};
    categories.forEach(category => {
      const categoryList = items.filter(item => item.category === category.id);
      if (categoryList.length > 0) {
        itemsGrouped[category.name] = categoryList;
      }
    });
    this.setState({ itemsGrouped });
  }

  handleSort() {
    const { items, orderAsc } = this.state;

    let sorting = (a, b) => {
      if (orderAsc) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      } else {
        if (a.name > b.name) {
          return -1;
        }
        if (a.name < b.name) {
          return 1;
        }
        return 0;
      }
    };

    const orderedItems = [...items].sort(sorting);
    this.setState({ items: orderedItems, orderAsc: !orderAsc });
  }

  handleRemove(book) {
    this.props.removeBook(book);
  }
}

function mapDispatchToProps(dispatch) {
  return {
    removeBook: book => dispatch(removeBook(book))
  };
}

const mapStateToProps = state => {
  return { categories: state.categories.list };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
