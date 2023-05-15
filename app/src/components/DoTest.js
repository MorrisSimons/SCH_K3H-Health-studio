import { useState } from "react";
import "./DoTest.css";
const API_PATH = process.env.REACT_APP_API_PATH; //Path to backend

function DoTest(props) {
  const [formFields, setFormFields] = useState(props.data); //Containing the form fields

  const [inputFields, setInputFields] = useState([]); //Containing inputed data for each field

  function addFields() {
    if (inputFields.length !== formFields.length) {
      for (let i = 0; i < formFields.length; i++) {
        inputFields.push({ field: formFields[i].name, value: "" });
      }
    }
  }

  addFields();
  const handleFormChange = (event, index) => {
    let data = [...inputFields];
    const { field, value } = event.target;
    data[index].value = value;
    setInputFields(data);
  };

  //const [formName, setFormName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageType, setErrorMessageType] = useState("");

  //function containsNumbers(str) {
  //  return /^\d+$/.test(str);
  //}

  function containsOnlyNumbers(str) {
    return /^\d+$/.test(str);
  }
  //Submit form to database if no errors
  const submit = () => {
    let error = 0;
    let errorType = 0;
    let emptyList = [];
    let wrongType = [];

    inputFields.forEach((field, index) => {
      //Error handling
      if (field.value.trim() === "") {
        //Check if field is empty
        emptyList.push(index + 1);
        console.log(`Field number ${emptyList} has no value.`);
        setErrorMessage(`Field number ${emptyList} has no value.`);
        error = 1;
      } else if (
        //Check if datatype is correct
        formFields[index].dataType === "int" &&
        containsOnlyNumbers(field.value) === false
      ) {
        //
        wrongType.push(index + 1);
        setErrorMessageType(
          `Field number ${wrongType} has the wrong datatype.`
        );
        errorType = 1;
      }
    });
    //if no errors remove error messages
    if (error === 0) {
      setErrorMessage("");
      document.getElementById("errorMessage").innerText = " ";
    }
    if (errorType === 0) {
      setErrorMessageType("");
      document.getElementById("errorMessageType").innerText = " ";
    }
    //if no errors submit
    if (error === 0 && errorType === 0) {
      //create object to store fieldnames and values
      const bodyData = {};
      //iterate each field and store into bodydata
      inputFields.forEach((i) => {
        bodyData[i.field] = i.value;
      });

      const fieldsList = Object.keys(bodyData);
      const valuesList = Object.values(bodyData);

      //Send to database
      const addIntoTable = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: props.formName,
          fields: fieldsList,
          values: valuesList,
        }),
      };

      fetch(API_PATH + "api/addIntoTable", addIntoTable)
        .then((response) => response.json())
        .then((data) => console.log(data));
    } else {
      //if errors display error messages
      document.getElementById("errorMessage").innerText = errorMessage;
      document.getElementById("errorMessageType").innerText = errorMessageType;
    }
  };

  return (
    <div className="App" class="DoTest_container">
      <h1>{props.formName}</h1>

      <form onSubmit={submit}>
        {/*Display form fields*/}
        {Array.isArray(formFields) &&
          formFields.map((form, index) => {
            return (
              <div key={index} class="DoTest_field">
                <text class="DoTest_formName">
                  <div key={index}>{form.name}</div>
                </text>

                <input
                  class="DoTest_input"
                  name="field"
                  placeholder={form.dataType}
                  onChange={(e) => {
                    //const file = e.target.files[0];
                    //readExcel(file);
                    handleFormChange(e, index);
                  }}
                  value={form.field}
                ></input>
              </div>
            );
          })}
      </form>

      <br />
      {/*Buttons to add and submit form*/}
      <button onClick={submit} class="submit_button">
        Skicka
      </button>

      <br />
      {/*Display error message*/}
      <div class="error" id="errorMessage">
        {errorMessage}
      </div>
      <div class="error" id="errorMessageType">
        {errorMessageType}
      </div>
    </div>
  );
}

export default DoTest;
