import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { InputSwitch } from "primereact/inputswitch";


const Register=() =>{


    const [value, setValue] = useState('');
    const [checked, setChecked] = useState(false);


    return (
        <div id="register" className="card flex justify-content-center">
            <div className="flex flex-column gap-2">

            <InputText id="username" aria-describedby="username-help" /><br></br>
                <small id="username-help">
                    שם פרטי
                </small><br></br><br></br><br></br>
            <InputText id="username" aria-describedby="username-help" /><br></br>
                <small id="username-help">
                    שם משפחה
                </small><br></br><br></br><br></br>

            <InputText id="username" aria-describedby="username-help" /><br></br>
                <small id="username-help">
                     כתובת האימייל
                </small><br></br><br></br><br></br>

            <Password value={value} onChange={(e) => setValue(e.target.value)} feedback={false} toggleMask/><br></br>
                <small id="username-help">
                   סיסמה
                </small><br></br><br></br><br></br>
            <Password value={value} onChange={(e) => setValue(e.target.value)} feedback={false} toggleMask/><br></br>
                <small id="username-help">
                    אימות סיסמה
                </small><br></br><br></br><br></br>
                <small id="username-help">
                             אני מאשר לקבל הודעות ועדכונים במייל       
                </small>
            <InputSwitch checked={checked} onChange={(e) => setChecked(e.value)} />
            <br></br><br></br>
            <Button label="הרשמה" text raised />

            </div>
        </div>
    )
}
export default Register;
   