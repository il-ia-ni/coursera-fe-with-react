import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';

// METHOD 2 to declare a functional compinent: as a const for an ES-6 arrow function with props obj as args
const Menu = (props) => {
    /* maps menu items from an array of objects  
       renders each menu item using a func component RenderMenuItem
    props: 
        {dishes: array, onClickProp: function}
    returns: 
        a rendered div-container containing Cards of menu items */

    // this-keyword before props is no longer needed! Functional components are not classes!
    const menu = props.dishes.map((dish) => {  
        return (
            <div key={dish.id} className="col-12 col-md-5 m-1">
                <RenderMenuItem dish_obj={dish} onClick_handler={props.onClickProp} />
            </div>
        )
    });

    return (
        <div className='container'>
            <div className='row'>
                {menu}
            </div>
        </div>
    );
}

// METHOD 1 to declare a functional component: as a simple JS-function
// a functional component with a props-object arg explicitly declared. Alternatively we can replace the explicit params object {dish_obj, onClick_handler} with a keyword PROPS. The functional component would implicitly receive all the props assigned to it in other components of the app.
function RenderMenuItem({ dish_obj, onClick_handler }) {
    /* renders and returns a Reactstrap Card for a menu item 
    props: { dish_obj: object, onClick_handler: function } */

    // this,props before onClick_handler is no longer needed! Functional components are not classes!
    return (
        <Card
            onClick={() => onClick_handler(dish_obj.id)}>
            <CardImg width="100%" src={dish_obj.image} alt={dish_obj.name} />
            <CardImgOverlay body className="ml-5">
                <CardTitle tag="h5">{dish_obj.name}</CardTitle>
            </CardImgOverlay>
        </Card>
    );
}

export default Menu;