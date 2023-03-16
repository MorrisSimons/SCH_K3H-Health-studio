import { useState } from 'react';
import './Add_form.css';

function Add_form() {
  const [formFields, setFormFields] = useState([
    { name: '', dataType: '' },
  ])

  const handleFormChange = (event, index) => {
    let data = [...formFields];
    const { name, value } = event.target;
    data[index][name] = value;
    setFormFields(data);
  }

  const [formName, setFormName] = useState("");

  const [errorMessage, setErrorMessage] = useState("");



  const submit = (e) => {
    let error = 0;
    formFields.forEach((field, index) => {

      if (field.name.trim() === '') {
        console.log(`Field number ${index + 1} has an empty name.`);
        setErrorMessage(`Field number ${index + 1} has an empty name.`)
        error = 1

      }
      else if (field.dataType.trim() === '') {
        console.log(`Missing datatype at field number ${index + 1}`)
        setErrorMessage(`Missing datatype at field number ${index + 1}`)
        error = 1
      }
      else if (formName === '') {
        console.log("Name of form missing")
        setErrorMessage("Name of form missing")
        error = 1
      }
    });

    if (error === 0) {
      console.log(formName)
      console.log(formFields)
      setErrorMessage("")
      document.getElementById('error-message').innerText = " ";
    }
    else {
      document.getElementById('error-message').innerText = errorMessage;
    }

  };

  const addFields = () => {
    let object = {
      name: '',
      dataType: ''
    }

    setFormFields([...formFields, object])
  }

  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1)
    setFormFields(data)
  }

  const setName = (event) => {
    setFormName(event.target.value);
  }

  return (
    <div className="App" class="add_form_container">
      <div class='nameInput'>
        <input

          name='name'
          placeholder='Namn på formulär'

          onChange={setName}
        />

      </div>


      <form onSubmit={submit}>
        {formFields.map((form, index) => {
          return (
            <div key={index} class="add_form_field">
              <input
                class = "add_form_input"
                onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                name='name'
                placeholder='Namn'
                onChange={event => handleFormChange(event, index)}
                value={form.name}
              />
              <select
                class = "add_form_select"
                name='dataType'
                onChange={event => handleFormChange(event, index)}
                value={form.dataType}
              >
                <option value=''>Välj datatyp</option>
                <option value='int'>Tal</option>
                <option value='string'>Text</option>
                <option value='Datum'>Datum</option>
                <option value='Tid'>Tid</option>
              </select>
              <button onClick={() => removeFields(index)} class="delete">Ta bort fält</button>
            </div>
          )
        })}
      </form>
      <button onClick={addFields} class="add">Lägg till fält</button>
      <br />
      <button onClick={submit} class="submit">Skicka</button>
      <div class="error" id="errorMessage">{errorMessage}</div>

    </div>
  );
}
export default Add_form;