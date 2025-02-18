import {
  Button,
  TextField
} from "@mui/material";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export function UserForm(props) {
  const { userList, setUserList } = props;
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });

  const [isUnSaved, setIsUnSaved] = useState(false);

  // Sync userList with localStorage
  useEffect(() => {
    localStorage.setItem("userList", JSON.stringify(userList));
  }, [userList]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setIsUnSaved(true);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const id = uuidv4();
    const newUser = { id, ...formData };
    const updatedUsers = [...userList, newUser];

    // Update state and localStorage
    setUserList(updatedUsers);
    console.log("Form submitted:", newUser);

    // Reset form and unsaved changes flag
    setFormData({
      name: "",
      address: "",
      email: "",
      phone: "",
    });
    setIsUnSaved(false);
  }

  // Warn the user before leaving if there are unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isUnSaved) {
        event.preventDefault();
        event.returnValue =
          "You have unsaved changes. Are you sure you want to leave?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isUnSaved]);

  return (
    <div className="flex-1">
      <form onSubmit={handleSubmit} className="card">
        <TextField
          label="Name"
          variant="standard"
          value={formData.name}
          name="name"
          onChange={handleChange}
        />
        <TextField
          label="Address"
          variant="standard"
          value={formData.address}
          name="address"
          onChange={handleChange}
        />
        <TextField
          label="Email"
          variant="standard"
          value={formData.email}
          name="email"
          type="email"
          onChange={handleChange}
        />
        <TextField
          label="Phone"
          variant="standard"
          value={formData.phone}
          name="phone"
          type="number"
          onChange={handleChange}
        />

        <Button variant="contained" type="submit">
          Save
        </Button>
      </form>
    </div>
  );
}
