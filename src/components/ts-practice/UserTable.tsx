import React, { useState } from "react";

type Role = "Admin" | "Developer" | "Designer";

interface User {
  id: number;
  name: string;
  role: Role;
  createdAt: string;
}

const USERS: User[] = [
  { id: 1, name: "Alice Smith", role: "Developer", createdAt: "2024-03-15" },
  { id: 2, name: "Bob Jones", role: "Designer", createdAt: "2023-11-01" },
  { id: 3, name: "Charlie Brown", role: "Admin", createdAt: "2024-01-20" },
  { id: 4, name: "Diana Prince", role: "Developer", createdAt: "2024-05-10" },
];

export const UserTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<Role | "All">("All");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Array processing pipeline
  const processedUsers = USERS
    // 1. Text Search Filter (case-insensitive)
    .filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase().trim()),
    )
    // 2. Role Filter
    .filter((user) => selectedRole === "All" || user.role === selectedRole)
    // 3. Immutably sort by Date using slice() or spread operator [...]
    .slice()
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  return (
    <div>
      <input
        placeholder="Search name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select
        value={selectedRole}
        onChange={(e) => setSelectedRole(e.target.value as Role | "All")}
      >
        <option value="All">All Roles</option>
        <option value="Admin">Admin</option>
        <option value="Developer">Developer</option>
        <option value="Designer">Designer</option>
      </select>
      <button
        onClick={() =>
          setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
        }
      >
        Sort Date ({sortOrder.toUpperCase()})
      </button>

      <ul>
        {processedUsers.map((user) => (
          <li key={user.id}>
            {user.name} - {user.role} ({user.createdAt})
          </li>
        ))}
      </ul>
    </div>
  );
};
