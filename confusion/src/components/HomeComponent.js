import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { FadeTransform } from 'react-animation-components';  // applies fading and transformation to components enclosed in it

import LoadingSpinner from "./LoadingComponent";
import { baseUrl } from '../shared/BaseURL';

function RenderCard({ isLoading, errorMssg, item }) {
    /* A helper functional component used in the Home component for a conditional rendering of a card for an object */

    // New versions of ReactStrap no longer have bold card titles and require replacing a standard HTML-tag behind the Cards components to change their appearance through the TAG-prop. 

    // {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null } is a mixture of a plain JS code (short if-form COND==bool ? if COND True : if COND False) within the JSX: item.designation exists only for a leader instance and is only then rendered, when it exists.

    if (isLoading) {  // if object's reducer received the action obj_LOADING and obj state has isLoading: true
        return (
            <LoadingSpinner />
        );
    }

    else if (errorMssg != null) {  // if object's reducer received the action obj_LOADING_FAILED and obj state has errorMssg  not null
        return (
            <h4>{errorMssg}</h4>
        );
    }

    else  // if object's reducer could fetch the data and the filter of the action ADD_obj returned an instance of the obj
        return (
            // exitTransform value means the components inside of the FadeTransform initially appear out of screen
            <FadeTransform in transformProps={
                {
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }
            }>
                <Card>
                    <CardImg src={baseUrl + item.image} alt={item.name} />
                    <CardBody>
                        <CardTitle tag="h4">{item.name}</CardTitle>
                        {item.designation ? <CardSubtitle tag="b">{item.designation}</CardSubtitle> : null}
                        <CardText>{item.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        );
}

function Home(props) {
    // Props dishesLoading, dishesLoadingFailed, dish, promotion and leader are assigned to the Home in the Main component's render()

    return (
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m-1 mb-5">
                    <RenderCard
                        isLoading={props.dishesLoading}
                        errorMssg={props.dishesLoadingFailed}
                        item={props.dish} />
                </div>
                <div className="col-12 col-md m-1 mb-5">
                    <RenderCard
                        isLoading={props.promosLoading}
                        errorMssg={props.promosLoadingFailed}
                        item={props.promotion} />
                </div>
                <div className="col-12 col-md m-1 mb-5">
                    <RenderCard
                        isLoading={props.leadersLoading}
                        errorMssg={props.leadersLoadingFailed}
                        item={props.leader} />
                </div>
            </div>
        </div>
    );
}

export default Home;