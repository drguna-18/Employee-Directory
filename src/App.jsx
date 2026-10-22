
import { useState } from "react";
import "./App.css";

const DEPARTMENTS = [
  "Engineering",
  "Marketing",
  "HR",
  "Finance",
  "Design",
  "Operations"
];

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [errors, setErrors] = useState({});
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDept, setFilterDept] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!email.includes("@") || !email.includes(".")) {
      newErrors.email = "Enter a valid email";
    }

    if (!department) {
      newErrors.department = "Select a department";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newEmployee = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      department
    };

    setEmployees([...employees, newEmployee]);

    setName("");
    setEmail("");
    setDepartment("");
    setErrors({});
  }

  const filteredEmployees = employees
    .filter((emp) =>
      emp.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((emp) =>
      filterDept ? emp.department === filterDept : true
    );

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Employee Directory</h1>
        <p>Manage your team with ease</p>
      </header>

      <main className="main-content">
        <section className="form-section">
          <h2>Add New Employee</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Employee Name</label>
              <input
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <p>{errors.name}</p>}
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p>{errors.email}</p>}
            </div>

            <div className="form-group">
              <label>Department</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option value="">Select Department</option>
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
              {errors.department && <p>{errors.department}</p>}
            </div>

            <button type="submit">+ Add Employee</button>
          </form>
        </section>

        {employees.length > 0 && (
          <section className="filter-section">
            <h2>Search & Filter</h2>

            <input
              type="text"
              placeholder="Search by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <select
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
            >
              <option value="">All Departments</option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </section>
        )}

        <section className="cards-section">
          {employees.length === 0 ? (
            <div className="empty-state">
              <h3>No employees yet</h3>
              <p>Add your first employee!</p>
            </div>
          ) : filteredEmployees.length === 0 ? (
            <div className="empty-state">
              <h3>No matches found</h3>
            </div>
          ) : (
            <>
              <p>
                Showing {filteredEmployees.length} of {employees.length} employees
              </p>

              <div className="cards-grid">
                {filteredEmployees.map((emp) => (
                  <div key={emp.id} className="employee-card">
                    <div className="card-avatar">
                      {emp.name.charAt(0).toUpperCase()}
                    </div>

                    <div className="card-body">
                      <h3>{emp.name}</h3>
                      <p>{emp.email}</p>
                      <span>{emp.department}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
