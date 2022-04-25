import React, { Component } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// In V6 of react-router-dom Routes replaced Switch as a more powerful alternative. See @ https://reactrouter.com/docs/en/v6/upgrading/v5#upgrade-all-switch-elements-to-routes
// In V6 of react-router-dom Redirect is removed See @ https://reactrouter.com/docs/en/v6/upgrading/v5#remove-redirects-inside-switch

import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';

// import DishDetail from './DishdetailComponent';
import { COMMENTS } from '../shared/comments';
import { DISHES } from '../shared/dishes';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            comments: COMMENTS,
            dishes: DISHES,
            leaders: LEADERS,
            promotions: PROMOTIONS,
            // selectedDish: null  // deactivated in favour of Reactor Route navigation
        };
    }

    /* onDishSelect(dishID) {
        this.setState({ selectedDish: dishID });
    } */

    render() {
        // in DishDetail a result of applying .filter-method on every dish from the dishes array is a subarray with (normally) only 1 object inside, since the id of each dish is unique. dish.id === this.state.selectedDish is always true.
        // Therefore the first object of the subarray [0] is assigned as a value of the selectedDish prop.
        /* Removed 2 components here in favour of navigation with React Router
        <Menu dishes={this.state.dishes} onClickProp={(dishID) => this.onDishSelect(dishID)} />
        <DishDetail selectedDish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />
        */

        // declaring a new functional component as an arrow function here

        // Home component is instantiated here with a custom prop DISH that selects a first dish with a prop "feature: true" from a JS list of dish objects by returning a subarray of objects using .filter on the state prop DISHES of the Main
        // The same is done for the rest of the custom props of the Home component
        const HomePage = () => {
            return (
                <Home dish={this.state.dishes.filter((dish) => dish.featured)[0]}
                    leader={this.state.leaders.filter((leader) => leader.featured)[0]}
                    promotion={this.state.promotions.filter((promotion) => promotion.featured)[0]}
                />
            );
        }

        // React Router's Routes is gonna switch between 2 specified Routes based on a specified URL in a browser. 
        // In V6 of react-router-dom Route does not support the Component-prop anymore and must be used with ELEMENT-prop. A function of a component has to be alway placed within < />, even for const! See @ https://stackoverflow.com/questions/69854011/matched-leaf-route-at-location-does-not-have-an-element

        // React Router's Redirect is gonna open a specified path if a URL received doesn't match any Routes in the Switch. In V6 of react-router-dom Redirect inside of Switch is removed in favour of a server-side redirecting while initial rendering! 
        // Client-side sln is to put the redirection logic into the RENDER prop of the Routes inside the switching OR to use NAVIGATE component (uses diff redirection logic, see link). See @ https://reactrouter.com/docs/en/v6/upgrading/v5#remove-redirects-inside-switch
        // RegEx are also no longer supported for Route in V6: @ https://reactrouter.com/docs/en/v6/faq#what-happened-to-regexp-routes-paths

        // For React Router V6 specifying a component to be switched to can be done in 2 ways:
        // 1) element={<CompName />} IF the component takes no props
        // 2) Using an arrow function IF the component takes props: element={<COMP />}. 
        // The function component <COMP /> can be either:
        //  - declared directly here with () => <CompName propName=val /> : THIS IS OUTDATED IN V6, arrow func cannot be placed inside tags
        //  - received from a const (see HomePage example)
        //  - inserted directly from an import of a component
        return (
            <div>
                <Header />
                <Routes>
                    <Route path='/' element={<Navigate replace to="/home" />} />
                    <Route path='/home' element={<HomePage />} />
                    <Route exact path='/menu' element={<Menu dishes={this.state.dishes} />} />
                    <Route exact path='/contactus' element={<Contact />} />
                </Routes>
                <Footer />
            </div>
        );
    }
}

export default Main;
