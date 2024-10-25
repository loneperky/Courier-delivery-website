import { useState } from "react";
import "../styles/signup.css";
import { Link, } from "react-router-dom";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [err, setErr] = useState("Error email Already registered");
  const [fullName, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post("http://localhost:4000/auth/signup", {
        fullName,
        email,
        password,
      },{headers:{
        'Content-Type':'Application/json'
      }})
      if(response.data.status){
        alert('Things went as planned!')
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
      alert('Registration failed')
    }
  }
    return (
      <>
        <div className="form-submit">
          <div className="wello">
            <div className="create">
              <h1>Create account</h1>
              <p className="join">Join our 100% free creative network</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="btn_api">
                <button className="apple-btn">
                  <img src="/Images/apple.png" alt="" />
                  <p>Sign up with Apple</p>
                </button>
                <button>
                  <img src="/Images/google.png" alt="" />
                  <p>Sign up with Google</p>
                </button>
              </div>
              <div className="name">
                <label className="label" htmlFor="Fname">
                  Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your name"
                  onChange={(e) => {
                    setFullname(e.target.value);
                  }}
                />
              </div>
              <label className="label" htmlFor="Email">
                Email
              </label>
              <input
                type="email"
                autoComplete="off"
                name="email"
                placeholder="Enter your email"
                onChange=
                {(e) => {
                  setEmail(e.target.value);
                }}
              />
             
              <label className="label" htmlFor="Password">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Create a password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <button  className="subTn" type="submit">
                Sign up
              </button>
              <p>
                Already have an account?<Link to="/login">Log in</Link>
              </p>
            </form>
            <p>By Creating an account you agree to our Terms of use</p>
          </div>
        </div>
      </>
    );
  
  };

 

export default Signup;
