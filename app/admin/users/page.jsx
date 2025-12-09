"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../component/sidebar/Sidebar";
import Header from "../../component/section-header/Header";
import UsersTable from "../../component/admin/UsersTable";
import StatsCard from "../../component/admin/StatsCard";
import CreateUserModal from "../../component/admin/CreateUser";
import UpdateUserModal from "../../admin/users/UpdateUserModal";
import { adminApi } from "../../lib/adminApi";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    async function loadUsers() {
      try {
        const res = await adminApi.users.getAll();
        setUsers(res.users);
      } catch (err) {
        console.log("Error:", err);
      }
      setLoading(false);
    }

    loadUsers();
  }, []);

  if (loading) return <p className="loading-text">Loading...</p>;

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="dashboard-main">
        <Header title="Users Dashboard" />

        <button
          onClick={() => setOpenCreate(true)}
          style={{
            margin: "10px 0",
            padding: "10px 15px",
            background: "#4b70f5",
            color: "white",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
          }}
        >
          + Create User
        </button>

        {/* Stats */}
        <div className="stats-grid">
          <StatsCard title="Total Users" value={users.length} />
          <StatsCard title="Admins" value={users.filter((u) => u.role === "admin").length} />
          <StatsCard title="Customers" value={users.filter((u) => u.role === "customer").length} />
        </div>

        {/* TABLE */}
        <UsersTable
          users={users}
          onDelete={async (id) => {
            await adminApi.deleteUser(id);
            setUsers(users.filter((u) => u._id !== id));
          }}
          onUpdate={(id) => {
            const user = users.find((u) => u._id === id);
            setSelectedUser(user);
            setOpenUpdate(true);
          }}
        />

        {/* CREATE USER */}
        <CreateUserModal
          open={openCreate}
          onClose={() => setOpenCreate(false)}
          onSave={async (data) => {
            const res = await adminApi.users.create(data);
            setUsers([...users, res.user]);
            setOpenCreate(false);
          }}
        />

        {/* UPDATE USER */}
        <UpdateUserModal
          open={openUpdate}
          onClose={() => setOpenUpdate(false)}
          user={selectedUser}
          onSave={async (data) => {
            const res = await adminApi.users.update(selectedUser._id, data);
            setUsers(users.map((u) => (u._id === selectedUser._id ? res.updatedUser : u)));
            setOpenUpdate(false);
          }}
        />

        <footer className="dashboard-footer">
          © {new Date().getFullYear()} Admin Panel
        </footer>
      </div>
    </div>
  );
}
