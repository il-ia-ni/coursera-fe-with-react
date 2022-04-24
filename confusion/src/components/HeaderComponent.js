import React, { Component } from "react";
import { Navbar, NavbarBrand } from 'reactstrap';
// Jumbotron component is removed from Bootstrap 5. Replaced it with a div. See @ https://getbootstrap.com/docs/5.0/migration/#jumbotron

class Header extends Component {
    render() {

        // React Fragment is used to allow returning multiple child elements (of one level) without wrapping them in a div-container (== without creating a new DOM-node). This is useful when a Component is inserted into other Components that cannot / should not accept extra nodes within the structure of their HTML code
        // See @ https://reactjs.org/docs/fragments.html

        // color="primary" of Navbar is replaced with custom css-styling in App.css
        return (
            <React.Fragment>
                <Navbar dark>
                    <div className="container">
                        <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
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