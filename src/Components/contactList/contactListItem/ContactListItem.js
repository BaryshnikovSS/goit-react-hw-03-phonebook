import React from "react";
import css from './ContactListItem.module.css'

const ContactListItem = ({ contactListItem, handleChange }) => {
  const { id, name, number } = contactListItem;
  return (
      <li className={css.list} >
        <p>
          {name}:   <span>{number}</span>
        </p>
        <button type="button" id={id} onClick={handleChange} >delete</button>
      </li>
  );
};

export default ContactListItem;
