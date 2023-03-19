import React from 'react'; 
import { MegaMenu } from 'primereact/megamenu';
import { InputText } from 'primereact/inputtext';
import {useNavigate} from "react-router-dom"


const Toolbar=()=>{
    const navigate = useNavigate();
    
    const items = [  
        {label: 'צור קשר',  icon: "pi pi-envelope"},
        {label: 'התחברות',  icon:'pi pi-fw pi-user'},
        {label: 'דף הבית'},
        {label: 'כתבי יד'},
        {label: 'ספרים'}   
    ];

    const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;
    const end = <InputText placeholder="Search" type="text" />;

    // return (
    //     <div className="card">
    //         <TabMenu   model={[items, item1]} />
    //         
            
    //     </div>
    // )

    return (
        <div className="card">
            <MegaMenu model={items} orientation="horizontal" start={end} end={start} breakpoint="960px" />
            <button  onClick={()=>navigate("LogIn")}>logIn</button>
            <button  onClick={()=>navigate("Contact")}>Contact</button>
            <button  onClick={()=>navigate("Handwriting")}>Handwriting</button>
        </div>
    )
}

export default Toolbar



// 
// 
// <button }>click me</button>