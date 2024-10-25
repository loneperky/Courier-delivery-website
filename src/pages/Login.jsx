import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/signup.css";
import { Link,useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()
  axios.defaults.withCredentials = true
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:4000/auth/login", {
      email,
      password,
    }).then(response =>{
      console.log(response)
      if(response.data.status){
        navigate('/dashboard')
      }
   
    }).catch(err =>{
      console.log(err)
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="login-over">
          <div className="login-details">
            <div className="">
              <h2>HI Welcome Back</h2>
              <img src="/Images/sign-img.jpg" alt="" />
              <input
                type="text"
                onChange={(e)=>{setEmail(e.target.value)}}
                className="input"
                required
                placeholder="Enter your email"
                title="Please enter email"
                name="email"
              />
              <input
                type="password"
                onChange={(e)=>{setPassword(e.target.value)}}
                className="input"
                required
                placeholder="Password"
                title="Enter password"
                name="password"
              />
              <div className="show">
                <input type="checkbox" />
                <h6>Show Password</h6>
              </div>

              <button>Sign In</button>
              <p><Link to="/forgot-password">Forgot password</Link></p>
              
              <p>
                Don't have an account yet? <Link to="/signup">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Login;
