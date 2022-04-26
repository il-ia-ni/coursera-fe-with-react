import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, List, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

const DishDetail = (props) => {
    /* Functional component for rendering contents for a selected dish from a menu
       renders a Bootstrap Breadcrumb structure up to a dish selected
       renders a Reactstrap Card for a selected menu item using a func component RenderDish
       renders a div container with an Reactstrap unstyled list of comments for a selected menu item using a func component RenderDish
    props: 
        {selectedDish: object || none}
        {comments: object }
    returns: 
        if selectedDish is an object: a rendered div-container containing the rendered information for the selected menu item
        if selectedDish is none: an empty div-container */

    if (props.selectedDish) {
        return (
            <div className='container'>
                <div className='row'>
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to='/home'>Home</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <Link to='/menu'>Menu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            {props.selectedDish.name}
                        </BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className='col-12'>
                    <h3>{props.selectedDish.name}</h3>
                    <hr />
                </div>
                <div className='row'>
                    <RenderDish dish={props.selectedDish} />
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        );
    }

    else {
        return (
            <div />
        );
    }
}

function RenderDish({ dish }) {
    /* renders and returns a div container with a Reactstrap Card for a selected menu item 
        props: { dish: object } */

    return (
        <div className="col-12 col-md-5 m-1">
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle tag="h5">{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}

function RenderComments({ comments }) {
    /* renders a list item with a comment data for each object in the array of comments for a selected menu item
    renders and returns a div container with a Reactstrap unstyled List of rendered comments for the selected menu item 
        props: { comments: array } */

    function _formatDate(string) {
        /* A helper function to format a datetime str and return a new str
        Is used due to no support of objects in React (Date objects are not accepted)
        Found here: @ https://stackoverflow.com/questions/50430968/converting-string-date-in-react-javascript 
        Formatting ideas found @ https://stackoverflow.com/questions/3552461/how-do-i-format-a-date-in-javascript
        */
        var options = { month: 'short', day: 'numeric', year: 'numeric' };
        return new Date(string).toLocaleDateString("en-US", options);
    }

    if (comments.length > 0) {

        const rendered_comments = comments.map((comment) => {

            return (
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author}, {_formatDate(comment.date)}</p>
                </li>
            )
        });

        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <List type="unstyled">
                    {rendered_comments}
                </List>
            </div>
        );
    }

    else {
        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <List type="unstyled">
                    <li key="0">
                        <p>No comments yet!</p>
                    </li>
                </List>
            </div>
        );
    }
}

export default DishDetail