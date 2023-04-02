import React, { useState, useEffect } from 'react';
import Header from "./Header"
import Footer from "./Footer"
import DoTest from './DoTest';
import Select from "react-select"

function DoTestPage() {
	const [error, setError] = useState(null)
	const [options, setOptions] = useState([])
	const [selectedOption, setSelectedOption] = useState(null)

	const [formData, setFormData] = useState([])
	const [formName, setFormName] = useState('');
	
	//Get all tablenames
	useEffect(() => {
		fetch("http://localhost:5000/api/getForms", { method: "GET" })
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok")
				}
				return response.json()
			})
			.then((data) => {
				const formattedData = data.map((item) => {
					return {
						value: item.name,
						label: item.name.charAt(0).toUpperCase() + item.name.slice(1),
					}
				})
				setOptions(formattedData)
			})
			.catch((error) => {
				setError(error)
			})
	}, [])
	
	//Get columns from selected form
	useEffect(() => {
		if (selectedOption) {
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
				return response.json()
			})
			.then((data) => {
				const tempData = data.fields.map((field, index) => {
					return {
						name: field,
						value: false,
						dataType: data.types[index],
					}
				})
				setFormData(tempData)
				setFormName(selectedOption.label)
			})
			.catch((error) => {
				setError(error)
			})
		} else {
			setFormData([])
			setFormName('')
		}
	}, [selectedOption])

	const handleSelectChange = (selected) => {
		setSelectedOption(selected)
	}

	return (
		<div className='DoTestBody'>
			<Header />
			<div>
				<Select
					value={selectedOption}
					options={options}
					onChange={handleSelectChange}
				/>
			</div>
			{formData.length > 0 ? (
				<DoTest data={formData} formName={formName} />
			) : (
				<p>Please select a form.</p>
			)}
			<Footer />
		</div>
	)
}

export default DoTestPage;
