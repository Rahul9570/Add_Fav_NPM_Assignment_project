import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./ScrollList.css";
import { Link } from "react-router-dom";

function AddNpm() {
  const [NPMpackage, setPackage] = useState([]);
  const [data, setData] = useState({ packages: "", feedback: "" }); // usestate to add the values
  const [item, setItem] = useState(DataFromLS()); // To get the data from localstorage
  const [search, setSearch] = useState(""); // state to search the Item

  useEffect(() => {
    fetchPackages();
  }, []);

  /**
   * Function to Get the values initial from localstorage
   */
  function DataFromLS() {
    let d = localStorage.getItem("DETAILS");
    if (d) {
      return JSON.parse(d);
    } else {
      return [];
    }
  }
//for fetching data from api used axios
  const fetchPackages = () => {
    axios.get("https://api.npms.io/v2/search?q=reactjs").then((response) => {
      setPackage(response.data.results);
    });
  };

  /** Function to submit the values after the submit button */

  function Display() {
    /** Object to store the values  */
    const data_obj = {
      id: new Date().getTime().toString(),
      ...data,
    };
    setItem([...item, data_obj]);
    window.location = "/operation";
  }

  useEffect(() => {
    localStorage.setItem("DETAILS", JSON.stringify(item));
  }, [item]);

  return (
    <div>
      <Link to="/">
        <button>HOME</button>
      </Link>
      <Link to="/operation">
        <button>Display Data</button>
      </Link>
      <p>JSON Api data</p>

      <div className="scroll">
        <h3>Select to add</h3>

        {/* Search bar to search the required package */}
        <input
          type="text"
          placeholder="Search the package"
          onChange={(e) => setSearch(e.target.value)}
        />
        <br />
        {/* Filter initialy based on the search */}
        {NPMpackage.filter((value) => {
          if (search === "") {
            return value;
          } else if (
            value.package.name.toLowerCase().includes(search.toLowerCase())
          ) {
            return value;
          }
        }).map((value) => {
          return (
            <>
              <div key={value.id}>
                <input
                  key={value.id}
                  type="radio"
                  name="packages"
                  onChange={
                    (e) =>
                      setData({ ...data, [e.target.name]: value.package.name }) // Method to get and store the value as (key , value)
                  }
                />
                {value.package.name}
                <br></br>
              </div>
            </>
          );
        })}
      </div>
      <div>
        <div>
          <label htmlFor="feedback">Why this is your fav?</label>
        </div>
        <textarea
          name="feedback"
          value={data.feedback}
          onChange={
            (e) => setData({ ...data, [e.target.name]: e.target.value }) // Method to get and store the value as (key , value)
          }
        ></textarea>
      </div>

      {/* Button to submit the data and Triggers the Display function */}
      <button onClick={Display}>Submit</button>
    </div>
  );
}
export default AddNpm;
