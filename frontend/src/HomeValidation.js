function validation(values){
    let error = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^/s@]+$/ 
    // const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

    if(values.name === ""){
        error.name = "Name should not be empty";
    }
    else{
        error.name = ""
    }
    if(values.email === ""){
        error.email = "Email should not be empty";
    }
    else if(!email_pattern.test(values.email)){
        error.email = "Email didn't match";
    }
    else{
        error.email = ""
    }

    if(values.description === ""){
        error.description = "Description should not be empty"
    }
    else{
        error.description = "";
    }
    return error;
}
export default validation;