import { useState } from "react";
import { Counter } from "./components/counter";
import { TextEditor } from "./components/text-editor";
import { UserForm } from "./components/user-form";
import { UserList } from "./components/user-list";
import "./App.css";

function App() {
  const [counter, setCounter] = useState(
    () => Number(localStorage.getItem("counter")) ?? 0
  );

  const [userList, setUserList] = useState(() => {
    return JSON.parse(localStorage.getItem("userList")) ?? [];
  });

  return (
    <div
      className="app"
      style={{
        background: `linear-gradient(to right, #ff7eb3 ${Math.min(
          counter * 5,
          100
        )}%, #87ceeb)`,
        transition: "background 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
      }}
    >
      <div className="flex">
        <Counter counter={counter} setCounter={setCounter} />
        <TextEditor />
      </div>
      <div className="flex">
        <UserForm userList={userList} setUserList={setUserList} />
        <UserList userList={userList} setUserList={setUserList} />
      </div>
    </div>
  );
}

export default App;
