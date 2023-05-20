import { useState } from "react";
import { Link, json, useNavigate } from "react-router-dom";

const Login = () => {
  const [userCredential,setUserCredential] = useState({
    email:"",
    password:"",
  });
  let navigate = useNavigate()
    const handleSubmit = async (e) =>{
      e.preventDefault();
      const res = await fetch('http://localhost:8000/api/loginuser',{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          email:userCredential.email,
          password:userCredential.password
        })
      })
      const data = await res.json();
      console.log(data);
      if(!data.success)
      {
        alert("Invalid credentials")
      }else{
        localStorage.setItem("authToken",json.authToken)
        navigate("/");
      }
    }
    const handleChange = (e) =>{
      setUserCredential({...userCredential,[e.target.name]:e.target.value});
    }
  return (
    <>
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            value={userCredential.email}
            onChange={handleChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            value={userCredential.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="m-3 btn btn-primary">
          Submit
        </button>
        <Link to='/createuser' className="m-3 btn btn-danger">Create New Account</Link>
      </form>
      </div>
    </>
  );
};

export default Login;
