
import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
      <Link className="navbar-brand fw-bold" to="/">
        Employee Dashboard
      </Link>

      <div className="navbar-nav ms-auto">
        <Link className="nav-link text-white" to="/">
          Home
        </Link>
        <Link className="nav-link text-white" to="/employee-form">
          Employee Form
        </Link>
      </div>
    </nav>
  )
}

function Dashboard() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch employees')
        }
        return response.json()
      })
      .then((data) => {
        setEmployees(data)
        setLoading(false)
      })
      .catch(() => {
        setError('Unable to load employees. Please try again.')
        setLoading(false)
      })
  }, [])

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold">Employee Dashboard</h1>
          <p className="text-muted">View employee details below.</p>
        </div>
        <Link to="/employee-form" className="btn btn-primary">
          + Add Employee
        </Link>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body">
          <h5 className="card-title mb-3">Employee List</h5>

          {loading && <p>Loading employees...</p>}
          {error && <p className="text-danger">{error}</p>}

          {!loading && !error && (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-primary">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.id}>
                      <td>{employee.id}</td>
                      <td>{employee.name}</td>
                      <td>{employee.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function EmployeeForm() {
  const [form, setForm] = useState({
    name: '',
    designation: '',
    location: '',
    salary: '',
  })
  const [message, setMessage] = useState('')

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  function handleSubmit(event) {
    event.preventDefault()
    setMessage('Employee form submitted successfully!')
  }

  return (
    <div className="container py-5">
      <div className="form-card card shadow-sm border-0 mx-auto">
        <div className="card-body p-4">
          <h1 className="fw-bold mb-2">Employee Form</h1>
          <p className="text-muted mb-4">Enter employee details below.</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                className="form-control"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter employee name"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="designation">
                Designation
              </label>
              <input
                id="designation"
                className="form-control"
                type="text"
                name="designation"
                value={form.designation}
                onChange={handleChange}
                placeholder="Enter designation"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="location">
                Location
              </label>
              <input
                id="location"
                className="form-control"
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Enter location"
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label" htmlFor="salary">
                Salary
              </label>
              <input
                id="salary"
                className="form-control"
                type="number"
                name="salary"
                value={form.salary}
                onChange={handleChange}
                placeholder="Enter salary"
                min="0"
                required
              />
            </div>

            <button className="btn btn-primary w-100" type="submit">
              Submit
            </button>

            {message && (
              <p className="text-success mt-3 mb-0">{message}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employee-form" element={<EmployeeForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
