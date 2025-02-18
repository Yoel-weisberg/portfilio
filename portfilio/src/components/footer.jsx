"use client"

import { useState, useEffect } from 'react';

const Footer = () => {
    const [year, setYear] = useState('');
    
    useEffect(() => {
        setYear(new Date().getFullYear().toString());
    }, []);

    return (
        <footer>
            <p className="dark:text-white text-center m-8">
                © {year} Yoel Weisberg. All rights reserved.
            </p>
        </footer>
    );
}

export default Footer;