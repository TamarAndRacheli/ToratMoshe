import React, { useState, useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { AutoComplete } from "primereact/autocomplete";
import { Tree } from 'primereact/tree';
import { NodeService } from '../Services/NodeService';

import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';                                 // icons
import 'primeflex/primeflex.css';                                   // css utility


const NavigationTree=()=>{

//חיפוש
    const [value, setValue] = useState('');
    const [items, setItems] = useState([]);

    const search = (event) => {
        setItems([...Array(10).keys()].map(item => event.query + '-' + item));
    }

//עץ ניווט
//https://primereact.org/tree/      the last
const [nodes, setNodes] = useState([]);
    
useEffect(() => {
    NodeService.getTreeNodes().then((data) => setNodes(data));
}, []);


    return (
        <>
            <Toast ref={null} />
            <div className="card flex justify-content-center">
                <br></br><br></br><br></br>          
                <Tree value={nodes} filter filterMode="strict" filterPlaceholder="Strict Filter" className="w-full md:w-30rem" />
            </div>
        </>
    )
}
export default NavigationTree


   
