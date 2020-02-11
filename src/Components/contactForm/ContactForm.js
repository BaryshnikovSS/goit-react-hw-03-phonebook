import React from "react";
import css from './ContactsForm.module.css'

const ContactForm = ({ handleSubmit, handleChange, name, number }) => (
  <form onSubmit={handleSubmit} className={css.form}>
    <h3>Name</h3>
    <input type="text" name="name" onChange={handleChange} value={name} />
    <h3>Number</h3>
    <input type="text" name="number" onChange={handleChange} value={number} />
    <button type="submit">Add contact</button>
  </form>
);

export default ContactForm;
