import { useState } from "react";
import "./DoTest.css";
const API_PATH = process.env.REACT_APP_API_PATH;

function DoTest(props) {
  const [formFields, setFormFields] = useState(props.data);

  const [inputFields, setInputFields] = useState([]);

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

  function containsNumbers(str) {
    return /^\d+$/.test(str);
  }

  function containsOnlyNumbers(str) {
    return /^\d+$/.test(str);
  }

  const submit = () => {
    let error = 0;
    let errorType = 0;
    let emptyList = [];
    let wrongType = [];

    inputFields.forEach((field, index) => {
      if (field.value.trim() === "") {
        emptyList.push(index + 1);
        console.log(`Field number ${emptyList} has no value.`);
        setErrorMessage(`Field number ${emptyList} has no value.`);
        error = 1;
      } else if (
        formFields[index].dataType === "int" &&
        containsOnlyNumbers(field.value) === false
      ) {
        wrongType.push(index + 1);
        setErrorMessageType(
          `Field number ${wrongType} has the wrong datatype.`
        );
        errorType = 1;
      }
    });

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
      console.log(addIntoTable);

      fetch(API_PATH + "api/addIntoTable", addIntoTable)
        .then((response) => response.json())
        .then((data) => console.log(data));

      

    } else {
      document.getElementById("errorMessage").innerText = errorMessage;
      document.getElementById("errorMessageType").innerText = errorMessageType;
    }
  };

  function handleFileUpload(event) {
    const file = event.target.files[0];
    console("file");
    const reader = new FileReader();

    reader.onload = (event) => {
      const contents = event.target.result;

      // Parse the contents of the file into an array of field values
      const fieldValues = contents.split(",");

      // Update the input fields with the parsed values
      const updatedInputFields = inputFields.map((field, index) => ({
        field: field.field,
        value: fieldValues[index] || "",
      }));
      setInputFields(updatedInputFields);
    };

    reader.readAsText(file);
  }

  //const setName = (event) => {
  //    setFormName(event.target.value);
  //}

  return (
    <div className="App" class="DoTest_container">
      <h1>{props.formName}</h1>

      <form onSubmit={submit}>
        {formFields.map((form, index) => {
          return (
            <div key={index} class="DoTest_field">
              <text class="DoTest_formName">
                <div key={index}>{form.name}</div>
              </text>

              <input
                class="DoTest_input"
                name="field"
                placeholder={form.dataType}
                onChange={(event) => handleFormChange(event, index)}
                value={form.field}
              ></input>
            </div>
          );
        })}
      </form>

      <br />
      <button onClick={submit} class="submit_button">
        Skicka
      </button>
      <input type="file" onChange={handleFileUpload} class="File_drop" />
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
