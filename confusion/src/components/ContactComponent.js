import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col, FormFeedback } from 'reactstrap';
import { Link } from 'react-router-dom'

class Contact extends Component {
    /* Class component to render Bootstrap Breadcrump structure and all contents of the Contact Us view in a Bootstrap formatting 
    Changed from a func component in M3 in order to control forms data in the state of the component */

    // Validation should only be executed for the forms modified by user, that's why a bool-operation object TOUCHED is introduced in the component's state.

    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            phone: '',
            email: '',
            isAgreed: false,
            prefContact: 'Tel.',
            message: '',
            touched: {
                firstname: false,
                lastname: false,
                phone: false,
                email: false
            }
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
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

    handleBlur = (field) => (evt) => {
        /* Handler function for the OnBlur event that is invoked for any Input component ("field") whenever anything gets changed in ut by user 
        params: 
            field: a string with a name of the field as set in the state of the component 
        */
        this.setState({
            touched: { ...this.state.touched, [field]: true } // Crumbread means: Whatever current state is / whichever input was modified, modify only a particular field in it
        });
    }

    validate_inputs(firstname, lastname, phone, email) {
        /* The function validating the values of the "blured" inputs (touched by user)
        Receives current input values of 4 attr in the state of the component
        Is called in the render() Method of the component since the form is getting rerendered anytime a user enters a new symbol into any input 
        Is also used to set true / false for VALID and INVALID attributes of each imput based on if the error message is empty or not*/

        const error_messages = {
            firstname: '',
            lastname: '',
            phone: '',
            email: '',
        };

        const name_re = /^[a-z]+$/i;
        // RegEx in JS: https://developer.mozilla.org/de/docs/Web/JavaScript/Guide/Regular_Expressions
        // "i" is the case-insensitive flag, there's no need for the extra character range A-Z. See @ https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions

        const phone_re = /^\d+$/;
        // RegEx for only numbers are allowed. "/^"" is a Circumflex-symbol for the start of the input !== "[^...]". In square brackets "^" means negation of the pattern!


        /* VALIDATION OF FIRST AND LAST NAMES */
        
        if (this.state.touched.firstname && name_re.test(firstname)) {
            if (this.state.touched.firstname && firstname.length < 3) {
                error_messages.firstname = "First Name must be at least 3 characters long!";
            }
            else if (this.state.touched.firstname && firstname.length > 10) {
                error_messages.firstname = "First Name must be shorter than 10 characters!";
            }

        }
        else if (this.state.touched.firstname && this.state.firstname !== "") {
            error_messages.firstname = "First Name can only contain letters!";
        }

        if (this.state.touched.lastname && name_re.test(lastname)) {
            if (this.state.touched.lastname && lastname.length < 2) {
                error_messages.lastname = "Last Name must be at least 2 characters long!";
            }
            else if (this.state.touched.lastname && lastname.length > 20) {
                error_messages.lastname = "Last Name must be shorter than 20 characters!";
            }
        }
        else if (this.state.touched.lastname && this.state.lastname !== "") {
            error_messages.lastname = "Last Name can only contain letters!";
        }


        /* VALIDATION OF TELEPHONE */

        if (this.state.touched.phone && !phone_re.test(phone)) {
            error_messages.phone = "Telephone can only contain numbers!";
        }


        /* VALIDATION OF E-MAIL */

        if (this.state.touched.email) {
            if (email.split('').filter(x => x === '@').length !== 1) {
                error_messages.email = "E-Mail must contain one @ symbol!";
            }
            else if (email.split('').filter(x => x === '.').length < 1) {
                error_messages.email = "E-Mail must contain at least one . symbol!";
            }
        }

        return error_messages;
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

        const errors_data = this.validate_inputs(this.state.firstname, this.state.lastname, this.state.phone, this.state.email);
        // The component function is called in the render() since the form is getting rerendered anytime a user enters a new symbol into any input. It recieves the current values of all 4 inputs from the component state as params
        // errors_data will contain the error strings for any input with a failed validation and is displayed a corresponding error message in the FormFeedback Reactstrap components (are displyed under the input field). 
        // It is also used to set values of VALID and INVALID attrs for each input based on if the err message is empty or not

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
                                            onChange={this.handleInputChange}
                                            onBlur={this.handleBlur('firstname')}
                                            valid={errors_data.firstname === ''}
                                            invalid={errors_data.firstname !== ''} />
                                        <FormFeedback>{errors_data.firstname}</FormFeedback>
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
                                            onChange={this.handleInputChange}
                                            onBlur={this.handleBlur('lastname')}
                                            valid={errors_data.lastname === ''}
                                            invalid={errors_data.lastname !== ''} />
                                        <FormFeedback>{errors_data.lastname}</FormFeedback>
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
                                            onChange={this.handleInputChange}
                                            onBlur={this.handleBlur('phone')}
                                            valid={errors_data.phone === ''}
                                            invalid={errors_data.phone !== ''} />
                                        <FormFeedback>{errors_data.phone}</FormFeedback>
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
                                            onChange={this.handleInputChange}
                                            onBlur={this.handleBlur('email')}
                                            valid={errors_data.email === ''}
                                            invalid={errors_data.email !== ''} />
                                        <FormFeedback>{errors_data.email}</FormFeedback>
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
