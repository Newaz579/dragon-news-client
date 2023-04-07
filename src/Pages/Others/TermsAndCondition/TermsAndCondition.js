import React from 'react';
import { Link } from 'react-router-dom';

const TermsAndCondition = () => {
    return (
        <div>
            <h3>Here is our terms and condition.</h3>
            <p>Go back to <Link to='/register'>register</Link></p>
        </div>
    );
};

export default TermsAndCondition;