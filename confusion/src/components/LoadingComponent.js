import React from 'react';

function LoadingSpinner() {
    /* A functional React component to display a forward-rotating loading spinner at a x3 speed using FontAwesome */

    return(
        <div className='col-12'>
            <span className='fa fa-spinner fa-pulse fa-fw fa-3x text-primary' />
            <p>Loading...</p>
        </div>
    )
};

export default LoadingSpinner;