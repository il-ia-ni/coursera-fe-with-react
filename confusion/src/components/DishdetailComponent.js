import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, List, Breadcrumb, BreadcrumbItem, Modal, Button, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

// Validation functions Area for React-Redux-Form validation 
const requiredHasValue = (val) => val && val.length;
const isMaxLength = (len) => (val) => !(val) || (val.length <= len);
const isMinLength = (len) => (val) => (val) && (val.length >= len);

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
                <div className='col-12 row'>
                    <RenderDish dish={props.selectedDish} />
                    <div className="col-12 col-md-7">
                        <RenderComments comments={props.comments} />
                        <CommentForm />
                    </div>
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
        <div className="col-12 col-md-4 m-1">
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
            <div className="col-12 col-md-6 m-1">
                <h4>Comments</h4>
                <List type="unstyled">
                    {rendered_comments}
                </List>
            </div>
        );
    }

    else {
        return (
            <div className="col-12 col-md-6 m-1">
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

class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLocalFormSubmit = this.handleLocalFormSubmit.bind(this)
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleLocalFormSubmit(values) {
        this.toggleModal();
        alert("Submitting the following comment: " + JSON.stringify(values));
    }

    /* For the React-Redux-Form <Control.select> an <option selected> item is not added to the model unless reselected by user! To set a deafult selected value for a dropdown, an attr --defaultValue='str'-- hast to be set for the <Control.select> itself! Found @ https://github.com/davidkpiano/react-redux-form/issues/458 */

    render() {
        return (
            <React.Fragment>
                <Button outline onClick={this.toggleModal} color="btn btn-secondary">
                    <span className="fa fa-pencil"> Submit Comment</span>
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Submit Your Commentary
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleLocalFormSubmit(values)}>
                            <Row className="input-group mb-3 ml-3">
                                <Label htmlFor="commentRating">Rating</Label>
                                <Control.select
                                    className='form-select'
                                    model='.commentRating'
                                    name='commentRating'
                                    defaultValue='5'
                                >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option selected='true'>5</option>
                                </Control.select>
                            </Row>
                            <Row className="input-group mb-3 ml-3">
                                <Label htmlFor="clientName">Your Name</Label>
                                <Control.text
                                    className='form-control'
                                    model='.clientName'
                                    id='clientName'
                                    name='clientName'
                                    placeholder='Your Name'
                                    validators={{
                                        requiredHasValue,
                                        isMaxLength: isMaxLength(15),
                                        isMinLength: isMinLength(3)
                                    }}
                                />
                                <Errors
                                    className='text-danger'
                                    model='.clientName'
                                    show={{ touched: true, focus: false }}
                                    messages={{
                                        requiredHasValue: 'Please give in your full name! ',
                                        isMaxLength: 'The name cannot have more than 15 characters! ',
                                        isMinLength: 'The name must be at least 3 characters long! '
                                    }}
                                />
                            </Row>
                            <Row className="input-group mb-3 ml-3">
                                <Label htmlFor="commentText">Your Commentary</Label>
                                <Control.textarea
                                    className='form-control'
                                    model='.commentText'
                                    id='commentText'
                                    name='commentText'
                                    rows='6'
                                />
                            </Row>
                            <Button type="submit" value="submit" color="primary">Sumbit the comment</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>

        )
    }
}

export default DishDetail