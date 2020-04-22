import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '@/react_fc/App.scss';
import ListModule from '@/react_fc/components/ListModule';
import List from '@/react_fc/components/List';

const App = () => {
  const dispatch = useDispatch();
  const lists = useSelector(state => state.list);

  const [_data, updateData] = useState();
  useEffect(() => {
    fetch('/common/data/data_react_sample.json')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(ListModule.actions.setListItems(data));
        updateData(_data);
      }); 
  }, []);

  const [newListName, setListName] = useState('');
  const addList = () => {
    if (newListName !== '') {
      dispatch(ListModule.actions.addList({id: lists.length > 0 ? lists.reduce((a,b) => a.id > b.id ? a : b).id + 1 : 1, text: newListName, done: false}));
    }
    setListName('');
  };
  const handleChangeList = (e) => {
    setListName(e.target.value);
  };
  
  return (
    <div className="r-app">
      <div className="form">
        <input className="c-input-txt" type="text" onChange={handleChangeList} value={newListName}/>
        <button className="c-btn" onClick={addList}>addList</button>
      </div>
      <h4>MY TODO LIST</h4>
      <ul>
      {lists.map((list) =>
        <List key={list.id} item={list} />
      )}
      </ul>
    </div>
  );
};

export default App;