import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';
import DishDetail from './DishdetailComponent';

class Menu extends Component {

    // Class components should always call the base constructor with props.
    // every class-based component in React must have a constructor (see links in App.js)
    constructor(params) {
        super(params);  // the received by Menu-cls contructor params are passed over to the super cls (component)

        // State is similar to props, but it is private and fully controlled by the component.
        // a state stores data related to the React component. In this version the contents of the menu are no longer stored in the state of the Menu component. 
        this.state = {
            selectedDish: null
        };

    }

    // a custom method to change a state of the Menu component:
    // sets the data of a clicked dish as a current value of the state-attribute selectedDish
    onDishSelect(dish) {
        // to change a state of a Compomnent we need to call the setState method! 
        // Direct changing of the state by assigning a new value is not allowed! Only the original assigment of the state in constructur is allowed
        // This is necessary bc SetState also infroms React about an update of the component, which triggers render() each time the state changes. React may batch multiple setState() calls into a single update for performance (Asynchronous).
        this.setState({ selectedDish: dish });
    };


    // every component in React must have render() method to turn on a view (UI displaying) for the component
    // UI contents (JSX) are added to the return statement of render()
    render() {

        // dishes are no longer imported from the state of the Menu component, but from its props (received from the App component - see App.js)
        const menu = this.props.dishes.map((dish) => {  // a mapper that returns a JSX element (bootstrap-based) for each element of the DISHES
            return (
                // Each item of a list in React requires a key attribute with a unique id to help with rendering each element in the UI and differentiating them when updating a page! 
                /* Bootstrap syntax: 
                - extra small to small screen sizes: 1 card below the other 
                - medium to extra large screens: place cards side by side with each card taking 5 cols in a row
                - margins of 1 unit on all sides of the div container for the cards
                */

                // event handler function doesn't need to be declared with an arrow function if there are no args to be passed:
                // onClick={this.cleanDishes}
                // If we  do pass args to the event hanlder, the syntax has to be an arrow function: () => handler(args)
                // onClick={() => this.onDishSelect(dish)}
                <div key={dish.id} className="col-12 col-md-5 m-1">
                    <Card onClick={() => this.onDishSelect(dish)}>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardImgOverlay body className="ml-5">
                            <CardTitle tag="h5">{dish.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>

                </div>
            )
        });

        return (
            // the second row-container gets rendered with a custom method renderDish that creates a Card with a dish inforamtion received from the state of the Menu component. The state-attribute selectedDish gets filled when the onClick event takes place for one of the cards of the menu.
            <div className='container'>
                <div className='row'>
                    {menu}
                </div>
                <DishDetail selectedDish={this.state.selectedDish}/>
            </div>
        );
    }
}

export default Menu;  // Component must be exported from the script to make it available for import in the app