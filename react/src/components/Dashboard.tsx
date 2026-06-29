import "./dashboard.css";

type Employee = {
  id: number;
  name: string;
  role: string;
  department: string;
};

type Props = {
  employees: Employee[];
  loading: boolean;
  form: {
    name: string;
    role: string;
    department: string;
  };
  setForm: React.Dispatch<
    React.SetStateAction<{
      name: string;
      role: string;
      department: string;
    }>
  >;
  onSubmit: (e: React.FormEvent) => void;
  onDelete: (id: number) => void;
};

export default function Dashboard({
  employees,
  loading,
  form,
  setForm,
  onSubmit,
  onDelete,
}: Props) {
  const totalDepartments = new Set(
    employees.map((e) => e.department)
  ).size;

  const totalRoles = new Set(
    employees.map((e) => e.role)
  ).size;

  return (
    <div className="container">
      {/* Stats Cards */}
      <div className="cards">
        <div className="card">
          <h4>Total Employees</h4>
          <h2>{employees.length}</h2>
        </div>

        <div className="card">
        <h3>Add Employee</h3>

        <form
          className="employee-form"
          onSubmit={onSubmit}
        >
          <input
            required
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <input
            required
            placeholder="Role"
            value={form.role}
            onChange={(e) =>
              setForm({
                ...form,
                role: e.target.value,
              })
            }
          />

          <input
            required
            placeholder="Department"
            value={form.department}
            onChange={(e) =>
              setForm({
                ...form,
                department:
                  e.target.value,
              })
            }
          />

          <button type="submit">
            Add Employee
          </button>
        </form>
        </div>

      </div>



      {/* Employee Table */}
      <div className="panel">
        <h3>Employee List</h3>

        {loading ? (
          <p>Loading...</p>
        ) : employees.length === 0 ? (
          <p>No Employees Found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Department</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {employees.map(
                (employee) => (
                  <tr
                    key={employee.id}
                  >
                    <td>
                      {employee.id}
                    </td>

                    <td>
                      {employee.name}
                    </td>

                    <td>
                      {employee.role}
                    </td>

                    <td>
                      {
                        employee.department
                      }
                    </td>

                    <td>
                      <button
                        className="delete-btn"
                        onClick={() =>
                          onDelete(
                            employee.id
                          )
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}