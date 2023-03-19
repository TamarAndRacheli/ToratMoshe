import React, { useEffect, useState } from 'react';
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import '../Services/Register.css';

const Register = () => {
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});
    const [password, setPassword] = useState("");
    const [pass_valid, set_pass_valid] = useState("");

    const validate = (data) => {
        let errors = {};

        if (!data.first_name) {
            errors.first_name = 'שם פרטי חובה';
        }

        if (!data.last_name) {
            errors.last_name = 'שם משפחה חובה';
        }

        if (!data.email) {
            errors.email = 'כתובת מייל חובה  (לצורך הזדהות)';
        }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
            errors.email = 'כתובת המייל אינה חוקית כתובת חוקית לדוגמא: example@gmail.com';
        }

        if (!data.password) {
            errors.password = 'סיסמה חובה';
        }

        if (!data.password_validation) {
            errors.password_validation = 'אימות סיסמה חובה';
        }
        else  if (pass_valid != password ) {
            errors.password_validation = 'הסיסמה אינה זהה';
         }

        return errors;
    };

    const onSubmit = (data, form) => {
        setFormData(data);
        setShowMessage(true);
        form.restart();
    };

    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };

    return (
        <div className="form-demo">
            <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex align-items-center flex-column pt-6 px-3">
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                    <h5>נרשמת בהצלחה!</h5>
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                        <b>{formData.first_name} {formData.last_name} הרשמתך לאתר בוצעה בהצלחה </b> 
                    </p>
                    <p style={{ textAlign: 'center' }}>
                        כעת הינך נעשה שותף בפיענוח כתב יד קדשו של המהריל על ידי העלאת הצעות לתיקון התמלול <br></br>
                        וכן תוכל להעלות פירושים ותגובות לאתר
                    </p>
                </div>
            </Dialog>

            <div className="flex justify-content-center">
                <div className="card">
                    <h5 className="text-center">הרשמה</h5>
                    <Form onSubmit={onSubmit} initialValues={{ first_name: '',last_name: '', email: '', password: '',pass_valid:'' }} validate={validate} render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit} className="p-fluid">


                            <Field name="first_name" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="first_name" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="first_name" className={classNames({ 'p-error': isFormFieldValid(meta) })}>שם פרטי*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />

                             <Field name="last_name" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="last_name" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="last_name" className={classNames({ 'p-error': isFormFieldValid(meta) })}>שם משפחה*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />

                            <Field name="email" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label p-input-icon-right">
                                        <i className="pi pi-envelope" />
                                        <InputText id="email" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid(meta) })}>אימייל*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />

                            <Field name="password" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <Password id="password" onChange={(e) => setPassword(e.target.value)} {...input} toggleMask feedback={false} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid(meta) })}>סיסמה*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                              <Field name="password_validation" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <Password id="password_validation" onChange={(e) => set_pass_valid(e.target.value)} {...input} toggleMask feedback={false} className={classNames({ 'p-invalid': isFormFieldValid(meta) })}/>
                                        <label htmlFor="password_validation" className={classNames({ 'p-error': isFormFieldValid(meta) })}>אימות סיסמה*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            <Field name="accept" type="checkbox" render={({ input, meta }) => (
                                <div className="field-checkbox">
                                    <Checkbox inputId="accept" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                    <label htmlFor="accept" className={classNames({ 'p-error': isFormFieldValid(meta) })}>אישור קבלת הודעות מהאתר</label>
                                </div>
                            )} />

                            <Button type="submit" label="Submit" className="mt-2" />
                        </form>
                    )} />
                </div>
            </div>
        </div>
    );
}

export default Register;