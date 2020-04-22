import React from 'react';
import { useDispatch } from 'react-redux';
import ListModule from '@/react_fc/components/ListModule';
import PropTypes from 'prop-types';

const List = (props) => {
  const { item } = props;
  const dispatch = useDispatch();

  const deleteList = () => dispatch(ListModule.actions.deleteList(item.id));
  const doneList = () => dispatch(ListModule.actions.doneList(item.id, !item.done));
  const done = item.done ? 'done' : 'no done';

  return (
    <li className="r-item">
      <span className="r-item_text">{item.text}</span>
      <p className="r-item_btn">
        <button className={item.done ? 'c-btn-s c-btn-conv' : 'c-btn-s is-nodone'}  onClick={doneList} >{done}</button>
      </p>
      <p className="r-item_delete">
        <button className="c-btn-s r-delete" onClick={deleteList}>×</button>
      </p>
    </li>
  );
};

List.propTypes = {
  item: PropTypes.object,
};

export default List;