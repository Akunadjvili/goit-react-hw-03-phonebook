import React, { Component } from 'react';
// import { v4 as uuidv4 } from 'uuid';
import shortid from 'shortid';

import ContactForm from './components/ContactForm';
import Filter from './components/Filter';
import ContactList from './components/ContactList';

import styles from './App.module.css';

class Contact {
  constructor(name, number) {
    // this.id = uuidv4();
    this.id = shortid.generate();
    this.name = name;
    this.number = number;
  }
}
class App extends Component {
  KEY = 'phone-contacts';
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  onChangeInputsHandler = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  findContact = nameContact =>
    this.state.contacts.find(({ name }) => name === nameContact);

  addContactHandler = ({ name, number }) => {
    if (this.findContact(name)) {
      alert(`${name} is already in contacts.`);
      return;
    }

    this.setState(({ contacts }) => {
      return { contacts: [...contacts, new Contact(name, number)] };
    });
  };

  deleteContactHandler = idContact => {
    this.setState(({ contacts }) => {
      return {
        contacts: [...contacts].filter(({ id }) => id !== idContact),
      };
    });
  };

  componentDidMount() {
    const data = window.localStorage.getItem(this.KEY) || [];
    const contacts = JSON.parse(data);
    this.setState({
      contacts,
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      const data = JSON.stringify(this.state.contacts);
      window.localStorage.setItem(this.KEY, data);
    }
  }
  render() {
    const { contacts, filter } = this.state;
    return (
      <div className={styles.App__container}>
        <h1>Phonebook</h1>
        <ContactForm
          handlers={{
            onSubmit: this.addContactHandler,
          }}
        />
        <h2>Contacts</h2>
        <Filter
          handlers={{
            onChange: this.onChangeInputsHandler,
          }}
          options={{ filter }}
        />
        <ContactList
          handlers={{ onClick: this.deleteContactHandler }}
          options={{ contacts, filter }}
        />
      </div>
    );
  }
}
export default App;
