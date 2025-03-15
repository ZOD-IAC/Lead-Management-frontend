"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Navigation from "@/components/common/leadManagement/Navigation";
import Logout from "@/components/authentication/Logout";
import { useRouter } from "next/navigation";

const AddNewLeads = () => {
  const router = useRouter();
  const [leadData, setLeadData] = useState({
    name: "",
    email: "",
    salary: "200000",
    loanAmount: "",
    document: null,
    status: "pending",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/");
  }, [router]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "document") {
      setLeadData((prev) => ({ ...prev, document: files[0] }));
    } else {
      setLeadData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) return router.push("/");

      const formData = new FormData();
      Object.entries(leadData).forEach(([key, value]) =>
        formData.append(key, value)
      );

      const res = await fetch("http://localhost:5000/api/leads", {
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: formData,
      });

      if (res.ok) {
        alert("Lead added successfully!");
        router.push("/dashboard/leadManagement/new-leads");
        setLeadData({
          name: "",
          email: "",
          salary: "200000",
          loanAmount: "",
          document: null,
          status: "pending",
        });
      } else {
        alert("Failed to add lead.");
      }
    } catch (error) {
      console.error("Error submitting lead:", error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-100">
      <h3 className=" w-full bg-slate-900 text-white  text-2xl font-semibold px-4 p-6 flex items-center justify-between">
        Lead Management Dashboard
        <Logout />
      </h3>
      <div className="flex">
        <Navigation />
        <div className="newLead w-3/4 min-h-screen bg-white rounded-lg shadow-md p-6">
          <h4 className="text-4xl font-medium mb-4">Add New Lead</h4>
          <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
            <label className="flex flex-col gap-1 text-md font-bold">
              Name:
              <input
                onChange={handleChange}
                name="name"
                type="text"
                placeholder="Full Name"
                className="w-2/3 border p-2 rounded font-normal text-sm"
                value={leadData.name}
                required
              />
            </label>

            <label className="flex flex-col gap-1 text-md font-bold">
              Email:
              <input
                onChange={handleChange}
                name="email"
                type="email"
                placeholder="Email"
                className="w-2/3 border p-2 rounded font-normal text-sm"
                value={leadData.email}
                required
              />
            </label>

            <label className="flex flex-col gap-1 text-md font-bold">
              Salary:
              <select
                onChange={handleChange}
                name="salary"
                className="w-2/3 border p-2 rounded font-normal text-sm"
                value={leadData.salary}
              >
                <option value="200000">Below 2,00,000</option>
                <option value="500000">2,00,000 - 5,00,000</option>
                <option value="1000000">5,00,000 - 10,00,000</option>
                <option value="1500000">10,00,000 - 15,00,000</option>
                <option value="2000000">Above 15,00,000</option>
              </select>
            </label>

            <label className="flex flex-col gap-1 text-md font-bold">
              Loan Amount:
              <input
                onChange={handleChange}
                name="loanAmount"
                type="number"
                placeholder="Loan Amount"
                className="w-2/3 border p-2 rounded font-normal text-sm"
                value={leadData.loanAmount}
                required
              />
            </label>

            <label className="flex flex-col gap-1 text-md font-bold">
              Document:
              <input
                onChange={handleChange}
                name="document"
                type="file"
                className="w-2/3 border p-2 rounded font-normal text-sm"
                required
              />
            </label>

            <label className="flex flex-col gap-1 text-md font-bold">
              Status:
              <select
                name="status"
                className="w-2/3 border p-2 rounded font-normal text-sm"
                value="pending"
                disabled
              >
                <option>Pending</option>
              </select>
            </label>

            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mt-10 w-fit"
            >
              Add Lead
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewLeads;
