import { useState } from 'react';


function DoTest(props) {
    const [formFields, setFormFields] = useState(
        props.data
    );


    
    const [inputFields, setInputFields] = useState([
    ]);


    function addFields() {
        if (inputFields.length !== formFields.length) {
            for (let i = 0; i < formFields.length; i++) {
                inputFields.push({ field: formFields[i].name, value: "" })
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

    function containsNumbers(str) {
        return /^\d+$/.test(str);
    }

    function containsOnlyNumbers(str) {
        return /^\d+$/.test(str);
    }



    const submit = () => {
        let error = 0;
        let errorType = 0;
        let emptyList = []
        let wrongType = []
        inputFields.forEach((field, index) => {
            if (field.value.trim() === '') {
                emptyList.push(index + 1)
                console.log(`Field number ${emptyList} has no value.`);
                setErrorMessage(`Field number ${emptyList} has no value.`)
                error = 1

            }
            else if (formFields[index].dataType === "int" && containsOnlyNumbers(field.value) === false) {
                wrongType.push(index + 1)
                setErrorMessageType(`Field number ${wrongType} has the wrong datatype.`)
                errorType = 1
            }


        });

        if (error === 0) {

            setErrorMessage("")
            document.getElementById('errorMessage').innerText = " ";

        }
        if (errorType === 0) {
            setErrorMessageType("")
            document.getElementById('errorMessageType').innerText = " "
        }
        if (error === 0 && errorType == 0) {//Om inga fel skicka
            console.log(inputFields)
        }
        else {
            document.getElementById('errorMessage').innerText = errorMessage;
            document.getElementById('errorMessageType').innerText = errorMessageType;
        }

    };







    //const setName = (event) => {
    //    setFormName(event.target.value);
    //}

    return (
        <div className="App" class="container">
            <h1>{props.formName}</h1>


            <form onSubmit={submit}>
                {formFields.map((form, index) => {
                    return (
                        <div key={index} class="field">
                            <text>
                                <div key={index}>{form.name}</div>
                            </text>

                            <input
                                name='field'
                                placeholder={form.dataType}

                                onChange={event => handleFormChange(event, index)}
                                value={form.field}></input>
                        </div>
                    )
                })}
            </form>

            <br />
            <button onClick={submit} class="submit">Skicka</button>
            <div class="error" id="errorMessage">{errorMessage}</div>
            <div class="error" id="errorMessageType">{errorMessageType}</div>



        </div>
    );
}

export default DoTest;