import React from "react";

function Form(props) {
  return (
    <form>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder={props.placeholder}
          onChange={props.search}
        />
      </div>
    </form>
  );
}

export default Form;
