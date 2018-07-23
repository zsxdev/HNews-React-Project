import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author : 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author : 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  }
]

class App extends Component {

  constructor(props){
    super(props);

    this.state ={
      list,
      searchTerm: '',
    };
    
    // Doing this.onDismiss = () => {} is a bad practice

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }
  // Logic of class methods should be defined outside of the constructor
  // ** We can auto-bound automatically without binding by using arrow functiosn
  

  onDismiss(id){
    const isNotId = item => item.objectID != id;
    const updatedList = this.state.list.filter(isNotId);
    this.setState({list : updatedList});
  }

  onSearchChange(event){
    this.setState({searchTerm: event.target.value})
  }

  isSearched(searchTerm){
    return function(item){
      return item.title.toLowerCase().includes(searchTerm.toLowerCase());
    }
  }

  render() {
    const { searchTerm, list } = this.state;
    return (
      <div className="page">
        <div className="interactions">
          <Search
            value = {searchTerm}
            onChange = {this.onSearchChange}
          >
            Search
          </Search>
      </div>
      <Table
        list = {list} 
        pattern = {searchTerm}
        onDismiss = {this.onDismiss}
        isSearched = {this.isSearched}
       />
      </div>
    );
  }
}
// Search is a  Functional Stateless Component.
const Search = ({value , onChange, children}) =>
  <form>
    {children} <input
      type = "text"
      value= {value}
      onChange={onChange}
    />
  </form>


class Table extends Component {
  render(){
    const {list, pattern, onDismiss, isSearched,} = this.props;
    return (
      <div>
        {
          list.filter(isSearched(pattern)).map(item =>
            <div key={item.objectID}>
              <span>
                <a href={item.url}> {item.title}</a>
              </span>
              <span>{item.author}</span>
              <span>{item.num_comments}</span>
              <span>{item.points}</span>
              <span>
                <Button 
                  onClick = {() => onDismiss(item.objectID)}
                >
                  Dismiss
                </Button>
              </span>
            </div>
          )
        }
      </div>
    )
  }
}

class Button extends Component{
  render(){
    const{
      onClick, 
      className = '', 
      children,
    } = this.props;
    return(
      <button
        onClick = {onClick}
        className = {className}
        type = "button"
      >
        Dismiss
      </button>
    )
  }
}

export default App;
