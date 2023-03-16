import React from 'react';
import { BreadCrumb } from 'primereact/breadcrumb';



const Navigation=()=>{

        const items = [{ label: 'Computer' }, { label: 'Notebook' }, { label: 'Accessories' }, { label: 'Backpacks' }, { label: 'Item' }];
        const home = { icon: 'pi pi-home', url: 'https:///primereact' }
    
        return (
            <BreadCrumb model={items} home={home} />
        )
}

export default Navigation