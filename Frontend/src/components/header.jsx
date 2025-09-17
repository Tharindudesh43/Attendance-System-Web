import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';

const header = () => {

    const [whichversion,setwhichversion] = useState(''); 
    const [role,setrole] = useState('');
    
    useEffect(() => {        
        const rolefind = localStorage.getItem('role');
        setrole(rolefind);
        setwhichversion(role);
       }, [role]);

    return (
        <div>
            <Navbar whichversion={whichversion}/>
        </div>
    );
};

export default header;