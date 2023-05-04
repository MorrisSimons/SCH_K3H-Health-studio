import { useState } from "react";
import "./AddForm.css";
import Header from "./Header";
import Footer from "./Footer";
const API_PATH = process.env.REACT_APP_API_PATH; //Path to backend

function AddForm() {
  const [formFields, setFormFields] = useState([{ name: "", dataType: "" }]); //Containing data for each field

  //Handle value changes. Updates field with correct value and datatype
  const handleFormChange = (event, index) => {
    let data = [...formFields];
    const { name, value } = event.target;
    data[index][name] = value;
    setFormFields(data);
  };

  const [formName, setFormName] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  //Handle submit
  const submit = (e) => {
    let error = 0;
    formFields.forEach((field, index) => {
      //Check if field is empty
      if (field.name.trim() === "") {
        setErrorMessage(`Field number ${index + 1} has an empty name.`);
        error = 1;
      }
      //Check if datatype is selected
      else if (field.dataType.trim() === "") {
        setErrorMessage(`Missing datatype at field number ${index + 1}`);
        error = 1;
      }
      //Check if formname is empty
      else if (formName === "") {
        console.log("Name of form missing");
        setErrorMessage("Name of form missing");
        error = 1;
      }
    });
    //If no errors Submit form to database
    if (error === 0) {
      //create object to store fieldnames and datatypes
      const bodyData = {};
      //iterate each field and store into bodydata
      formFields.forEach((i) => {
        bodyData[i.name] = i.dataType;
      });

      const fieldsList = Object.keys(bodyData);
      const dataTypeList = Object.values(bodyData);

      //Send data to database
      const addTable = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formName,
          fields: fieldsList,
          dataType: dataTypeList,
        }),
      };

      fetch(API_PATH + "api/addTable", addTable)
        .then((response) => response.json())
        .then((data) => console.log(data));

      //Reset error message
      setErrorMessage("");
      document.getElementById("error-message").innerText = " ";
    }

    //Else set error message
    else {
      document.getElementById("error-message").innerText = errorMessage;
    }
  };

  //create new field
  const addFields = () => {
    let object = {
      name: "",
      dataType: "",
    };

    setFormFields([...formFields, object]);
  };

  //Remove field
  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1);
    setFormFields(data);
  };

  //Set name of form
  const setName = (event) => {
    setFormName(event.target.value);
  };

  //Render out form with fields and buttons to add fields and submit form to database
  return (
    <div>
      <Header />
      <div className="App" class="add_form_container">
        <div class="nameInput">
          <input
            //Input for formname
            class="formNameInput"
            name="name"
            placeholder="Namn på formulär"
            onChange={setName}
          />
        </div>

        <form onSubmit={submit}>
          {formFields.map((form, index) => {
            //rendering out each formfield
            return (
              <div className="elementsContainer">
                <div key={index} class="add_form_field">
                  <input
                    //Input for fieldname
                    class="add_form_input"
                    onKeyPress={(e) => {
                      e.key === "Enter" && e.preventDefault();
                    }}
                    name="name"
                    placeholder="Namn"
                    onChange={(event) => handleFormChange(event, index)}
                    value={form.name}
                  />

                  <select
                    //Dropdown for datatype
                    class="add_form_select"
                    name="dataType"
                    onChange={(event) => handleFormChange(event, index)}
                    value={form.dataType}
                  >
                    <option value="">Välj datatyp</option>
                    <option value="int">Tal</option>
                    <option value="string">Text</option>
                    <option value="Datum">Datum</option>
                    <option value="Tid">Tid</option>
                  </select>

                  <button
                    //Button to remove field
                    type="button"
                    onClick={() => removeFields(index)}
                    class="delete"
                  >
                    Ta bort fält
                  </button>
                </div>
              </div>
            );
          })}
        </form>
        {/*Buttons to add and submit form*/}
        <button onClick={addFields} class="add">
          Lägg till fält
        </button>
        <br />
        <button onClick={submit} class="submit">
          Skicka
        </button>
        <div class="error" id="errorMessage">
          {errorMessage}
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default AddForm;
