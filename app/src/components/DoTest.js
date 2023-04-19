import { useState } from "react";
import "./DoTest.css";
import * as XLSX from "xlsx";

function DoTest(props) {
  const [formFields, setFormFields] = useState(props.data);

  const [inputFields, setInputFields] = useState([]);

  //const [items, setItems] = useState([]);
  //const [columns, setColumns] = useState([]);


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

      fetch("http://localhost:5000/api/addIntoTable", addIntoTable)
        .then((response) => response.json())
        .then((data) => console.log(data));

      

    } else {
      document.getElementById("errorMessage").innerText = errorMessage;
      document.getElementById("errorMessageType").innerText = errorMessageType;
    }
  };

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        // Extract column names from the first row
        const cols = [];
        for (const key in data[0]) {
          cols.push(key);
        }

        const mappedData = data.map((items) => {
          const newItem = {};
          for (const column of cols) {
            newItem[column] = items[column];
          }
          
          console.log("fdggfddgfgfdgfdfdggfdfgdfdggfddfggfd")
          //console.log(newItem)
          return newItem;
        });

        //setColumns(cols);
        //setItems(mappedData);
        

        const valueList = Object.values(mappedData);
        console.log(valueList);
        console.log(valueList);
        
        
        for (let i = 0; i < inputFields.length; i++) {
          const field = inputFields[i].field;
          const value = mappedData[0][field];
          inputFields[i].value = value;
        }

        

        //console.log(mappedData);
        console.log("mappedData");
        console.log(inputFields)
        
        resolve();
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    return promise;
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    readExcel(file);
  };


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
                onChange={(e) => {
                  const file = e.target.files[0];
                  readExcel(file);
                  //handleFormChange(e, index);
                }}
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
      
      <div class="drop" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
        }}
      /></div>
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
