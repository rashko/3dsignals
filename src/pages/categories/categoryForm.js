import * as React from 'react';

export default class CategoryForm extends React.Component {
    render(){
        const {handleSubmit, handleChange, errors, name} = this.props;

        return (<form autoComplete="off" onSubmit={handleSubmit}>
        <div className={"row"}>
          <label>name:</label>
          <div className={"field"}>
            <input name="name" onChange={handleChange} value={name} />
            <span className={'validationError'}>{errors["name"]}</span>
          </div>
        </div>
      </form>)
    }
}