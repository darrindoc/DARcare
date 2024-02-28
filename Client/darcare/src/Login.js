import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate, Link } from "react-router-dom";
import { login } from "./Managers/UserProfileManager";

export default function Login({setIsLoggedIn}) {
  const navigate = useNavigate();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const loginSubmit = (e) => {
    e.preventDefault();
    login(username, password)
      .then(r =>{
      if(r.userName === username && r.userPassword === password){
      setIsLoggedIn(true)
      navigate('/')
      }
      else{
        alert("Invalid username or password")
      }
    })
  };

  return (
    <div class="container text-center">
      <div class="row">
          <div>Welcome to DARcare</div>
      </div>
      <div class="row">
        <div class="col">
          <Form onSubmit={loginSubmit}>
            <fieldset>
              <FormGroup>
                <Label for="username">Username</Label>
                <Input id="username" type="text" onChange={e => setUsername(e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Button>Login</Button>
              </FormGroup>
            </fieldset>
          </Form>
        </div>
      </div>
    </div>
  );
}