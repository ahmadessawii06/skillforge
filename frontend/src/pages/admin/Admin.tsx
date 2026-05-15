import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import "./Admin.css";

type AdminUser = {
  id: number;
  fullName: string;
  email: string;
  role: string;
};

type AdminForm = {
  fullName: string;
  email: string;
  passwordHash: string;
  role: string;
};

export default function Admin() {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!user || user.role?.toLowerCase() !== "admin") {
    return (
      <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-dark position-relative overflow-hidden">
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background:
              "radial-gradient(circle at top left, rgba(220,53,69,0.25), transparent 30%), radial-gradient(circle at bottom right, rgba(13,110,253,0.18), transparent 30%)",
            filter: "blur(40px)",
          }}
        />

        <div
          className="card border-danger shadow-lg text-center p-5 position-relative"
          style={{
            maxWidth: "650px",
            width: "100%",
            background: "rgba(17, 17, 17, 0.92)",
            backdropFilter: "blur(10px)",
            borderWidth: "2px",
            borderRadius: "28px",
            zIndex: 2,
          }}
        >
          <div
            className="mx-auto mb-4 d-flex align-items-center justify-content-center rounded-circle"
            style={{
              width: "120px",
              height: "120px",
              background: "rgba(220,53,69,0.15)",
              border: "2px solid rgba(220,53,69,0.5)",
              boxShadow: "0 0 40px rgba(220,53,69,0.35)",
            }}
          >
            <i
              className="bi bi-shield-lock-fill text-danger"
              style={{ fontSize: "58px" }}
            ></i>
          </div>

          <span className="badge bg-danger px-4 py-2 mb-4 fs-6">
            RESTRICTED AREA
          </span>

          <h1
            className="fw-bold text-white mb-3"
            style={{
              fontSize: "3.2rem",
              letterSpacing: "-2px",
            }}
          >
            Access Denied
          </h1>

          <p
            className="text-secondary mx-auto mb-4"
            style={{
              maxWidth: "520px",
              lineHeight: "1.8",
              fontSize: "1.05rem",
            }}
          >
            You do not have permission to access the SkillForge administrator
            dashboard.
          </p>
        </div>
      </div>
    );
  }

  const [users, setUsers] = useState([]);

  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  /* saif work */
const [interviews, setInterviews] = useState([]);

  const [form, setForm] = useState<AdminForm>({
    fullName: "",
    email: "",
    passwordHash: "",
    role: "user",
  });

  const API_URL = "http://localhost:3000/api/users";

  /* saif work */
  const INTERVIEW_API_URL = "http://localhost:3000/api/interviews";

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      console.log("STATUS:", response.status);
      console.log("API DATA:", data);

      if (!response.ok) {
        setUsers([]);
        return;
      }

      if (Array.isArray(data)) {
        setUsers(data);
      } else if (Array.isArray(data.users)) {
        setUsers(data.users);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  /* saif work */
  const fetchInterviews = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(INTERVIEW_API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      console.log("INTERVIEW DATA:", data);

      if (Array.isArray(data)) {
        setInterviews(data);
      } else if (Array.isArray(data.interviews)) {
        setInterviews(data.interviews);
      } else {
        setInterviews([]);
      }
    } catch (error) {
      console.error("Interview fetch error:", error);
    }
  };

  useEffect(() => {
    fetchUsers();

    /* saif work */
    fetchInterviews();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      setForm({
        fullName: "",
        email: "",
        passwordHash: "",
        role: "user",
      });

      fetchUsers();

      /* saif work */
      fetchInterviews();
    } catch (error) {
      console.error("Add user error:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchUsers();

      /* saif work */
      fetchInterviews();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleEdit = (user: AdminUser) => {
    setEditingUser({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    });
  };

  const handleUpdate = async () => {
    if (!editingUser) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await fetch(`${API_URL}/${editingUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editingUser),
      });

      setEditingUser(null);

      fetchUsers();

      /* saif work */
      fetchInterviews();
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  /* saif work */
  const getUserScore = (userId) => {
    const interview = interviews.find(
      (item) => item.userId === userId && item.total_score !== null
    );

    if (interview) {
      return interview.total_score;
    }

    return "No score";
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <p className="admin-eyebrow">SkillForge Admin</p>
          <h1>User Management</h1>
          <p>Manage platform users and permissions.</p>
        </div>

        <div className="admin-stat">
          <span>Total Users</span>
          <strong>{users.length}</strong>
        </div>
      </div>

      <div className="admin-grid">
        <div className="admin-card">
          <h2>Add New User</h2>

          <form onSubmit={handleAddUser} className="admin-form">
            <div>
              <label>Full Name</label>

              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Enter full name"
              />
            </div>

            <div>
              <label>Email</label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter email"
              />
            </div>

            <div>
              <label>Password</label>

              <input
                type="password"
                name="passwordHash"
                value={form.passwordHash}
                onChange={handleChange}
                placeholder="Enter password"
              />
            </div>

            <div>
              <label>Role</label>

              <select name="role" value={form.role} onChange={handleChange}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button type="submit" className="primary-btn">
              Add User
            </button>
          </form>
        </div>

        {editingUser && (
          <div className="admin-card">
            <h2>Edit User</h2>

            <div className="admin-form">
              <div>
                <label>Full Name</label>

                <input
                  type="text"
                  value={editingUser.fullName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setEditingUser({
                      ...editingUser,
                      fullName: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label>Email</label>

                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setEditingUser({
                      ...editingUser,
                      email: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label>Role</label>

                <select
                  value={editingUser.role}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setEditingUser({
                      ...editingUser,
                      role: e.target.value,
                    })
                  }
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="edit-actions">
                <button onClick={handleUpdate} className="success-btn">
                  Save Changes
                </button>

                <button
                  onClick={() => setEditingUser(null)}
                  className="secondary-btn"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="admin-card table-card">
        <h2>All Users</h2>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Role</th>

                {/* saif work */}
                <th>Evaluation</th>

                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="6" className="empty-state">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.fullName}</td>
                    <td>{user.email}</td>

                    <td>
                      <span className={`role-badge ${user.role}`}>
                        {user.role}
                      </span>
                    </td>

                    {/* saif work*/}
                    <td>
                      <span className="evaluation-badge">
                        {getUserScore(user.id)}
                      </span>
                    </td>

                    <td>
                      <div className="action-buttons">
                        <button
                          onClick={() => handleEdit(user)}
                          className="edit-btn"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(user.id)}
                          className="delete-btn"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
