import React from 'react'; 
import { TabMenu } from 'primereact/tabmenu';
                          // icons


const ToolbarManager=()=>{
    const items = [   
        {label: 'כתבי יד'},
        {label: 'ספרים'},
        {label: 'העלאות'},
        {label: 'אישורים'},
        {label: "                        "},
        {label: 'דף הבית',  icon: "pi pi-home"},
        {label: 'ניהול משתמשים', icon: "pi pi-users"},
        {icon:'pi pi-fw pi-user', label: 'התחברות'}    
    ];

    return (
        <div className="card" >
            <TabMenu model={items} />
        </div>
    )
}

export default ToolbarManager