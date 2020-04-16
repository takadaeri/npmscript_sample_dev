import React from 'react';
// import '@/react/components/Append.scss';
import styles from '@/react/components/Append.scss';
import PropTypes from 'prop-types';

class Append extends React.Component {

  constructor(props) {
    super(props);
    this.appendTodo = this.appendTodo.bind(this);
  }

  appendTodo(e) {
    e.preventDefault();
    let val = e.target.text.value;
    this.props.onAppendTodo(val);
    e.target.text.value = '';
  }

  render() {
    return (    
      <form className="form" style={styles.form} onSubmit={this.appendTodo}>
        <input className="c-input-txt" type="text" name="text" />
        <button className="c-btn" type="submit">append</button>
      </form>
    );
  }
}

Append.propTypes = {
  onAppendTodo: PropTypes.func
};

export default Append;
