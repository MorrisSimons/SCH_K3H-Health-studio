import React from 'react';
import ReactDOM from 'react-dom/client';
import './AddFormPage.css';
import Header from "./Header"
import Footer from "./Footer"
import {AddForm} from './AddForm';



function AddFormPage() {
	return (
		<div className='add_form_body'>
			<Header />
        		<AddForm/>
			<Footer />
		</div>
	)
}

export default AddFormPage


