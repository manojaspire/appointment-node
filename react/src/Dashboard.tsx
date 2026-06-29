import { useEffect, useState } from "react";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";

type Employee = {
  id: number;
  name: string;
  role: string;
  department: string;
};

function DashboardPage() {
  const API_URL = "http://localhost:3000/api/employees";

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    role: "",
    department: "",
  });

  // GET Employees
  const fetchEmployees = async () => {
    try {
      setLoading(true);

      const res = await fetch(API_URL);

      if (!res.ok) {
        throw new Error("Failed to fetch employees");
      }

      const data = await res.json();

      setEmployees(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // CREATE Employee
  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.role ||
      !form.department
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error(
          "Failed to create employee"
        );
      }

      setForm({
        name: "",
        role: "",
        department: "",
      });

      fetchEmployees();
    } catch (error) {
      console.error(error);
      alert("Failed to add employee");
    }
  };

  // DELETE Employee
  const handleDelete = async (
    id: number
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmed) return;

    try {
      const res = await fetch(
        `${API_URL}/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error(
          "Failed to delete employee"
        );
      }

      setEmployees((prev) =>
        prev.filter(
          (employee) => employee.id !== id
        )
      );
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  return (
    <>
      <Header />

      <Dashboard
        employees={employees}
        loading={loading}
        form={form}
        setForm={setForm}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
      />
    </>
  );
}

export default DashboardPage;