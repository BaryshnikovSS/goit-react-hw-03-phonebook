import React from "react";
import ContactListItem from "./contactListItem/ContactListItem";
import uuid from "uuid";

const ContactList = ({ contactList, handleChange }) => {
  return (
    <ul>
      {contactList.map(el => <ContactListItem key={uuid.v4()} contactListItem={el} handleChange={handleChange}/>)}
    </ul>
  );
};

export default ContactList;
