import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Filter.module.css';

class Filter extends Component {
  static defaultProps = { options: { filter: '' } };
  static propTypes = {
    handlers: PropTypes.shape({ onChange: PropTypes.func }).isRequired,
    options: PropTypes.shape({ filter: PropTypes.string.isRequired }),
  };
  render() {
    const {
      handlers: { onChange },
      options: { filter },
    } = this.props;

    return (
      <div className={styles.Filter__field}>
        <div className={styles.Filter__label}>
          Find contacts by name
          <input
            className={styles.Filter__input}
            type="text"
            name="filter"
            onChange={onChange}
            value={filter}
          />
        </div>
      </div>
    );
  }
}

export default Filter;
