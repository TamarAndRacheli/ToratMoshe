import React from 'react'; 
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import {useNavigate} from "react-router-dom" 

const LogIn=() =>{

    const navigate = useNavigate();
    // const [value, setValue] = useState('');

    return ( 
        <div className="card">
        <div className="flex flex-column md:flex-row">
            <div className="w-full md:w-5 flex flex-column align-items-s justify-content-center gap-3 py-5">
                <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                    <label htmlFor="username" className="w-6rem">
                        Username
                    </label>
                    <InputText id="username" type="text" />
                </div>
                <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                    <label htmlFor="password" className="w-6rem">
                        Password
                    </label>
                    <InputText id="password" type="password" />
                </div>
                <Button label="כניסה" icon="pi pi-user" className="w-10rem mx-auto"></Button>
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
                <Button onClick={()=>navigate("/Register")} label="הירשם" icon="pi pi-user-plus" className="p-button-success"></Button>
            </div>
        </div>
    </div>       

  

// <div className="card flex justify-content-center">
        //     <div className="flex flex-column gap-2">

        //         <InputText id="username" aria-describedby="username-help" /><br></br>
        //         <small id="username-help">
        //             הכנס את כתובת האימייל שלך.
        //         </small><br></br><br></br><br></br>

        //         <Password value={value} onChange={(e) => setValue(e.target.value)} feedback={false} toggleMask/><br></br>
        //         <small id="username-help">
        //             הכנס את הסיסמה שלך.
        //         </small><br></br><br></br><br></br>
        //         <Button label="התחבר" text raised /> 
        //         <small id="username-help">
        //                      איפוס סיסמה        
        //         </small>
        //         <br></br><br></br>
        //         <small id="username-help">
        //           ___________________________________________________________________
        //           {/* _________________________ */}
        //         </small><br></br><br></br><br></br><br></br>

        //         <small id="username-help">
        //             עדיין לא רשום? הרשם כאן
        //         </small><br></br>
        //         <Button label="התחבר" text raised />
        //     </div>
        // </div>

    )
}
export default LogIn;
   