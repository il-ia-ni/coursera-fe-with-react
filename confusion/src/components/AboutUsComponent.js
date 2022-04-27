import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, CardImg, CardText, CardTitle, CardSubtitle } from 'reactstrap';
import { Link } from 'react-router-dom';

function AboutUs(props) {
    /* Functional component to render Bootstrap Breadcrump structure, all contents of the About Us view of the SPA in a Bootstrap formatting as well as Bootsrap 5 Cards for each leader object based on leaders array received from props obj

    props:
        leaders: an array of leader objects with data on each leader
    */

    const rendered_leaders = props.leaders.map((leader) => {

        // ??? Should the key-PROP be assigned to divs or Card is also okay? @ https://stackoverflow.com/questions/28329382/understanding-unique-keys-for-array-children-in-react-js
        return (
            <RenderLeader leader={leader} />
        );
    });

    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>About Us</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>About Us</h3>
                    <hr />
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12 col-md-6">
                    <h2>Our History</h2>
                    <p>Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.</p>
                    <p>The restaurant traces its humble beginnings to <em>The Frying Pan</em>, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.</p>
                </div>
                <div className="col-12 col-md-4">
                    <Card>
                        <CardHeader className="bg-primary text-white">Facts At a Glance</CardHeader>
                        <CardBody>
                            <dl className="row p-1">
                                <dt className="col-6">Started</dt>
                                <dd className="col-6">3 Feb. 2013</dd>
                                <dt className="col-6">Major Stake Holder</dt>
                                <dd className="col-6">HK Fine Foods Inc.</dd>
                                <dt className="col-6">Last Year's Turnover</dt>
                                <dd className="col-6">$1,250,375</dd>
                                <dt className="col-6">Employees</dt>
                                <dd className="col-6">40</dd>
                            </dl>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-12">
                    <Card>
                        <CardBody className="bg-faded">
                            <blockquote className="blockquote">
                                <p className="mb-10">You better cut the pizza in four pieces because
                                    I'm not hungry enough to eat six.</p>
                                <footer className="blockquote-footer">
                                    Yogi Berra,
                                    <cite title="Source Title"> The Wit and Wisdom of Yogi Berra,
                                        P. Pepe, Diversion Books, 2014</cite>
                                </footer>
                            </blockquote>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12">
                    <h2>Corporate Leadership</h2>
                </div>
                <div className="col-12">
                    <div className='row'>
                        {rendered_leaders}
                    </div>
                </div>
            </div>
        </div>
    );
}

function RenderLeader({ leader }) {
    /* A functional component to render a Bootstrap 5 Card for a leader object 
    props: 
       leader: object 
    */

    // Media has been removed from Bootstrap 5. A possible alternative to Media are Cards with horizontal layout. See @ https://getbootstrap.com/docs/5.0/components/card/#horizontal
    // ReactStrap V9 styling of Cards is found @ https://reactstrap.github.io/?path=/docs/components-card--card 
    return (
        <Card body key={leader.id}>
            <div className='row g-0'>
                <div className='col-md-2'>
                    <CardImg className='img-fluid rounded-start' src={leader.image} alt={leader.name} />
                </div>
                <div className='col-md-10'>
                    <CardBody>
                        <CardTitle tag="h5">{leader.name}</CardTitle>
                        <CardSubtitle
                            className="mb-2 text-muted"
                            tag="h6">{leader.designation} ({leader.abbr})</CardSubtitle>
                        <CardText>{leader.description}</CardText>
                    </CardBody>
                </div>
            </div>
        </Card>
    );
}

export default AboutUs;    