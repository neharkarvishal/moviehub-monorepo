import React from "react";

function Form(props) {
  const { placeholder, onChange } = props;
  return (
    <div>
      <form>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder={placeholder}
            onChange={onChange}
          />
        </div>
      </form>
    </div>
  );
}

export default Form;
