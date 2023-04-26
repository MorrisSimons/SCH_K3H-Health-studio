import "./DoTest.css";
import * as XLSX from "xlsx";
import React, { useState } from "react";

function DoTestExcel(props) {
  //const [formFields, setFormFields] = useState(props.data);
  const [json, setJson] = useState([]);
  console.log(props.data)
  console.log("hej")
  console.log(props.data.length)
  console.log(props.data.n)
  const readExcel = (file) => {
    console.log(props.data);
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const json = XLSX.utils.sheet_to_json(ws, { header: 1, defval: "" });
        console.log(json[0]);
        setJson(json);
        console.log(json);
        console.log("json[0]");

        //compareNames()
        const names = [];
        console.log(props.data)
        
        for (let i = 0; i < props.data.length; i++) {
          //names.push(props.data.name[i]);
          names.push(props.data[i].name);
          console.log(String(names))
          if (names[i] === json[0][i]) {
            console.log("match");
          } else {
            console.log("no Match");
          }
        }
      };
    });
    return promise;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    readExcel(file);
  };

  const listItems = json.map((row, index) => (
    <tr key={index}>
      {row.map((cell, index) => (
        <td key={index}>{cell}</td>
      ))}
    </tr>
  ));

  const submit = () => {
    //Felhantering

    
    
    for (let i = 1; i < json.length; i++) {
      const addIntoTable = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: props.formName,
          fields: json[0],
          values: json[i],
        }),
      };
      console.log(addIntoTable.body);

      fetch("http://localhost:5000/api/addIntoTable", addIntoTable)
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };

  return (
    <div className="App" class="DoTest_container">
      <h1>{props.formName}</h1>

      <br />

      <table>
        <tbody>{listItems}</tbody>
      </table>
      <button class="submit_button" onClick={submit}>
        Skicka
      </button>

      <div
        class="drop"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files[0];
            readExcel(file);
          }}
        />
      </div>
    </div>
  );
}

export default DoTestExcel;
