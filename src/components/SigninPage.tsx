import { Button, TextField } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { userPool } from "./helper";
import { useRouter } from "next/router";

const SigninPage = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmailValue(e.target.value);
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPasswordValue(e.target.value);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const user = new CognitoUser({
      Username: emailValue,
      Pool: userPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: emailValue,
      Password: passwordValue,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (data) => {
        router.push("/success");
        console.log(data, "success");
      },
      onFailure: (err) => {
        setError(err.message);
      },
      newPasswordRequired: (data) => {
        console.log(data, "data");
      },
    });
    setEmailValue("");
    setPasswordValue("");
  };

  return (
    <form className="form">
      <h1 className="title">Sign In</h1>
      <div className="inputs">
        {error && <p className="error">{error}</p>}
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
        <Button variant="contained" size="large" onClick={onSubmit}>
          Sign in
        </Button>
      </div>
      <p className="text">
        Need an account?
        <strong>
          <Link href="/auth">Sign up</Link>
        </strong>
      </p>
    </form>
  );
};

export default SigninPage;
