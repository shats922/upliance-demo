export function UserList(props) {
  const { userList, setUserList } = props;
  function handleDelete(userId) {
    const updatedUsers = userList.filter((user) => user.userId !== userId);
    setUserList(updatedUsers);
  }

  return (
    <div className="flex-1">
      <h3>Saved Users:</h3>
      {userList.map((user) => (
        <div key={user.userId} className="userItem">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Address:</strong> {user.address}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone}
          </p>
          <button onClick={() => handleDelete(user.userId)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
