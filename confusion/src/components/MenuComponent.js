import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';

class Menu extends Component {

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

                // onClickProp prop has receied following value in MainComponent: {(dishID) => this.onDishSelect(dishID)}. This arrow function with a dish.id as arg is assgined as the handler for the onClick event attribute here
                <div key={dish.id} className="col-12 col-md-5 m-1">
                    <Card
                        onClick={() => this.props.onClickProp(dish.id)}>
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
            </div>
        );
    }
}

export default Menu;  // Component must be exported from the script to make it available for import in the app