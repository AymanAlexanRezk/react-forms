import { useState, useRef } from "react";
import "./styles.css";

export default function App() {
  const [users, setUsers] = useState([]);
  const [inputData, setInputData] = useState({
    firstName: "",
    lastName: ""
  });

  const inputRef = useRef(null);

  function handleChange(event) {
    const { name, value } = event.target;
    setInputData((prevInputData) => ({
      ...prevInputData,
      [name]: value
    }));
  }

  function handleAddUser(event) {
    event.preventDefault();
    setUsers((prevUsers) => [...prevUsers, inputData]);

    setInputData({
      firstName: "",
      lastName: ""
    });
    inputRef.current.focus();
  }

  function handleDelete(firstName) {
    setUsers((prevUsers) =>
      prevUsers.filter((user) => user.firstName !== firstName)
    );
  }

  const usersList = users.map((user) => (
    <li key={user.firstName} onClick={() => handleDelete(user.firstName)}>
      {user.firstName} {user.lastName}
    </li>
  ));

  const haveUsers = !users.length
    ? `You don't have users`
    : `You have ${users.length} ${users.length > 1 ? "users" : "user"}`;

  return (
    <div className="App">
      <h2>React Forms</h2>
      <form onSubmit={handleAddUser}>
        <input
          ref={inputRef}
          placeholder="Insert your first name"
          name="firstName"
          value={inputData.firstName}
          onChange={handleChange}
          required
        />
        <br /> <br />
        <input
          placeholder="Insert your last name"
          name="lastName"
          value={inputData.lastName}
          onChange={handleChange}
          required
        />
        <br /> <br />
        <button>Add User</button>
      </form>
      <h3>Displaying users</h3>
      <p>{haveUsers}</p>
      <ul>{usersList}</ul>
    </div>
  );
}
