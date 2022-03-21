import {signInWithGooglePopup} from '../../utils/firebase/firebase.utils' 

const SignIn = () =>{
    const logGoogleUser = async() => {
       const response = await signInWithGooglePopup();
       console.log(response);
    }
    return(
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign in Google popup</button>
        </div>
    );
}


export default SignIn;