import './login.css'
import React, { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { auth } from "../firebase.js";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();
  const [registerInformation, setRegisterInformation] = useState({
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: ""
  });

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/todo");
      }
    });
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/todo')
      })
      .catch((err) => {
        console.log(email);
        console.log(password);
        alert(err.message)});
  };

  const handleRegister = () => {
    if (registerInformation.email !== registerInformation.confirmEmail) {
      alert("Please confirm that email are the same");
      return;
    } else if (
      registerInformation.password !== registerInformation.confirmPassword
    ) {
      alert("Please confirm that password are the same");
      return;
    }
    createUserWithEmailAndPassword(
      auth,
      registerInformation.email,
      registerInformation.password
    )
      .then(() => {
        navigate("/todo");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className='container-fluid main-container '>
      <div className='row justify-content-md-center align-items-center'>
        <div className='col-sm-6 shadow-5-strong login-card'>
          <div className='py-5 px-md-5'>
            <div className="row d-flex justify-content-center">
              <div className="col-lg-8">
                <div className='form-container'>
                  {isRegistering ? (<>
                    <h2 className="fw-bold mb-5 text-center">Register</h2>
                    <div className="form-outline mb-4">
                      <label className="form-label">Email address</label>
                      <input type="email" id="email" className="form-control" placeholder='Enter Email' onChange={(e) => setRegisterInformation({...registerInformation, email: e.target.value})} value={registerInformation.email}/>
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label">Confirm Email address</label>
                      <input type="email" id="confirmEmail" className="form-control" placeholder='Confirm Email' value={registerInformation.confirmEmail} onChange={(e) => setRegisterInformation({...registerInformation, confirmEmail: e.target.value})} />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label">Password</label>
                      <input type="password" id="password" className="form-control" placeholder='Enter Password' value={registerInformation.password} onChange={(e) => setRegisterInformation({...registerInformation, password: e.target.value})} />
                    </div> 
                    <div className="form-outline mb-4">
                      <label className="form-label">Confirm Password</label>
                      <input type="password" id="confirmPassword" className="form-control" placeholder='Confirm Password' value={registerInformation.confirmPassword}  onChange={(e) => setRegisterInformation({...registerInformation, confirmPassword: e.target.value})} />
                    </div>
                    <button className="btn btn-primary btn-block w-100 my-2" onClick={handleRegister}>
                      Register
                    </button>
                    <center>
                    <button className='btn btn-primary w-100 my-2' onClick={() => setIsRegistering(false)}>Go Back</button>
                    </center>
                  </>
                  ) : (
                    <>
                      <h2 className="fw-bold mb-5 text-center">Login</h2>
                      <div className="form-outline mb-4">
                        <label className="form-label">Email address</label>
                        <input type="email" id="email" className="form-control" placeholder='Enter Email' onChange={handleEmailChange} value={email}/>
                      </div>
                      <div className="form-outline mb-4">
                        <label className="form-label">Password</label>
                        <input type="password" id="password" className="form-control" placeholder='Enter Password' onChange={handlePasswordChange} value={password}/>
                      </div>
                      <button className="btn btn-primary btn-block w-100 my-2" onClick={handleLoginIn}>
                        Login
                      </button>
                      <center>
                      <button className='btn btn-primary w-100 my-2' onClick={() => setIsRegistering(true)}>Create an account</button>
                      </center>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

{/* <div className='container-fluid'>
        <section className="text-center">
            <div className="p-5 bg-image" style="background-image: url('https://mdbootstrap.com/img/new/textures/full/171.jpg'); height: 300px "></div>
            <div className="card mx-4 mx-md-5 shadow-5-strong" style="margin-top: -100px;background: hsla(0, 0%, 100%, 0.8);backdrop-filter: blur(30px); ">
            <div className="card-body py-5 px-md-5">
                <div className="row d-flex justify-content-center">
                    <div className="col-lg-8">
                        <h2 className="fw-bold mb-5">Login</h2>
                        <form>
                            <div className="form-outline mb-4">
                                <input type="email" id="form3Example3" className="form-control" />
                                <label className="form-label" for="form3Example3">Email address</label>
                            </div>

                            <div className="form-outline mb-4">
                                <input type="password" id="form3Example4" className="form-control" />
                                <label className="form-label" for="form3Example4">Password</label>
                            </div>

                            <div className="form-check d-flex justify-content-center mb-4">
                                <input className="form-check-input me-2" type="checkbox" value="" id="form2Example33" checked />
                                <label className="form-check-label" for="form2Example33">
                                    Subscribe to our newsletter
                                </label>
                            </div>

                            <button type="submit" className="btn btn-primary btn-block mb-4">
                            Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            </div>
        </section>
    </div> */}