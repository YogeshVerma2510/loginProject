import React, { useState } from 'react';
import { Link,useNavigate} from 'react-router-dom';
import validation  from './LoginValidation';
import axios from 'axios';


function Login(){
    const [values, setValues] = useState({
        email : '',
        password : ''
    })
    const naviagte = useNavigate();
    const [errors,setErrors] = useState({})
    const handleInput = (event)=>{
        setValues(prev => ({...prev,[event.target.name]:[event.target.value]}))
    }
    const handleSubmit = (event) =>{
        event.preventDefault();
        setErrors(validation(values));
        if(errors.email === "" && errors.password === ""){
            axios.post('http://localhost:8081/login',values)
            .then(res => {
                console.log(res);
                if(res.data === "Success"){
                    naviagte('/home');
                }
                else{
                    alert("No record exits");
                }
            })
            .catch(err => console.log(err));

        }
        
    }

    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
           <div className='bg-white p-3 rounded w-25'>
                <form action='' onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    <div className='mb-3'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' placeholder='Enter email' name='email'
                        onChange={handleInput} className='form-control rounder-0'></input>
                        {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' placeholder='Enter password' name='password'
                        onChange={handleInput} className='form-control rounder-0'></input>
                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'><strong>Login</strong></button>
                    <p>You are agree to our terms and condition</p>
                    <Link to="/signup" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create Account</Link>
                </form>
           </div> 
        </div>
    )
}

export default Login