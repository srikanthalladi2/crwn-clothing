import { useState} from "react";
import { signInWithGooglePopup,
         signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss';
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
const defaultFormFields = {
    email: '',
    password: ''
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
            
        }

        catch (error) {
            switch(error.code){
                case 'auth/user-not-found':
                alert("user not regsitered");
                break;
                case 'auth/wrong-password':
                alert("wrong password");
                break;
                default:
                console.log(error);
            }

        }
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const SignInWithGoogle = async() => {
         await signInWithGooglePopup();
     }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    }

    return (
        <div className="sign-up-container">
            <h1>Already Have an Account?</h1>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>


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

                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={SignInWithGoogle}>Sign in with google</Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;