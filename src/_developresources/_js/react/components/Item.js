import React from 'react';
import '@/react/components/Item.scss';
import PropTypes from 'prop-types';

class Item extends React.Component {

  constructor(props) {
    super(props);
    this.setItemState = this.setItemState.bind(this);
  }

  setItemState(e) {
    e.preventDefault();
    this.props.setItemState(this.props);
  }

  render() {
    const link = this.props.done ? 'done' : 'no done';
    return (    
      <li className="r-item">
        <span className="r-item_text">{this.props.text}</span>
        <p className="r-item_btn">
          <button className={this.props.done ? 'c-btn-s c-btn-conv' : 'c-btn-s is-nodone'} onClick={this.setItemState} >{link}</button>
        </p>
      </li>
    );
  }
}

Item.propTypes = {
  done: PropTypes.bool,
  text: PropTypes.string,
  link: PropTypes.string,
  setItemState: PropTypes.func,
};

export default Item;
