
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Header from "./Header"
import Footer from "./Footer"
import DoTest from './DoTest';
import Select from "react-select"





function DoTestPage() {
	const [error, setError] = useState(null)
	const [options, setOptions] = useState([])
	const [selectedOption, setSelectedOption] = useState(null)

	const [formData, setFormData] = useState([

	  ]);
	
	
	useEffect(() => {
		fetch("http://localhost:5000/api/getForms", { method: "GET" })
		.then((response) => {
			if (!response.ok) {
				throw new Error("Network response was not ok")
			}
			return response.json()
		})
		.then((data) => {
			for (let i = 0; i < data.length; i++) {
				data[i].value = data[i].name
				//Capitalise first letter label
				data[i].label =
					data[i].name.charAt(0).toUpperCase() + data[i].name.slice(1)
			}
			setOptions(data)
		})
		.catch((error) => {
			setError(error)
		})
	}, [])
	
	const [formName, setFormName] = useState('');
	const [selectValue, setSelectValue] = useState('');

	const handleChange = (event) => {
		setSelectValue(event.target.value);
		setFormName(event.target.value);
		setFormData()
		
		console.log("change")
		getColumns()

	}


	const getColumns = () => {
		
		if (selectedOption === null) {
			console.log("No form selected")
			return
		}
			else {
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
							throw new Error("Network response was not ok")
						}
						console.log(response)
						return response.json()
					})
					.then((data) => {
						console.log(data)
	
						// Get the fields from data and put them into name and value
						let tempData = []
						console.log(data.fields.length)
						console.log(data.fields[2])
	
						// Loop through the data and put them into an array
						for (let i = 0; i < data.fields.length; i++) {
							console.log("HEJ")
							tempData.push({ name: data.fields[i], value: false })
							formData.push({ name: data.fields[i], dataType: data.types[i]})
							console.log(formData)
						}
						console.log(tempData)
						console.log(data)
						let tempResult = {
							id: selectedOption.value,
							tableName: selectedOption.label,
							columns: tempData,
						}
					})
					.catch((error) => {
						setError(error)
					})
			}

	}
	const handle2Change = () => {
		setSelectedOption()
		handleChange()
	}

	return (
		<div className='DoTestBody'>
			<Header />
			<div>
					<Select
						defaultValue={selectedOption}
						onChange={setSelectedOption}
						options={options}
						className="formSelectSelection"
					/>
			</div>
			<DoTest data={formData} formName={formName}/>
			<button onClick={handleChange}> Öpnna formulär</button>
			<Footer />
		</div>
	)
}

export default DoTestPage;


