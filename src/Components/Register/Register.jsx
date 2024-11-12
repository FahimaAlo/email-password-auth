import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from "react-router-dom";


const Register = () => {
    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        console.log(email, password, accepted);

        if(password.length < 6){
            setRegisterError('Password should be at least 6 characters or longer');
            return;
        }
        else if(!/[A-Z]/.test(password)){
            setRegisterError('your password should have at least one upper case characters.')
            return;
        }
        else if(!accepted){
            setRegisterError('Please accept our terms and conditions!')
            return;
        }

        // reset error and success
        setRegisterError('');
        setSuccess('');

        // create user
        createUserWithEmailAndPassword(auth, email,password)
        .then(result => {
            console.log(result.user);
            if(result.user.emailVerified){
                setSuccess('User logged in successfully!!')
            }
            else{
                alert('Please verify your email address.')
            }


            // send verification email
            sendEmailVerification(result.user)
            .then( () => {
                alert('please check your email and verify your account')
            })



        })
        .catch(error => {
            console.error(error);
            setRegisterError(error.message);
        })

    }

    return (
        <div className=" ">
           <div className="mx-auto md:w-1/2">
           <h2 className="text-3xl mb-8 ">Please Register</h2>
            <form onSubmit={handleRegister}>
                <input className="mb-4 w-full py-2 px-4 bg-primary" type="email" name="email" placeholder="Email Address" id="" required  />
                <br />
               <div className=" mb-4 relative border">
               <input className=" w-full py-2 px-4 bg-primary" 
                type={showPassword ? "text" : "password"}
                 name="password" 
                 placeholder="Password"
                  id="" required/>
                <span className="absolute top-3 right-2" onClick={() => setShowPassword(!showPassword)}>

                    {
                        showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                    }
                </span>
               </div>
               <br />
              <div className="mb-2">
              <input type="checkbox" name="terms" id="terms" />
              <label className="ml-2" htmlFor="terms">Accept Our <a>Terms and Conditions</a></label>
              </div>
                <br />
                <input className=" btn btn-secondary mb-4 w-full py-2 px-4" type="submit" value="Register" />
            </form>
            {
                registerError && <p className="text-red-700">{registerError}</p>
            }
            {
                success && <p className="text-green-600">{success}</p>
            }
            <p>Already have an account? <Link to="/login">Login</Link></p>
           </div>
        </div>
    );
};

export default Register;