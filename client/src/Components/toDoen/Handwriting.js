import React, { useState } from "react";
import { AutoComplete } from "primereact/autocomplete";


const Handwriting=()=>{
    const [value, setValue] = useState('');
    const [items, setItems] = useState([]);

    const search = (event) => {
        setItems([...Array(10).keys()].map(item => event.query + '-' + item));
    }
    return(
        <>
  
        <div className="card flex justify-content-center">
            <h1>image</h1><br>hhhh</br>
            <h1>timlool</h1>
            <AutoComplete value={value} suggestions={items} completeMethod={search} onChange={(e) => setValue(e.value)} forceSelection />
        </div>
        </>
    )
}

export default Handwriting