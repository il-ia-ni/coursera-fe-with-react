import React, { Component } from 'react';
import './App.css';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './components/MenuComponent';
import { DISHES } from './shared/dishes';

// @ https://www.geeksforgeeks.org/reactjs-class-based-components/
/* Class-based components have access to a state which dictates the current behavior and appearance of the component (With React Hooks introduced in version 16.8, we are able to declare a stateful component in functional-components without declaring a class.A state gets declared in a constructor of a class-based component. Class-based components must also always have a render() method */
class App extends Component {

  constructor(params) {
    super(params);

    this.state = {
      dishes: DISHES
    };
  }

  // Added dishes from the state of the App component as a prop of the Menu component. I.e we can work with DISHES in MenuComponent.js now without having imported it directly there
  render() {
    return (
      <div className="App">
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>
        <Menu dishes={this.state.dishes} />
      </div>
    );
  }
}

// @ https://www.geeksforgeeks.org/differences-between-functional-components-and-class-components-in-react/
/* function App() {

  return (
    <div className="App">
      <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
          </div>
      </Navbar>
      <Menu />
    </div>
  );
} */

export default App;
