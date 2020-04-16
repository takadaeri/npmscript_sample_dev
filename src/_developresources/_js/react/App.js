import React from 'react';
import '@/react/App.scss';
import Append from '@/react/components/Append';
import List from '@/react/components/List';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.items = [];
    this.state = {
      isLoading: false,
      hasError: false,
      items: []
    };
    this.appendTodo = this.appendTodo.bind(this);
    this.setItemState = this.setItemState.bind(this);
  }

  componentDidMount() {
    fetch('/common/data/data_react_sample.json')
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.items = result;
          this.setState({
            isLoaded: true,
            items: result,
          });
        },
        // 補足：コンポーネント内のバグによる例外を隠蔽しないためにも
        // catch()ブロックの代わりにここでエラーハンドリングすることが重要です
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );    
  }

  appendTodo(inputvalue) {
    console.log(inputvalue);
    this.items.push({
      id: this.items.length,
      text: inputvalue,
      done: false,
    });
    console.log(this.items);
    this.setState({ items: this.items });
  }

  setItemState(item) {
    console.log(item.id);
    this.items[item.id].done = !this.items[item.id].done;
    this.setState({ items: this.items });
  }

  render() {
    return (
      <div className="r-app">
        <Append onAppendTodo={(inputvalue) => this.appendTodo(inputvalue)} />
        <List items={this.state.items} setItemState={(item) => this.setItemState(item)} isLoading={this.state.isLoading} hasError={this.state.hasError} />
      </div>
    );
  }
}

export default App;
