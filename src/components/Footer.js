import React from 'react';

function Footer(props) {
    const date = new Date().getFullYear();
    return (
        <div className='bg-violet-500 text-center py-8'>
            <div className='container mx-auto '>
                Copyright &copy; {date}. All rights reserved.
            </div>
        </div>
    );
}

export default Footer;