import React, { Component } from "react";
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem } from 'reactstrap';
// Jumbotron component is removed from Bootstrap 5. Replaced it with a div. See @ https://getbootstrap.com/docs/5.0/migration/#jumbotron
import { NavLink } from 'react-router-dom';
// NavLink applies a tag to a link and sets it as active if the link matches a current URL in browser

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false
        };
        this.toggleNav = this.toggleNav.bind(this)
    }
    // .bind() is a built in MEthod for class components to pass data to the functions of a class. Takes THIS + an object of any other data as args. An alternative to pass a function as a value of JAX elements props without using an arrow function. See @ https://www.geeksforgeeks.org/reactjs-bind-method/

    toggleNav() {
        // upon being called reverts the value of the state attr isNavOpen to the opposite one
        this.setState({
            isNavOpen: !this.state.isNavOpen
        })
    }

    render() {

        // React Fragment is used to allow returning multiple child elements (of one level) without wrapping them in a div-container (== without creating a new DOM-node). This is useful when a Component is inserted into other Components that cannot / should not accept extra nodes within the structure of their HTML code
        // See @ https://reactjs.org/docs/fragments.html

        // color="primary" of Navbar is replaced with custom css-styling in App.css

        // Containers in Bootstrap 5 are no longer flex. Extra class d-flex applied to put NavbarBrand and Nav in one line! See @ https://getbootstrap.com/docs/5.0/utilities/flex/

        // expand="md" prop of NavBar means the NavBar is loaded in expanded mode only for medium to extra lardge displays
        // ! The elements that are to be collapsed have to be wrapped inside of the Collapsable component !
        return (
            <React.Fragment>
                <Navbar dark expand="md">
                    <div className="container d-inline-flex">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand href="/" className="mr-auto">
                            <img src="assets/images/logo.png" height="30" width="41" alt="Ristorante Con Fusion" />
                        </NavbarBrand>
                        <Collapse navbar>
                            <Nav navbar isOpen={this.state.isNavOpen}>
                                <NavItem>
                                    <NavLink className="nav-link" to='/home'>
                                        <span className="fa fa-home fa-lg"></span>
                                        Home
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/aboutus'>
                                        <span className="fa fa-info fa-lg"></span>
                                        About Us
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/menu'>
                                        <span className="fa fa-list fa-lg"></span>
                                        Our Menu
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/contactus'>
                                        <span className="fa fa-address-card fa-lg"></span>
                                        Contact Us
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>

                    </div>
                </Navbar>
                <div className="jumbotron">
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Ristorante con Fusion</h1>
                                <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Header;