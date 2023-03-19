import React, { useEffect, useState } from 'react';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from "react-router-dom"
import axios from 'axios';



// Optionally the request above could also be done as




const LogIn = () => {

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const handleEmailChange = (selected, key) => {
        setEmail((prev) => ({ ...prev, [key]: selected }));
        console.log(email);
    }
    const handlePassChange = (selected, key) => {
        setPassword((prev) => ({ ...prev, [key]: selected }));
        console.log(password);
    }

    const getUser = () => {
      
        console.log('emil', email, password);
        axios({
            method:'get',
            url:'http://localhost:8000/users/logIn',
            data: {
                email: email,
                password: password
            }
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }

    const navigate = useNavigate();
    // const [value, setValue] = useState('');

    return (
        <div className="card">
            <div className="flex flex-column md:flex-row">
                <div className="w-full md:w-5 flex flex-column align-items-s justify-content-center gap-3 py-5">
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label htmlFor="userEmail" className="w-6rem">
                            אימייל
                        </label>
                        <InputText onChange={(e) => setEmail(e.target.value)} id="userEmail" type="text" />
                    </div>
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label htmlFor="password" className="w-6rem">
                            סיסמה
                        </label>
                        <InputText onChange={(e) => setPassword(e.target.value)} id="password" type="password" />
                    </div>
                    <Button onClick={getUser} label="כניסה" icon="pi pi-user" className="w-10rem mx-auto"></Button>
                </div>
                <div className="w-full md:w-2">
                    <Divider layout="vertical" className="hidden md:flex">
                        <b>OR</b>
                    </Divider>
                    <Divider layout="horizontal" className="flex md:hidden" align="center">
                        <b>OR</b>
                    </Divider>
                </div>
                <div className="w-full md:w-5 flex align-items-center justify-content-center py-5">
                    <Button onClick={() => navigate("/Register")} label="הירשם" icon="pi pi-user-plus" className="p-button-success"></Button>
                    {/* ולידציה על חוקיות כתובת המייל */}
                </div>
            </div>
        </div>



        // <div className="card flex justify-content-center">
        //     <div className="flex flex-column gap-2">

        //         <InputText id="userEmail" aria-describedby="userEmail-help" /><br></br>
        //         <small id="userEmail-help">
        //             הכנס את כתובת האימייל שלך.
        //         </small><br></br><br></br><br></br>

        //         <Password value={value} onChange={(e) => setValue(e.target.value)} feedback={false} toggleMask/><br></br>
        //         <small id="userEmail-help">
        //             הכנס את הסיסמה שלך.
        //         </small><br></br><br></br><br></br>
        //         <Button label="התחבר" text raised /> 
        //         <small id="userEmail-help">
        //                      איפוס סיסמה        
        //         </small>
        //         <br></br><br></br>
        //         <small id="userEmail-help">
        //           ___________________________________________________________________
        //           {/* _________________________ */}
        //         </small><br></br><br></br><br></br><br></br>

        //         <small id="userEmail-help">
        //             עדיין לא רשום? הרשם כאן
        //         </small><br></br>
        //         <Button label="התחבר" text raised />
        //     </div>
        // </div>

    )
}
export default LogIn;
