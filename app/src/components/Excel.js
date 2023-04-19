import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import * as XLSX from "xlsx";
import Select from "react-select";

function Excel() {
  const [items, setItems] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState([]);
  const [show, setShow] = useState(true);

  const [formData, setFormData] = useState([]);
  const [formName, setFormName] = useState("");

  //Get all avaliable forms
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


  const handleSelectChange = (selected) => {
    setSelectedOption(selected);
    setShow(false);
    console.log("Updating");
    if (selectedOption) {
      console.log("Selected option");
      fetch("http://localhost:5000/api/getColumns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formId: selectedOption.value,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          const tempData = data.fields.map((field, index) => {
            return {
              name: field,
              value: false,
              dataType: data.types[index],
            };
          });
          setFormData(tempData);
          setFormName(selectedOption.label);
          console.log(tempData);
          console.log(formName);
          console.log("Keeping updated");
        })
        .catch((error) => {
          setError(error);
        });
    } else {
      setFormData([]);
      setFormName("");
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

        const json = XLSX.utils.sheet_to_json(ws, { header: 1, defval: "" });
        console.log(json);
        console.log("HERE");
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
    <div className="Excel container">
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

        <table class="table container">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column} scope="col">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                {columns.map((column, index) => (
                  <td key={index}>{item[column]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
}

export default Excel;
