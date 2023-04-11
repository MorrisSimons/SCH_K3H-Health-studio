import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import styled from "styled-components";
import Header from "./Header"
import Footer from "./Footer"

// npm i @emailjs/browser

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_thku59c",
        "template_8wk6pdi",
        form.current,
        "8sejxXdF6c9GA9HHI"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message sent");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <StyledContactForm>
      <Header />
      <form ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <input type="text" name="user_name" />
        <label>Email</label>
        <input type="email" name="user_email" />
        <label>Message</label>
        <textarea name="message" />
        <input type="submit" value="Send" />
      </form>
      <Footer />
    </StyledContactForm>
  );
};

export default Contact;

const StyledContactForm = styled.div`
  form {
    //align-items: flex-start;
    padding: 200px 700px;
    display: flex;
    //justify-content: center;
    min-width: 27%;
    flex-direction: column;
    font-size: 25px;
  }
  input {
    width: 100%;
    height: 25px;
    outline: none;
    border-radius: 5px;
    border: 2px solid rgb(220, 220, 220);
  }:focus {
    border: 2px solid rgba(0, 206, 158, 1);
    }

  textarea {
    max-width: 100%;
    min-width: 100%;
    width: 100%;
    max-height: 200px;
    min-height: 100px;
    outline: none;
    border-radius: 5px;
    border: 2px solid rgb(220, 220, 220);
  }:focus {
    border: 2px solid rgba(0, 206, 158, 1);
    }

  label {
    margin-top: 1rem;
  }
  input[type="submit"] {
    margin: 15px 5px;
    width: 100px;
    cursor: pointer;
    background-color: #1d6976;
    color: white;
    border: none;
  }  
  `;