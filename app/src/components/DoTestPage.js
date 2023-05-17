import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import DoTest from "./DoTest";
import DoTestExcel from "./DoTestExcel";
import Select from "react-select";
import "./DoTestPage.css";
const API_PATH = process.env.REACT_APP_API_PATH; //Path to backend

function DoTestPage() {
  const [error, setError] = useState(null);
  const [options, setOptions] = useState([]); //Options for dropdown menu
  const [selectedOption, setSelectedOption] = useState(null); //Selected option from dropdown menu
  const [formData, setFormData] = useState([]); //Data from selected form
  const [formName, setFormName] = useState(""); //Name of selected form

  //Get all tablenames and save into Options
  useEffect(() => {
    fetch(API_PATH + "api/getForms", { method: "GET" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const formattedData = data.map((item) => {
          return {
            value: item.name,
            label: item.name.charAt(0).toUpperCase() + item.name.slice(1),
          };
        });
        setOptions(formattedData);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  //Handle selected form
  async function handleSelectChange(selected) {
    setSelectedOption(selected);
    await getColumns(selected);
    setShow(false); //Hide Dropdown menu
    setShowSwitch(true); //Show toggle button between manual and excel
  }

  //Get Data from table in database
  async function getColumns(selected) {
    const response = await fetch(API_PATH + "api/getColumns", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: selected.value,
      }),
    });
    const data = await response.json(); //Await to get data from database in right order
    //Create tempData with data from database
    const tempData = data.fields.map((field, index) => {
      return {
        name: field,
        value: false,
        dataType: data.types[index],
      };
    });
    setFormData(tempData);
    setFormName(selected.label);
    //setPage to manual input
    setPage(<DoTest data={tempData} formName={selected.label} />);

    setShowDoTest(true); //Show DoTest manual input
    return "Done";
  }

  //Variables for controlling whats visable on page
  const [show, setShow] = useState(true);
  const [showSwitch, setShowSwitch] = useState(false);
  const [showDoTest, setShowDoTest] = useState(false);
  const [showDoTestExcel, setShowDoTestExcel] = useState(false);

  //Handle switch between manual input and excel input
  function handleSwitch() {
    if (showDoTest === true) {
      setShowDoTest(false);
      setShowDoTestExcel(true);
    } else {
      setShowDoTest(true);
      setShowDoTestExcel(false);
    }
  }

  const [page, setPage] = useState(
    <DoTest data={formData} formName={formName} />
  );

  return (
    <div className="DoTestBody">
      <Header />
      <div>
        {show ? (
          <Select
            value={selectedOption}
            options={options}
            onChange={handleSelectChange}
          />
        ) : null}
        {show ? <p>Please select a form.</p> : null}
      </div>

      {formData.length > 0 && showDoTest ? <div>{page}</div> : <p></p>}
      {showDoTestExcel ? (
        <DoTestExcel data={formData} formName={formName} />
      ) : null}

      {showSwitch ? <button onClick={handleSwitch}>Switch</button> : null}
      <Footer />
    </div>
  );
}

export default DoTestPage;
