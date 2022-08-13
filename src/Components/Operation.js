import React, { useState } from "react";
import { Link } from "react-router-dom";

function Operation() {
  // Getting Data fom the localstorage
  const d = JSON.parse(localStorage.getItem("DETAILS")) || [];

  //Using usestate we are storing the localstorage value initial on the data
  const [data, setData] = useState(d);

  /**
   * Function to delte the data from the list based on ID's
   */

  function DeleteItem(id) {
    let x = data.filter((val) => {
      return val.id != id;
    });
    setData(x);
  }

  // Updating the localstorage after the item deleted
  localStorage.setItem("DETAILS", JSON.stringify(data));

  return (
    <>
      <Link to="/">
        <button>HOME</button>
      </Link>
      <Link to="/AddNpm">
        <button>Add </button>
      </Link>

      <div>
        <table>
          {/* Displaying the Data in table format */}
          {d.map((item) => {
            return (
              <>
                <tr key={item.id}>
                  <td>{item.packages}</td>
                  <td>{item.feedback}</td>
                  <td>
                    <button onClick={() => DeleteItem(item.id)}>Delete</button>
                  </td>
                </tr>
              </>
            );
          })}
        </table>
      </div>
    </>
  );
}

export default Operation;
