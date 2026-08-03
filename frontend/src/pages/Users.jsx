import { useEffect, useState } from "react";

import { getUsers } from "../services/userService";

function Users() {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadUsers = async () => {
    try {
      const data = await getUsers();

      setUsers(data.users);
      setTotal(data.total);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <h1>Users</h1>

      <p>Total Users: {total}</p>

      <pre>
        {JSON.stringify(users, null, 2)}
      </pre>
    </>
  );
}

export default Users;