import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, List } from 'reactstrap';

class DishDetail extends Component {

    // a custom method to render a card with a detailed information of a selected dish from the menu
    renderDish(dish) {
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
    };

    renderComments(comments) {

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

    };

    render() {

        if (this.props.selectedDish) {
            return (
                <div className='container'>
                    <div className='row'>
                        {this.renderDish(this.props.selectedDish)}
                        {this.renderComments(this.props.selectedDish.comments)}
                    </div>
                </div>
            );
        }

        else {
            return (
                <div />
            );
        }


    };
}

export default DishDetail