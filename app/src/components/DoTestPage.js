import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import DoTest from "./DoTest";
import DoTestExcel from "./DoTestExcel";
import Select from "react-select";

function DoTestPage() {
  const [error, setError] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const [formData, setFormData] = useState([]);
  const [formName, setFormName] = useState("");
  const [pageName, setPageName] = useState("DoTest");

  //Get all tablenames
  useEffect(() => {
    fetch("http://localhost:5000/api/getForms", { method: "GET" })
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

  //Get columns from selected form
  async function handleSelectChange(selected) {
    setSelectedOption(selected);

    console.log("Updating");
    console.log(selectedOption);
    console.log(selected);
    const tempVariable = await getColumns(selected);
    // Sleep for 1 second to allow the data to be fetched
    console.log("Page updated");
    console.log(page);
    console.log(formData);
    console.log(formName);
    // Sleep for 1 second to allow the data to be fetched
    console.log(tempVariable);

    setFormData(tempVariable);
    setShow(false);
	setShowSwitch(true)
  }

  async function getColumns(selected) {
    const response = await fetch("http://localhost:5000/api/getColumns", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formId: selected.value,
      }),
    });
    const data = await response.json();
    const tempData = data.fields.map((field, index) => {
      return {
        name: field,
        value: false,
        dataType: data.types[index],
      };
    });
    setFormData(tempData);
    setFormName(selected.label);
    console.log("Getting columns");
    console.log(tempData);
    console.log(selected.label);
    setPage(<DoTest data={tempData} formName={selected.label} />);
    return "Done";
  }

  const [show, setShow] = useState(true);
  const [showSwitch, setShowSwitch] = useState(false);

  function handlePage(){
	if (pageName==="DoTest"){
	  console.log("Switching to Excel")
	  console.log(formData)
	  console.log(formName)
	  setPage(<DoTestExcel data={formData} formName={formName}/>)
	  setPageName("DoTestExcel")
	}
	else {
	  console.log("Switching to Do Test")
	  console.log(formData)
	  console.log(formName)
	  getColumns(selectedOption)
	  setPage(<DoTest data={formData} formName={formName}/>)
	  setPageName("DoTest")
	}
  }
  

  const [page, setPage] = useState(
    <DoTest data={formData} formName={formName} />
  );

  //<DoTest data={formData} formName={formName} />
  //<DoTestExcel data={formData} formName={formName}/>

  return (
    <div className="DoTestBody">
      <Header/>
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
      {formData.length > 0 ? <div>{page}</div> : <p></p>}
      {showSwitch ? <button onClick={handlePage}>Switch</button>: null} 
      <Footer/>
    </div>
  );
}

export default DoTestPage;
