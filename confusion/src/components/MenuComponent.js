import React, { Component } from 'react';
import { Media } from 'reactstrap';

class Menu extends Component {

    // every component in React must have a constructor
    constructor(params) {
        super(params);  // the received by Menu-cls contructor params are passed over to the super cls (component)

        // a state stores data related to the React component
        this.state = {  // an array of properties. Each prop of the state can then be then addressed as this.state.PROPNAME
            dishes: [  // The dishes-prop contains JS objects with unique IDs and other data
                {
                    id: 0,
                    name: 'Uthappizza',
                    image: 'assets/images/uthappizza.png',  // relative path to the images folder in public/assets/images folder
                    category: 'mains',
                    label: 'Hot',
                    price: '4.99',
                    description: 'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.'
                },
                {
                    id: 1,
                    name: 'Zucchipakoda',
                    image: 'assets/images/zucchipakoda.png',
                    category: 'appetizer',
                    label: '',
                    price: '1.99',
                    description: 'Deep fried Zucchini coated with mildly spiced Chickpea flour batter accompanied with a sweet-tangy tamarind sauce'
                },
                {
                    id: 2,
                    name: 'Vadonut',
                    image: 'assets/images/vadonut.png',
                    category: 'appetizer',
                    label: 'New',
                    price: '1.99',
                    description: 'A quintessential ConFusion experience, is it a vada or is it a donut?'
                },
                {
                    id: 3,
                    name: 'ElaiCheese Cake',
                    image: 'assets/images/elaicheesecake.png',
                    category: 'dessert',
                    label: '',
                    price: '2.99',
                    description: 'A delectable, semi-sweet New York Style Cheese Cake, with Graham cracker crust and spiced with Indian cardamoms'
                }
            ],
        };

    }

    // every component in React must have render() method to turn on a view (UI displaying) for the component
    // UI contents (JSX) are added to the return statement of render()
    render() {

        const menu = this.state.dishes.map((dish) => {  // a mapper that returns a JSX element (bootstrap-based) for each element of the dishes-prop from the array of the state of the component
            return (
                // Each item of a list in React requires a key attribute with a unique id to help with rendering each element in the UI and differentiating them when updating a page! 
                // Bootstrap syntax: 12 cols with marg-top of 5 units. 
                <div key={dish.id} className="col-12 mt-5">
                    <Media tag="li">
                        <Media left middle>
                            <Media object src={dish.image} alt={dish.name} />
                        </Media>
                        <Media body className="ml-5">
                            <Media heading>{dish.name}</Media>
                            <p>{dish.description}</p>
                        </Media>
                    </Media>

                </div>
            )
        });

        return (
            <div className='container'>
                <div className='row'>
                    <Media list>
                        {menu}
                    </Media>
                </div>
            </div>
        );
    }
}

/* function Menu() {
    return (
        <div className="Menu">

        </div>
    );
} */

export default Menu;  // Component must be exported from the script to make it available for import in the app