import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [userCredential,setUserCredential] = useState({
    name:"",
    email:"",
    password:"",
    location:"",
  });
    const handleSubmit = async (e) =>{
      e.preventDefault();
      const res = await fetch('http://localhost:8000/api/createuser',{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          name:userCredential.name,
          email:userCredential.email,
          password:userCredential.password,
          location:userCredential.location
        })
      })
      const data = await res.json();
      console.log(data);
      if(!data.success)
      {
        alert("Invalid credentials")
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
          <label htmlFor="name" className="form-label">
            Your Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            name="name"
            value={userCredential.name}
            onChange={handleChange}
          />
        </div>
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
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Your Location
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="location"
            value={userCredential.location}
            onChange={handleChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your location with anyone else.
          </div>
        </div>
        <button type="submit" className="m-3 btn btn-primary">
          Submit
        </button>
        <Link to='/login' className="m-3 btn btn-danger">Already a user</Link>
      </form>
      </div>
    </>
  );
};

export default Signup;
