import "./DoTest.css";
import * as XLSX from "xlsx";
import React, { useState } from "react";

function DoTestExcel(props) {
  const [json, setJson] = useState([]);
  const [errorNameList, setErrorNameList] = useState([]);
  const [errorEmptyList, setErrorEmptyList] = useState([]);
  
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
        setJson(json);
        setErrorEmptyList([]);
        setErrorNameList([]);
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
    //Error handling
    
  
    const names = [];
    console.log(props.data);

    for (let i = 0; i < props.data.length; i++) {
      names.push(props.data[i].name);

      if (names[i] === json[0][i]) {
        console.log("match");
      } else {
        setErrorNameList(
          "Felaktig kolumnnamn i excel. Kollumnen: " +
            json[0][i] +
            " Ska vara " +
            names[i]
        );
      }
    }
    console.log(errorNameList);

    

    for (let i = 1; i < json.length; i++) {
      for (let j = 0; j < props.data.length; j++) {
        if (json[i][j] === "") {
          setErrorEmptyList(
            "Saknas data i excel. Kollumnen: " + json[0][j] + " Rad: " + i
          );
        }
      }
    }
    console.log(errorEmptyList);

    if (errorNameList.length === 0 && errorEmptyList.length === 0) {

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
    } else {
      console.log("error");
      
    }

  };

  return (
    <div className="App" class="DoTest_container">
      <h1>{props.formName}</h1>

      <br />

      <table>
        <tbody>{listItems}</tbody>
      </table>

      <div>
        {errorEmptyList}
        {errorNameList}
      </div>
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
