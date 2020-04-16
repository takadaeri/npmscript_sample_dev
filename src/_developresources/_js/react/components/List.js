import React from 'react';
import '@/react/components/List.scss';
import Item from '@/react/components/Item';
import PropTypes from 'prop-types';

class List extends React.Component {
  render() {
    if (this.props.isLoading) {
      return <h2>loading . . . </h2>;
    }
    if (this.props.hasError) {
      return <h2>error</h2>;
    }    
    const items = this.props.items.map((item) =>
      <Item key={item.id}{...item} setItemState={this.props.setItemState} />
    );
    return (
      <div>
        <h4>MY TODO LIST</h4>
        <ul className="r-list">
          {items}
        </ul>
      </div>
    );
  }
}

List.propTypes = {
  items: PropTypes.array,
  setItemState: PropTypes.func,
  isLoading: PropTypes.bool,
  hasError: PropTypes.bool,
};

export default List;
