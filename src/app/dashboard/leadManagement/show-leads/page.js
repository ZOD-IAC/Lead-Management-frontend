"use client";
import React, { useEffect, useState } from "react";
import Navigation from "@/components/common/leadManagement/Navigation";
import Logout from "@/components/authentication/Logout";
import { useRouter } from "next/navigation";

const ShowLead = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return router.push("/");

    const fetchData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/leads`, {
        headers: {
          Authorization: token,
        },
      });
      const data = await res.json();

      setData(data);
    };
    fetchData();
  }, []);
  return (
    <div className="w-full min-h-screen bg-slate-100">
      <h3 className=" w-full bg-slate-900 text-white  text-2xl font-semibold px-4 p-6 flex items-center justify-between">
        Lead Management Dashboard
        <Logout />
      </h3>
      <div className="flex w-full">
        <Navigation />
        <div className="showleads w-3/4 min-h-screen bg-white rounded-lg shadow-md p-6">
          <h4 className="text-4xl font-medium mb-4">All Leads</h4>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Salary</th>
                  <th className="p-4 text-left">Loan Amount</th>
                  <th className="p-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.length == 0 ? (
                  <tr className="border-t">
                    <td className="p-4">No data found</td>
                  </tr>
                ) : (
                  data.map((item, id) => {
                    return (
                      <tr className="border-t" key={id}>
                        <td className="p-4">{item.name}</td>
                        <td className="p-4">{item.email}</td>
                        <td className="p-4">{item.salary}</td>
                        <td className="p-4">{item.loanAmount}</td>
                        <td className="p-4">
                          {item.status == "pending" ? (
                            <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded">
                              {item.status}
                            </span>
                          ) : item.status == "approved" ? (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                              {item.status}
                            </span>
                          ) : (
                            <span className="bg-red-100 text-red-800 px-2 py-1 rounded">
                              {item.status}
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowLead;
