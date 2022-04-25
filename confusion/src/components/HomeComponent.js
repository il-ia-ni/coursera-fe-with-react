import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

function RenderCard({ item }) {
    /* A helper functional component used in the Home component to render a card for an object */

    // New versions of ReactStrap ano longer have bold card titles and require replacing a standard HTML-tag behind the Cards components to change their appearance through the TAG-prop. 

    // {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null } is a mixture of a plain JS code (short if-form COND==bool ? if COND True : if COND False) within the JSX: item.designation exists only for a leader instance and is only then rendeered, when it exists.
    return (
        <Card>
            <CardImg src={item.image} alt={item.name} />
            <CardBody>
                <CardTitle tag="h4">{item.name}</CardTitle>
                {item.designation ? <CardSubtitle tag="b">{item.designation}</CardSubtitle> : null }
                <CardText>{item.description}</CardText>
            </CardBody>
        </Card>
    );
}

function Home(props) {

    // Props dish, promotion and leader are assigned to the Home in the Main component's render().
    return (
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.dish} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.promotion} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.leader} />
                </div>
            </div>
        </div>
    );
}

export default Home;