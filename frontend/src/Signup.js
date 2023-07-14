import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import validation from "./SignupValidation";
import axios from 'axios';


function Signup(){
    const [values, setValues] = useState({
        name : '',
        email : '',
        password : ''
    });
    const naviagte = useNavigate();
    const [errors,setErrors] = useState({});
    const handleInput = (event)=>{
        setValues(prev => ({...prev,[event.target.name]:[event.target.value]}))
    }
    const handleSubmit = (event) =>{
        event.preventDefault();
        setErrors(validation(values));
        if(errors.name === "" && errors.email === "" && errors.password === ""){
            axios.post('http://localhost:8081/signup',values)
            .then(res => {
                console.log(res);
                naviagte('/');
            })
            .catch(err => console.log(err));

        }
    }
    function disableBackButton() {

        window.history.pushState(null, "", window.location.href);
        window.onpopstate = function() {
            window.history.pushState(null, "", window.location.href);
        };

        // ("#message").text("Successfully!, Browser back button disabled").delay(2000).fadeOut(1000);
    }

    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
           <div className='bg-white p-3 rounded w-25'>
                <form action=''onSubmit={handleSubmit}>
                    <h2>Sign-Up</h2>
                    <div className='mb-3'>
                        <label htmlFor='name'>Name</label>
                        <input type='text' placeholder='Enter Name' name="name"
                         onChange={handleInput} className='form-control rounder-0'></input>
                         {errors.name && <span className='text-danger'>{errors.name}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' placeholder='Enter email' name="email"
                        onChange={handleInput} className='form-control rounder-0'></input>
                        {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' placeholder='Enter password' name="password"
                        onChange={handleInput} className='form-control rounder-0'></input>
                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>
                    <button type="submit" onClick={disableBackButton} className='btn btn-success w-100 rounded-0'><strong>Signup</strong></button>
                    <p>You are agree to our terms and condition</p>
                    <Link to="/" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link>
                </form>
           </div> 
        </div>
    )
}
export default Signup