import "./header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="logo">
        EmployeeHub
      </div>

      <nav className="nav">
        <a href="/">Dashboard</a>
        <a href="/">Employees</a>
      </nav>
    </header>
  );
}