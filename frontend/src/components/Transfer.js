import React from "react";

export function Transfer({ transferData, storedValue }) {
  return (
    <div>
      <h4>The stored value is: {storedValue}</h4>
      <form
        onSubmit={(event) => {
          // This function just calls the transferTokens callback with the
          // form's data.
          event.preventDefault();

          const formData = new FormData(event.target);
          const data = formData.get("data");

          if (data) {
            transferData(data);
          }
        }}
      >
        <div className="form-group">
          <label>New value</label>
          <input className="form-control" type="number" name="data" required />
        </div>
        <div className="form-group">
          <input className="btn btn-primary" type="submit" value="Send Value" />
        </div>
      </form>
    </div>
  );
}
