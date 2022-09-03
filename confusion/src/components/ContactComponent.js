import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Label, Col, Row } from 'reactstrap';  /* Form, FormGroup, Input, FormFeedback components are no longer needed due to switch to the Reacr-Redux-Form. Therefore: 
- Input with type-attr are replaced with the --Control.[type] model=".idname"-- component of React-Redux-Form (see @ https://davidkpiano.github.io/react-redux-form/docs/api/Control.html) with applied bootstrap 5-styling classes "form-control", "form-check-input" or "form-select" (see @ https://getbootstrap.com/docs/5.0/forms/overview/ )
    model=".idname" attr of Control adds a value of an input into the LocalForm model in the Redux Store (see handleSubmit())
    Input attrs -value-, -onChange-, -onBlur-, -valid- and -invalid- (as well as -check- for check-inputs) are also no longer used directly and are controlled by React-Redux-Form
- FormGroup is replaced with the Row components of reactstrap with react classes 'input-group mb-3' ('form-group' cls from the course is removed in Bootstrap 5) OR with div containers with bootstrap-class 'form-check'
- FormFeedback is replaced with React-Redux validation */
import { Link } from 'react-router-dom';
import { Control, Form, Errors } from 'react-redux-form';  // Form component of React-Redux-Form lets inputs data be stored in the Redux Store for the form persistance until reset

/* 
Validation Functions Area for React-Redux-Form validation 
- validating functions are submitted inside of an object to the -validators-attr of a specific Control-component of the LocalForm and receive its value as their param (see @ https://davidkpiano.github.io/react-redux-form/docs/api/Control.html#prop-validators). If any validation was not successful, onSubmit-attr of the LocalForm is deactivated!
- they are are also defining if the Errors-component (see @ https://davidkpiano.github.io/react-redux-form/docs/api/Errors.html) is displayed for the (touched / modified by user) input with specified messages for each validator
- Control and Errors components are synced through the -model-attr connected to the Model in the Redux Store!
*/
const requiredHasValue = (val) => val && val.length;  // a simple function to prove if a required input has a value
const isMaxLength = (len) => (val) => !(val) || (val.length <= len);  // a function-in-function to check if the input value has no value (is '') or is smaller than the maximal allowed value "len"
const isMinLength = (len) => (val) => (val) && (val.length >= len);  // a function-in-function to check if the input value has a value (is not '') or is bigger than the minimal allowed value "len"
const isNumber = (val) => !isNaN(Number(val));  // a simple validation to prove if the value is numeric (can be converted to the Number type)
const mailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;  // see comments in ContactComponent_archive_controlled.js
const isValidEmail = (val) => mailRegex.test(val);  // a validation of a string to match the regex of an email address

class Contact extends Component {
    /* Class component to render Bootstrap Breadcrump structure and all contents of the Contact Us view in a Bootstrap formatting 
    Changed from a func component in M3 in order to control forms data in the state of the component */

