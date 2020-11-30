import React, { useState, useEffect } from 'react';
import './App.css';
import { Button, Form, FormGroup, Input, Alert } from 'reactstrap';
import logo from './assests/logo.jpg';
import axios from "axios";
import { useCookies } from "react-cookie";


function App() {

  const [Name, setName] = useState("");
  const [Phone, setPhone] = useState("");
  const [returnData, setReturnData] = useState();

  const [isLoginView, setIsLoginView] = useState(true);
  const [token, setToken] = useCookies(["mr-token"]);
  const [p, setP] = useCookies(["num"])

  const loginClicked = () => {
    axios
      .post("/login", {
        Phone
      })
      .then((response) => {
        console.log("Response");
        console.log(response);
        setToken("mr-token", response.data.token);
        setP("num", response.data.phone);

        //console.log("mr-token from backend");
        //console.log(response.data.token);
        //console.log("Response")
        // console.log(response.data.Visited)
        //setReturnData(response.data.Visited)
        //console.log('returnData')
        //console.log(returnData)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const registerClicked = () => {
    axios
      .post("/register", {
        Phone,
        Name
      })
      .then((response) => {
        console.log(response);
        //loginClicked();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // console.log('returnData')
    // console.log(returnData)
    // if (parseInt(returnData) === 1 || parseInt(returnData) === 2 || parseInt(returnData) === 3 || parseInt(returnData) === 4 || parseInt(returnData) === 5) {
    //   window.location.href = '/home';
    //   //history.push('/home/');
    // } else if (parseInt(returnData) === 10) {
    //   window.location.href = '/bonus';
    // }
    if (token["mr-token"]) window.location.href = "/home";
  }, [token]);

  return (
    <Form className="login-form">
      {isLoginView ?
        <div>
          <div class="icon">
            <img alt='loginIcon' src={logo} height="150" width="150" />
          </div>
          <FormGroup>
            <Input type="text" name="Phone" id="Phone" placeholder="Phone" value={Phone}
              onChange={evt => setPhone(evt.target.value)} />
          </FormGroup>
          <Button color="success" className="btn-lg btn-block" onClick={loginClicked}>
            Check In
                </Button>
          <p style={{ color: "green" }} onClick={() => setIsLoginView(false)}>OR Create new account</p>
        </div>
        :
        <div>
          <div class="icon">
            <img alt='registerIcon' src={logo} height="150" width="150" />
          </div>
          <FormGroup>
            <Input type="text" name="Phone" id="Phone" placeholder="Phone" value={Phone}
              onChange={evt => setPhone(evt.target.value)} />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              name="Name"
              id="Name"
              placeholder="Name"
              value={Name}
              onChange={(evt) => setName(evt.target.value)}
            />
          </FormGroup>
          <Button color="success" type="button" className="btn-lg btn-block" onClick={registerClicked}>
            Register
                </Button>
          <p style={{ color: "green" }} onClick={() => setIsLoginView(true)}>OR Login here!</p>
        </div>}
    </Form >
  );
}

export default App;
