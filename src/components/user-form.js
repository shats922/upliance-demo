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

    const userId = uuidv4();
    const newUser = { userId, ...formData };
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
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
