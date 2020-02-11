import React, { Component } from "react";
import uuid from "uuid";
import Section from "./section/Section";
import ContactForm from "./contactForm/ContactForm";
import Filter from "./filter/Filter";
import ContactList from "./contactList/ContactList";

// Приложение должно состоять из формы и списка контактов. На текущем шаге реализуй добавление имени контакта
// и отображение списка контактов. Приложение не должно сохранять контакты между разными сессиями (обновление страницы).

// Состояние хранящееся в родительском компоненте <App> обязательно должно быть следующего вида, добавлять новые свойства нельзя.
// Расширь функционал приложения, позволив пользователям добавлять номера телефонов. Для этого добавь второй инпут в форму,
// и свойство для хранения его значения в состоянии.

// Когда мы работаем над новым функционалом, бывает удобно жестко закодировать некоторые данные в состояние.
// Это избавит от необходимости вручную вводить данные в интерфейсе для тестирования работы нового функционала.
// Например можно использовать такое начальное состояние:

const INITIALL_STATE = {
  contacts: [
    { id: "6b2b6280-28a2-4540-b798-c728e616b081", name: "Rosie Simpson", number: "459-12-56" },
    { id: "9eabec56-273c-497c-8785-e05d8f57949a", name: "Hermione Kline", number: "443-89-12" },
    { id: "1f3f0d57-3e62-4e6f-9a18-4e97d9200717", name: "Eden Clements", number: "645-17-79" },
    { id: "65b5bbb4-f3d9-4fc3-a12e-7231271b3296", name: "Annie Copeland", number: "227-91-26" }
  ],
  name: "",
  number: "",
  filter: ""
};

// Возьми свое решение задания из домашней работы 2 и добавь хранение контактов телефонной книги в localStorage. 
// Используй методы жизненного цикла.

// При добавлении и удалении контакта, контакты сохраняются в локальное хранилище.
// При загрузке приложения, контакты, если таковые есть, считываются из локального хранилища и записываются в состояние.

class App extends Component {
  state = { ...INITIALL_STATE };

  componentDidMount = () => {
    const localContacts = localStorage.getItem('contacts');

    if(localContacts) {
      this.setState({contacts: JSON.parse(localContacts)})
    }
  }

  componentDidUpdate = ( _, prevState) => {
    if(prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  }

  checkForMatch = () => {
    return this.state.contacts.some(
      contact => contact.name === this.state.name
    );
  };

  handleFormChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = e => {
    e.preventDefault();

    const newContact = {
      id: uuid.v4(),
      name: this.state.name,
      number: this.state.number
    };

    // Запрети пользователю возможность добавлять контакты, имена которых уже есть в телефонной книге.
    // При попытке выполнить такое действие выведи alert с предупреждением.

    const isMatch = this.checkForMatch();

    if (!isMatch) {
      this.setState(prevState => ({
        contacts: [...prevState.contacts, newContact],
        name: "",
        number: ""
      }));
    } else {
      alert(`${this.state.name} is already in contacts.`);
    }
  };

  handleDeleteSubmit = e =>
  
    // Расширь функционал приложения, позволив пользователю удалять ранее сохраненные контакты.

    this.setState({
      contacts: this.state.contacts.filter(el => el.id !== e.target.id)
    });

  getFilterValue = e => this.setState({ filter: e.target.value });

  getFilteredContacts = (filter, contacts) => {
    if (this.state.contacts.length >= 2) {
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      );
    } else {
      return this.state.contacts;
    }
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = this.getFilteredContacts(filter, contacts);

    return (
      < >
        <Section title={"Phonebook"} >
          <ContactForm
            name={this.state.name}
            number={this.state.number}
            handleSubmit={this.handleFormSubmit}
            handleChange={this.handleFormChange}
          />
        </Section>
        <Section title={"Contacts"}>
          <Filter handleChangeFilter={this.getFilterValue} />
          <ContactList
            contactList={filteredContacts}
            handleChange={this.handleDeleteSubmit}
          />
        </Section>
      </>
    );
  }
}

export default App;
