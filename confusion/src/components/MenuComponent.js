import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

// METHOD 2 to declare a functional compinent: as a const for an ES-6 arrow function with props obj as args
const Menu = (props) => {
    /* maps menu items from an array of objects  
       renders each menu item using a func component RenderMenuItem
    props: 
        {dishes: array }
    returns: 
        a rendered div-container containing Cards of menu items */

    // this-keyword before props is no longer needed! Functional components are not classes!
    const menu = props.dishes.map((dish) => {
        return (
            <div key={dish.id} className="col-12 col-md-5 m-1">
                <RenderMenuItem dish_obj={dish} />
            </div>
        )
    });

    return (
        <div className='container'>
            <div className='row'>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to='/home'>Home</Link>
                    </BreadcrumbItem>     
                    <BreadcrumbItem active>
                        Menu    
                    </BreadcrumbItem>   
                </Breadcrumb>
            </div>
            <div className='col-12'>
                <h3>Menu</h3>
                <hr />
            </div>
            <div className='row'>
                {menu}
            </div>
        </div>
    );
}

// METHOD 1 to declare a functional component: as a simple JS-function
// a functional component with a props-object arg explicitly declared. Alternatively we can replace the explicit params object {dish_obj} with a keyword PROPS. The functional component would implicitly receive all the props assigned to it in other components of the app.
function RenderMenuItem({ dish_obj }) {
    /* renders and returns a Reactstrap Card for a menu item 
    props: { dish_obj: object } */

    // a functional expression `str ${var} str` must always be written in backslashe! This way all rendered Card components get their Link component customized dynamically based on an id of the prop dish_obj
    return (
        <Card>
            <Link to={`/menu/${dish_obj.id}`}>
                <CardImg width="100%" src={dish_obj.image} alt={dish_obj.name} />
                <CardImgOverlay body className="ml-5">
                    <CardTitle tag="h5">{dish_obj.name}</CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>
    );
}

export default Menu;