import * as React from "react";

export default class BookForm extends React.Component {
  render() {
    const {
      handleSubmit,
      handleChange,
      errors,
      categories,
      name,
      author,
      category,
      price
    } = this.props;

    return (
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className={"row"}>
          <label>name:</label>
          <input name="name" onChange={handleChange} value={name} />
          <span className={"validationError"}>{errors["name"]}</span>
        </div>
        <div className={"row"}>
          <label>author:</label>
          <input name="author" onChange={handleChange} value={author} />
          <span className={"validationError"}>{errors["author"]}</span>
        </div>
        <div className={"row"}>
          <label>category:</label>
          <select name="category" value={category} onChange={handleChange}>
            <option>-- select category --</option>
            {categories.list.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <span className={"validationError"}>{errors["category"]}</span>
        </div>
        <div className={"row"}>
          <label>price:</label>
          <input name="price" onChange={handleChange} value={price} />
          <span className={"validationError"}>{errors["price"]}</span>
        </div>
      </form>
    );
  }
}
