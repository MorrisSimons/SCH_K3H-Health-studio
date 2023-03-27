
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Header from "./Header"
import Footer from "./Footer"
import AddForm from './AddForm';
import DoTest from './DoTest';





function DoTestPage() {
	const [formData, setFormData] = useState([
		{ name: 'email', dataType: 'string' },
		{ name: 'Datum', dataType: 'date' },
	  ]);
	

	
	const [formName, setFormName] = useState('');
	const [selectValue, setSelectValue] = useState('');

	const handleChange = (event) => {
		setSelectValue(event.target.value);
		setFormName(event.target.value);
		setFormData()
	}

	return (
		<div className='DoTestBody'>
			<Header />
			<div>
				<select value={selectValue} onChange={handleChange}>
					<option value='' disabled>Välj Formulär</option>
					<option value="Träningsvanor">Träningsvanor</option>
					<option value="Hälsokontroll">Hälsokontroll</option>
     			 </select>
			</div>
			<DoTest data={formData} formName={formName}/>
			<Footer />
		</div>
	)
}

export default DoTestPage;


