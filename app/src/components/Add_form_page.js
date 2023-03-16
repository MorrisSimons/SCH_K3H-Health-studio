import React from "react"
import ReactDOM from "react-dom/client"
import "./Add_form_page.css"
import Header from "./Header"
import Footer from "./Footer"
import Add_form from "./Add_form"

function Add_form_page() {
	return (
		<div className="add_form_body">
			<React.StrictMode>
				<Header />
				<center>
					<Add_form />
				</center>
				<Footer />
			</React.StrictMode>
		</div>
	)
}

export default Add_form_page
