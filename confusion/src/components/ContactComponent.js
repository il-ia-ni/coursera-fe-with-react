import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import { Link } from 'react-router-dom'

class Contact extends Component {
    /* Class component to render Bootstrap Breadcrump structure and all contents of the Contact Us view in a Bootstrap formatting 
    Changed from a func component in M3 in order to control forms data in the state of the component */

    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            phone: '',
            email: '',
            isAgreed: false,
            prefContact: 'Tel.',
            message: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    // .bind() is a built in Method for class components to pass data to the functions of a class. Takes THIS + an object of any other data as args. An alternative to pass a function as a value of JAX elements props without using an arrow function. See @ https://www.geeksforgeeks.org/reactjs-bind-method/

    handleInputChange(event) {
        /* 
        A static handler method binded to the data of the Contact component and used to tie props of the state of Contact component with values of corresponding Inputs of the Form over the names of the inputs (implemented over onChange attr of Input components)
        props: 
            event: React onChange event object called by a target (JSX component) 
        */

        // console.log(event)
        // console.log(event.target)

        let targetInput = event.target  // e.target returns a JSX component with its current attrs at the moment of the event e taking place. Cannot be set as a value of a CONST!

        const inputValue = (targetInput.type === 'checkbox') ? targetInput.checked : targetInput.value;  // if the target input is checkbox set a bool value from .checked method, otherwise a str value from .value method

        const inputName = targetInput.name; // get a defined name of the Input. In the project the names of the inputs are matched to the props of the state object of the Contact component

        this.setState({
            [inputName]: inputValue
        });

        // console.log(JSON.stringify(this.state))  // ??? Why is this line showing a prev value of the state object inspite of .setState?
    }

    handleSubmit(event) {
        /* 
        A handler method binded to the data of the Contact component to process the onSubmit events called in Form Components 
        props: 
            event: React onSubmit event object called by a target (JSX component) 
        */
        console.log("Current submitted State of the Form is: " + JSON.stringify(this.state))
        alert("Current submitted State of the Form is: " + JSON.stringify(this.state))
        event.preventDefault();  // deactivate reloading the page on submit of the form
    }

    render() {

        /* React Forms @ https://reactjs.org/docs/forms.html ...
        Reactstrap forms: @ https://reactstrap.github.io/?path=/docs/components-forms--input 
        
        FormGroup ROW Bootstrap component is uniting elements of a form into one row. 
        
        Label Bootstrap component gets tied to a Form over an html attr FOR=form_name. In JSX however a Reactstrap Label component attr htmlFor has to be used! FOR in JSX is detected as JS for
        
        Col Bootstrap component is like a div container for a form
        
        VALUE attr of the Input component linked to the state of the class component creates controlling over the form's input's value: the value of a state attr and of the input are synced! Tiying the input as the value of the state attr is done using a handler function: handleInputChange
        
        ONCHANGE attr is processing sync between values of components and of props of the state of the Contact component by passing a React (not Reactstrap!) event object OnChange to the handler method handleInputChange
        */

        return (
            <div className="container">
                <div className='row'>
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to='/home'>Home</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            Contact Us
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className='col-12'>
                        <h3>Contact Us</h3>
                        <hr />
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                        <h5>Our Address</h5>
                        <address>
                            121, Clear Water Bay Road<br />
                            Clear Water Bay, Kowloon<br />
                            HONG KONG<br />
                            <i className="fa fa-phone"></i>: +852 1234 5678<br />
                            <i className="fa fa-fax"></i>: +852 8765 4321<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                        </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>
                <div className='row row-content'>
                    <div className='col-12'>
                        <h3 className='mb-5'>Send us Your Feedback</h3>
                        <div className='col-12 col-md-9'>
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup row>
                                    <Label htmlFor='firstname' md={2}>First Name</Label>
                                    <Col md={10}>
                                        <Input type='text'
                                            id='firstname'
                                            name='firstname'
                                            placeholder='First Name'
                                            value={this.state.firstname}
                                            onChange={this.handleInputChange} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor='lastname' md={2}>Last Name</Label>
                                    <Col md={10}>
                                        <Input type='text'
                                            id='lastname'
                                            name='lastname'
                                            placeholder='Last Name'
                                            value={this.state.lastname}
                                            onChange={this.handleInputChange} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor='phone' md={2}>Phone</Label>
                                    <Col md={10}>
                                        <Input type='text'
                                            id='phone'
                                            name='phone'
                                            placeholder='Phone Number'
                                            value={this.state.phone}
                                            onChange={this.handleInputChange} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor='email' md={2}>E-Mail</Label>
                                    <Col md={10}>
                                        <Input type='text'
                                            id='email'
                                            name='email'
                                            placeholder='E-Mail Address'
                                            value={this.state.email}
                                            onChange={this.handleInputChange} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md={{ size: 6, offset: 2 }}>
                                        <FormGroup check>
                                            <Label check>
                                                <Input
                                                    type='checkbox'
                                                    name='isAgreed'
                                                    checked={this.state.isAgreed}
                                                    onChange={this.handleInputChange} />
                                                {' '}
                                                <strong>Would you like us to contact you?</strong>
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                    <Col md={{ size: 3, offset: 1 }}>
                                        <Input
                                            type='select'
                                            name='prefContact'
                                            value={this.state.prefContact}
                                            onChange={this.handleInputChange} >
                                            <option>Telephone</option>
                                            <option>E-Mail</option>
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor='message' md={2}>Your feedback message</Label>
                                    <Col md={10}>
                                        <Input type='textarea'
                                            id='message'
                                            name='message'
                                            rows='12'
                                            value={this.state.message}
                                            onChange={this.handleInputChange} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md={{ size: 10, offset: 2 }}>
                                        <Button type='submit' color='primary'>Send feedback</Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Contact;
