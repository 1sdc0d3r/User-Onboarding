import React, { useState } from "react";

function User({ user }) {
  const [show, setShow] = useState("hide");
  return (
    <div>
      <div className="user-wrapper">
        <h3>Name: {user.name}</h3>
        <p className="user-skill">Skill Level: {user.skill || ""}</p>
        <p className="user-email">Email: {user.email || ""}</p>
        <div className="pass-button">
          <p className="user-pass">
            Password: {show !== "hide" ? user.password : "******"}
          </p>
          <button
            className={show}
            onClick={() => {
              show !== "hide" ? setShow("hide") : setShow("show");
            }}
          >
            Show/Hide
          </button>
        </div>
      </div>
    </div>
  );
}
export default User;
