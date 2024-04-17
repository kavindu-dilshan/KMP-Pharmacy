import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import SideBar from "../../components/SideBar";

export default function EmployeeCreateForm() {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    name: "",
    contactNo: "",
    DOB: "",
    address: "",
    email: "",
    NIC: "",
    empRole: "",
    maritalStatus: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked, id } = e.target;
    setValue((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? (id === "Male" && checked ? "Male" : "Female") : value,
      maritalStatus: name === "maritalStatus" ? (checked ? id : "") : prevState.maritalStatus,
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const addEmployee = await axios.post(
        "http://localhost:3000/api/employee/create",
        value
      );
      const response = addEmployee.data;
      if (response.success) {
        toast.success(response.message, { duration: 4000 });
        setTimeout(() => {
          navigate("/employee-management");
        });
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    console.log(value);
  };

  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1">
        <div className="bg-paleblue justify-between flex px-10 py-8">
          <h1 className="text-4xl font-bold text-blue">
            Employee Registration Form
          </h1>
          <div className="flex gap-2">
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
        <div className="px-10 text-2xl font-semibold pt-5">
          <span className="">Add Employee</span>
        </div>
        <div className="p-10 bg-paleblue m-10 rounded-3xl max-w-4xl border-2 border-light-blue">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-10"
          >
            <div className="flex flex-col gap-1 flex-1">
              <label className="font-semibold text-black">Employee Name</label>
              <input
                type="text"
                placeholder="Enter Name"
                id="name"
                name="name"
                value={value.name}
                onChange={handleChange}
                className="border-2 border-gray outline-none rounded-md p-2 mb-4"
                required
              />

              <label className="font-semibold text-black">Contatc No</label>
              <input
                type="text"
                placeholder="Enter mobile number"
                id="contactNo"
                name="contactNo"
                value={value.contactNo}
                onChange={handleChange}
                className="border-2 border-gray outline-none rounded-md p-2 mb-4"
                required
              />

              <label className="font-semibold text-black">Date of Bitrh</label>
              <input
                type="date"
                id="DOB"
                name="DOB"
                value={value.DOB}
                onChange={handleChange}
                className="border-2 border-gray outline-none rounded-md p-2 mb-4"
                required
              />

              <label className="font-semibold text-black">Description</label>
              <textarea
                type="textarea"
                placeholder="Enter description"
                id="address"
                name="address"
                value={value.address}
                onChange={handleChange}
                className="border-2 border-gray outline-none rounded-md p-2 mb-4 max-h-40 min-h-40"
                required
              />

              <input
                type="submit"
                value="Submit"
                className="bg-light-blue hover:bg-blue font-semibold text-white p-3 rounded-lg w-full cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-1 flex-1">
              <label className="font-semibold text-black">Email</label>
              <input
                type="text"
                placeholder="Enter email"
                id="email"
                name="email"
                value={value.email}
                onChange={handleChange}
                className="border-2 border-gray outline-none rounded-md p-2 mb-4"
                required
              />

              <label className="font-semibold text-black">NIC</label>
              <input
                type="text"
                placeholder="Enter NIC"
                id="NIC"
                name="NIC"
                value={value.NIC}
                onChange={handleChange}
                className="border-2 border-gray outline-none rounded-md p-2 mb-4"
                required
              />

              <label className="font-semibold text-black">Job Role</label>
              <select
                id="empRole"
                name="empRole"
                value={value.empRole}
                onChange={handleChange}
                className="border-2 border-gray outline-none rounded-md p-2 mb-4"
                required
              >
                <option value="Delivery Manager">Delivery Manager</option>
                <option value="Promotion Manager">Promotion Manager</option>
                <option value="Supplier Manager">Delivery Manager</option>
                <option value="Prescription Manager">Promotion Manager</option>
                <option value="Employee Manager">Delivery Manager</option>
                <option value="Payment Manager">Promotion Manager</option>
                <option value="Inventory Manager">Delivery Manager</option>
                <option value="User Manager">Promotion Manager</option>
              </select>

              <label className="font-semibold text-black">Marital Status</label>
              <div className="flex gap-6 flex-wrap">
                <div className="flex gap-2">
                  <input
                    onChange={handleChange}
                    checked={value.maritalStatus === "Maried"}
                    type="checkbox"
                    name="maritalStatus"
                    id="Maried"
                    className="w-5"
                  />
                  <span>Married</span>
                </div>
                <div className="flex gap-2">
                  <input
                    onChange={handleChange}
                    checked={value.maritalStatus === "Unmaried"}
                    type="checkbox"
                    name="maritalStatus"
                    id="Unmaried"
                    className="w-5"
                  />
                  <span>Unmarried</span>
                </div>
              </div>

              <label className="font-semibold text-black">Gender</label>
              <div className="flex gap-6 flex-wrap">
                <div className="flex gap-2">
                  <input
                    onChange={handleChange}
                    checked={value.gender === "Male"}
                    type="checkbox"
                    name="gender"
                    id="Male"
                    className="w-5"
                  />
                  <span>Male</span>
                </div>
                <div className="flex gap-2">
                  <input
                    onChange={handleChange}
                    checked={value.gender === "Female"}
                    type="checkbox"
                    name="gender"
                    id="Female"
                    className="w-5"
                  />
                  <span>Female</span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
