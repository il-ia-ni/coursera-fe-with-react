import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import { DISHES } from '../shared/dishes';

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            selectedDish: null
        };
    }

    onDishSelect(dishID) {
        this.setState({ selectedDish: dishID });
    }

    render() {
        // in DishDetail a result of applying .filter-method on every dish from the dishes array is a subarray with (normally) only 1 object inside, since the id of each dish is unique. dish.id === this.state.selectedDish is always true.
        // Therefore the first object of the subarray [0] is assigned as a value of the selectedDish prop.
        return (
            <div>
                <Header />
                <Menu dishes={this.state.dishes} onClickProp={(dishID) => this.onDishSelect(dishID)} />
                <DishDetail selectedDish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />
                <Footer />
            </div>
        );
    }
}

export default Main;
