import Link from "next/link";
import React from "react";

const SuccessPage = () => {
  return (
    <div className="success">
      <h2>SuccessPage</h2>
      <div className="links">
        <Link className="link" href="/sign-in">
          Back to Sign in
        </Link>
        <Link className="link" href="/auth">
          Back to Sign up
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