    constructor(props) {
        super(props);
        // the states of the form inputs are no longer stored in the components constructor due to the switch to React-Redux-Form, wehre they are kept in the Model of the LocalForm
        // handleInputChange static method is also no longer needed, as React-Redux-Form manages the inputs
        // handelBlur method is also no longer needed, React-Redux-Form controls which inputs has been modified by user
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    // .bind() is a built in Method for class components to pass data to the functions of a class. Takes THIS + an object of any other data as args. An alternative to pass a function as a value of JAX elements props without using an arrow function. See @ https://www.geeksforgeeks.org/reactjs-bind-method/

    handleSubmit(values) {
        /* 
        An updated handler method binded to the LocalForm values stored the Redux store (eralier it was bound to the Contact components state, that stored all the form data)
        props: 
            values:  Control components values received from the React-Redux-Form LocalForm component. Values are stored in a MODEL under a specified input name (see -model='.name'-attr of each Control)
        */
        console.log("Current submitted State of the Form is: " + JSON.stringify(values))
        this.props.postFeedback(values.firstname, values.lastname, values.phone, values.email, values.isAgreed, values.prefContact, values.message)
        this.props.resetFeedbackForm();  // resets the Form to its initial state upon submit
    }

    // validate-inputs() method returning upon validation an errors object for the inputs valid- and invalid-attributes as well as for the FormFeedback component is also no longer needed, as React-Redux-Form has its own validation built-in

    render() {

        /* React Forms @ https://reactjs.org/docs/forms.html ...
        Reactstrap forms: @ https://reactstrap.github.io/?path=/docs/components-forms--input 
        
        FormGroup ROW Bootstrap component is uniting elements of a form into one row. 
        
        Label Bootstrap component gets tied to a Form over an html attr FOR=form_name. In JSX however a Reactstrap Label component attr htmlFor has to be used! FOR in JSX is detected as JS for
        
        Col Bootstrap component is like a div container for a form
        
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
                            <Form model='feedbackForm' onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="input-group mb-3">
                                    <Label htmlFor='firstname' md={2}>First Name</Label>
                                    <Col md={10}>
                                        <Control.text
                                            className='form-control'
                                            model='.firstname'
                                            id='firstname'
                                            name='firstname'
                                            placeholder='First Name'
                                            validators={{
                                                requiredHasValue,
                                                isMaxLength: isMaxLength(20),
                                                isMinLength: isMinLength(3)
                                            }}
                                        />
                                        <Errors
                                            className='text-danger'
                                            model='.firstname'
                                            show={(field) => field.touched && !field.focus}
                                            messages={{
                                                requiredHasValue: 'The field is required! Please enter the value. ',
                                                isMaxLength: "The value must not be longer than 20 characters! ",
                                                isMinLength: "The value must contain at least 3 characters! "
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="input-group mb-3">
                                    <Label htmlFor='lastname' md={2}>Last Name</Label>
                                    <Col md={10}>
                                        <Control.text
                                            className='form-control'
                                            model='.lastname'
                                            id='lastname'
                                            name='lastname'
                                            placeholder='Last Name'
                                            validators={{
                                                requiredHasValue,
                                                isMaxLength: isMaxLength(20),
                                                isMinLength: isMinLength(3)
                                            }}
                                        />
                                        <Errors
                                            className='text-danger'
                                            model='.lastname'
                                            show={{ touched: true, focus: false }}
                                            messages={{
                                                requiredHasValue: 'The field is required! Please enter the value. ',
                                                isMaxLength: "The value must not be longer than 20 characters! ",
                                                isMinLength: "The value must contain at least 3 characters! "
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="input-group mb-3">
                                    <Label htmlFor='phone' md={2}>Phone</Label>
                                    <Col md={10}>
                                        <Control.text
                                            className='form-control'
                                            model='.phone'
                                            id='phone'
                                            name='phone'
                                            placeholder='Phone Number'
                                            validators={{
                                                requiredHasValue,
                                                isNumber,
                                                isMaxLength: isMaxLength(18),
                                                isMinLength: isMinLength(10)
                                            }}
                                        />
                                        <Errors
                                            className='text-danger'
                                            model='.phone'
                                            show={{ touched: true, focus: false }}
                                            messages={{
                                                requiredHasValue: 'The field is required! Please enter the value. ',
                                                isNumber: "Only numbers are allowed! ",
                                                isMaxLength: "The value must not be longer than 18 characters! ",
                                                isMinLength: "The value must contain at least 10 characters! "
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="input-group mb-3">
                                    <Label htmlFor='email' md={2}>E-Mail</Label>
                                    <Col md={10}>
                                        <Control.text
                                            className='form-control'
                                            model='.email'
                                            id='email'
                                            name='email'
                                            placeholder='E-Mail Address'
                                            validators={{
                                                requiredHasValue,
                                                isValidEmail
                                            }}
                                        />
                                        <Errors
                                            className='text-danger'
                                            model='.email'
                                            show={{ touched: true, focus: false }}
                                            messages={{
                                                requiredHasValue: 'The field is required! Please enter the value. ',
                                                isValidEmail: (val) => `${val} is not a valid email address.`,
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="input-group mb-3">
                                    <Col md={{ size: 6, offset: 2 }}>
                                        <div className='form-check'>
                                            <Label check>
                                                <Control.checkbox
                                                    className='form-check-input'
                                                    model='.isAgreed'
                                                    name='isAgreed'
                                                />
                                                {' '}
                                                <strong>Would you like us to contact you?</strong>
                                            </Label>
                                        </div>
                                    </Col>
                                    <Col md={{ size: 3, offset: 1 }}>
                                        <Control.select
                                            className='form-select'
                                            model='.prefContact'
                                            name='prefContact'
                                            defaultValue='Telephone'
                                        >
                                            <option>Telephone</option>
                                            <option>E-Mail</option>
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className="input-group mb-3">
                                    <Label htmlFor='message' md={2}>Your feedback message</Label>
                                    <Col md={10}>
                                        <Control.textarea
                                            className='form-control'
                                            model='.message'
                                            id='message'
                                            name='message'
                                            rows='12'
                                        />
                                    </Col>
                                </Row>
                                <Row className="input-group mb-3">
                                    <Col md={{ size: 10, offset: 2 }}>
                                        <Button type='submit' color='primary'>Send feedback</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Contact;
