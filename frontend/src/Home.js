import React, { useEffect, useState } from "react";
import validation from './HomeValidation';
import axios from "axios";

function Home() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        description: ''
    });
    const [data, setData] = useState([]);
    const [errors, setErrors] = useState({});
    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: [event.target.value] }))
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(validation(values));
        if (errors.name === "" && errors.email === "" && errors.description === "") {
            axios.post('http://localhost:8081/home', values)
                .then(res => {
                    console.log(res);
                    window.location.reload();
                })
                .catch(err => console.log(err));
        }

    }

    useEffect(() => {
        axios.get('http://localhost:8081/data', { headers: { "Content-Type": 'application/json' } })
            .then(res => {
                console.log(res.data);
                setData(res.data);

            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div class="container">
            <div class="row">
                <div class="col">
                    <div className='d-flex justify-content-center align-items-center bg-primary vh-100 d-flex flex-nowrap'>
                        <div className='bg-white p-3 rounded w-70'>
                            <form action='' onSubmit={handleSubmit}>
                                <h2>Enter Employee Details</h2>
                                <div className='mb-3'>
                                    <label htmlFor='name'>Name</label>
                                    <input type='text' placeholder='Enter name' name='name'
                                        onChange={handleInput} className='form-control rounder-0'></input>
                                    {errors.name && <span className='text-danger'>{errors.name}</span>}
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='email'>Email</label>
                                    <input type='email' placeholder='Enter email' name='email'
                                        onChange={handleInput} className='form-control rounder-0'></input>
                                    {errors.email && <span className='text-danger'>{errors.email}</span>}
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='description'>Description</label>
                                    <textarea type='textarea' placeholder='Enter description' name='description' rows="4" cols="50"
                                        onChange={handleInput} className='form-control rounder-0'></textarea>
                                    {errors.description && <span className='text-danger'>{errors.description}</span>}
                                </div>
                                <button type='submit' className='btn btn-success w-100 rounded-0'><strong>Submit</strong></button>
                            </form>
                        </div>
                    </div>

                </div>
                <div class="col">
                    <div class="row">
                        <div class='' style={{width:"100%",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:"10px"}}>
                            {
                                data.map((item,index) => {
                                    return (
                                        <div class="card" style={{width:"170px",}}  key={index}> 
                                            <div class="card-body">
                                                <h5 class="card-title">{item.name}</h5>
                                                <p class="card-text">{item.email}</p>
                                                <p class="card-text">{item.description}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home