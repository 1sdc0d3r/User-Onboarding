import React, { useState, useEffect } from "react";
import "./App.css";
import LoginForm from "./components/LoginForm";
import User from "./components/User";

function App() {
  const [users, setUser] = useState([
    {
      name: "Colten",
      email: "colten@mail.com",
      skill: "Novice",
      password: "LuvSkiing"
    },
    {
      name: "Braden",
      email: "braden@mail.com",
      skill: "Intermediate",
      password: "1sdc0d3r"
    },
    {
      name: "Kacee",
      email: "kacee@mail.com",
      skill: "Novice",
      password: "mtcBlueDart"
    },
    {
      name: "Cooper",
      email: "cooper@mail.com",
      skill: "Expert",
      password: "fortNite"
    }
  ]);

  function sortUsers(arr) {
    let nameArray = [];
    let newUserList = [];
    for (let i = 0; i < arr.length; i++) {
      nameArray.push(arr[i].name);
    }
    nameArray.sort();
    for (let j = 0; j < nameArray.length; j++) {
      newUserList.push(arr.find(e => e.name === nameArray[j]));
    }
    setUser(newUserList);
  }

  return (
    <div className="App">
      <div className="LoginForm component">
        <h2>New User Form</h2>
        <LoginForm newUser={setUser} userList={users} sort={sortUsers} />
      </div>
      <div className="User component">
        {users.map((e, i) => (
          <User user={e} index={i} />
        ))}
      </div>
    </div>
  );
}

export default App;
