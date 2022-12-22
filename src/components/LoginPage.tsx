import { Alert, AlertTitle, Button, Stack, TextField } from "@mui/material";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { userPool } from "./helper";

const LoginPage = () => {
  const [emailValue, setEmailValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmailValue(e.target.value);
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPasswordValue(e.target.value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const attributeList = [];
    const dataEmail = {
      Name: emailValue,
      Value: passwordValue,
    };
    const attributeEmail = new CognitoUserAttribute(dataEmail);
    const attributePassword = new CognitoUserAttribute(dataEmail);
    attributeList.push(attributeEmail);
    attributeList.push(attributePassword);
    const array: CognitoUserAttribute[] = [];
    userPool.signUp(
      emailValue,
      passwordValue,
      [],
      array,
      function (err, result) {
        if (err) {
          setError(err.message);
          return;
        }
        const cognitoUser = result?.user;
        console.log("user name is " + cognitoUser?.getUsername());
        router.push("/success");
      }
    );
    setEmailValue("");
    setPasswordValue("");
  };
  const handleReset = () => {
    setEmailValue("");
    setPasswordValue("");
  };

  return (
    <form className="form">
      <h1 className="title">Sign Up</h1>
      {error && <p className="error">{error}</p>}
      <div className="inputs">
        <TextField
          onChange={onEmailChange}
          value={emailValue}
          label={"Email"}
          type="email"
        />
        <TextField
          onChange={onPasswordChange}
          value={passwordValue}
          label={"Password"}
          type="password"
        />
      </div>

      <div className="buttons">
        <Button onClick={handleSubmit}>Submit</Button>
        <Button onClick={handleReset}>Reset</Button>
      </div>
      <p className="text">
        Already have an account
        <strong>
          <Link href="/sign-in">Sign in</Link>
        </strong>
      </p>
    </form>
  );
};

export default LoginPage;
