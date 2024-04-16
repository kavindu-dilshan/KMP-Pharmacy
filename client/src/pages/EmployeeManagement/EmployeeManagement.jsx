import { useState, useEffect } from "react";
import EmployeeTable from "./EmployeeManagementTable";
import { Link } from "react-router-dom";
import { MdDownload } from "react-icons/md";
import SideBar from "../../components/SideBar";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

export default function EmployeeManagement() {
  const generateReport = () => {
    fetch("http://localhost:3000/api/employee/read")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.error("Failed to generate report:", response.statusText);
          throw new Error("Failed to generate report");
        }
      })
      .then((data) => {
        const employees = data.employee;

        const doc = new jsPDF();

        const tableHeader = [
          [
            "Name",
            "Phone",
            "DOB",
            "Email",
            "NIC",
            "Role",
            "Marital Status",
            "Gender",
          ],
        ];

        const tableData = employees.map((employee) => [
          employee.name,
          employee.contactNo,
          formatDate(employee.DOB),
          employee.email,
          employee.NIC,
          employee.empRole,
          employee.maritalStatus,
          employee.gender,
        ]);

        doc.autoTable({
          head: tableHeader,
          body: tableData,
        });

        doc.save("Employee Management Report.pdf");
      })
      .catch((error) => {
        console.error("Error generating report:", error);
      });
  };

  const formatDate = (datetimeString) => {
    const date = new Date(datetimeString);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    return formattedDate;
};

  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1">
        <div className="bg-paleblue justify-between flex px-10 py-8">
          <h1 className="text-4xl font-bold text-blue">
            Employee Management Dashboard
          </h1>
          <div className="flex gap-6">
            <button
              onClick={generateReport}
              className="bg-white hover:bg-light-blue hover:text-white text-black border-2 border-light-blue font-semibold transition-all py-2 px-4 rounded-lg inline-flex items-center"
            >
              <MdDownload className="text-2xl mr-2" />
              <span>Download Report</span>
            </button>
            <div className="flex gap-2 cursor-pointer">
              <img
                className="w-12 h-12 border-2 border-white rounded-full"
                src="https://avatars.githubusercontent.com/u/96605596?v=4"
                alt="tania andrew"
              />
              <div className="flex w-full flex-col gap-0.5">
                <div className="flex items-center justify-between font-bold">
                  <h1>Ashen Thiwanka</h1>
                </div>
                <p className="text-xs ">Employee Manager</p>
              </div>
            </div>
          </div>
        </div>
        <div className="px-10 text-2xl font-semibold pt-5">
          <span className="">Employees</span>
        </div>

        <div className="flex items-center ml-10 justify-between mt-7">
          <div className="flex flex-col mr-10 text-sm text-center">
            <div className="">
              <Link
                to="/create-employee"
                className="bg-green-600 text-white hover:bg-green-700 font-semibold rounded-lg  w-full p-3 m-3"
              >
                Add Employee
              </Link>
              <Link
                to="#?"
                className="bg-light-blue text-white hover:bg-blue transition-all font-semibold rounded-lg  w-full p-3 m-3"
              >
                Manage OT Hours
              </Link>
              <Link
                to="#?"
                className="bg-light-blue text-white hover:bg-blue transition-all font-semibold rounded-lg  w-full p-3 m-3"
              >
                Manage Leave Request
              </Link>
            </div>
          </div>
        </div>
        <EmployeeTable />
      </div>
    </div>
  );
}
