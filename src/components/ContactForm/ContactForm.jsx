import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ContactForm.module.css';

class ContactForm extends Component {
  static defaultProps = {};
  static propTypes = {
    handlers: PropTypes.shape({ onClick: PropTypes.func }).isRequired,
    options: PropTypes.shape({}),
  };
  state = {
    name: '',
    number: '',
  };

  onChangeInputsHandler = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  onSubmitHandler = event => {
    event.preventDefault();
    const {
      handlers: { onSubmit },
    } = this.props;
    onSubmit(this.state);
    this.onResetInputsHandler();
  };

  onResetInputsHandler = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form
        className={styles.ContactsForm}
        onSubmit={this.onSubmitHandler}
        onReset={this.onResetInputsHandler}
      >
        <div className={styles.ContactsForm__field}>
          <label className={styles.ContactsForm__label}>
            Name
            <input
              className={styles.ContactsForm__input}
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
              onChange={this.onChangeInputsHandler}
              value={name}
              required
            />
          </label>
        </div>
        <div className={styles.ContactsForm__field}>
          <label className={styles.ContactsForm__label}>
            Number
            <input
              className={styles.ContactsForm__input}
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
              onChange={this.onChangeInputsHandler}
              value={number}
              required
            />
          </label>
        </div>
        <div className={styles.ContactsForm__field}>
          <button className={styles.ContactsForm__button} type="submit">
            Add contact
          </button>
        </div>
      </form>
    );
  }
}

export default ContactForm;
