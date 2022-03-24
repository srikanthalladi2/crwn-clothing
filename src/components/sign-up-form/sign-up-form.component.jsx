import { useState } from "react";
import { createAuthUserWithEmailAndPassword, 
        createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const SignUpForm = () => {
    const [formFields, setFormFields] = useState (defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    const handleSubmit = async(event) =>{
        event.preventDefault();
        if(password !== confirmPassword){
            alert("Your password do not match");
            return;
        }
        try{
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, {displayName});
            resetFormFields();
        }
        
        catch(err){
            if(err.code === 'auth/email-already-in-use'){
                alert('cannot create user. Email already in use');
            }
            console.log("this is the error", err);
        }
    }
    
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleChange = (event) =>{
        const {name, value} = event.target;
        setFormFields({...formFields, [name]:value});
    }

    return(
        <div className="sign-up-container">
            <h1>Dont have an Account?</h1>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label="Display Name" 
                    type="text" 
                    required 
                    onChange={handleChange} 
                    name="displayName" 
                    value={displayName}
                />

                <FormInput 
                    label="Email" 
                    type="email" 
                    required 
                    onChange={handleChange} 
                    name="email" 
                    value={email}
                />
               
                <FormInput 
                    label="Password" 
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="password" 
                    value={password}
                />

                <FormInput 
                    label="Confirm password" 
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="confirmPassword" 
                    value={confirmPassword}
                />
                
                <Button type="submit">Sign up</Button>
            </form>
        </div>
    );
}

export default SignUpForm;