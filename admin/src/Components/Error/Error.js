import React from 'react'
import Logo from '../Logo/Logo';

function Error() {
    return (
        <>
            <div className='errorpage'>
                <Logo/>
                <h3>404 page not found</h3>
                <p>We are sorry but the page you are looking for does not exist.</p>
            </div>
        </>
  );
}

export default Error