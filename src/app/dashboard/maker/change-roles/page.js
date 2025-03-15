"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logout from "@/components/authentication/Logout";

const ShowLead = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [token, setToken] = useState("");

  // Handle lead approval/rejection
  const handleClick = async (id, role) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URI}/leads/${id}/change-role/${role}`,
        {
          method: "PATCH",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) throw new Error("Failed to update status");
      // Refresh Data after update
      fetchData(token);
    } catch (error) {
      console.error("Error updating lead status:", error);
    }
  };

  const fetchData = async (authToken) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URI}/leads/get-users`,
      {
        headers: {
          Authorization: authToken,
        },
      }
    );
    const data = await res.json();
    setData(data);
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (!savedToken) return router.push("/");
    setToken(savedToken);
    fetchData(savedToken);
  }, []);

  return (
    <div className="w-full min-h-screen bg-slate-100">
      <h3 className=" w-full bg-slate-900 text-white  text-2xl font-semibold px-4 p-6 flex items-center justify-between">
        Maker Dashboard
        <Logout />
      </h3>
      <div className="flex w-full">
        <nav className="w-1/4 min-h-screen bg-slate-50 flex flex-col justify-between">
          <div className="  text-black p-10  font-bold ">
            <h3 className=" text-3xl">Options</h3>
            <ul className="flex flex-col gap-5 mt-5">
              <li className="px-1 pl-5 text-blue-800 hover:underline hover:underline-offset-2 transition-all duration-300 ">
                <Link href={"/dashboard/maker/change-roles"}>
                  Change Users Roles
                </Link>
              </li>
              <li className="px-1 pl-5 text-blue-800 hover:underline hover:underline-offset-2 transition-all duration-300 ">
                <Link href={"/dashboard/maker/show-leads"}>Show Leads</Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="w-3/4 min-h-screen bg-white rounded-lg shadow-md p-6">
          <h4 className="text-4xl font-medium mb-4">Change User Roles</h4>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 ">
                <tr className="">
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Role</th>
                  <th className="p-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.length == 0 ? (
                  <tr>
                    <td> No User found </td>
                  </tr>
                ) : (
                  data.map((item, id) => {
                    return (
                      <tr className="border-t" key={id}>
                        <td className="p-4">{item.name}</td>
                        <td className="p-4">{item.email}</td>
                        <td className="p-4 font-semibold">
                          {item.role.toUpperCase()}
                        </td>
                        <td className="p-4">
                          <span className="flex items-center gap-2.5">
                            <button
                              className="bg-blue-400  px-2 py-1 text-white hover:bg-blue-600 rounded-l w-20 border rounded"
                              onClick={() => {
                                handleClick(item._id, "maker");
                              }}
                            >
                              Maker
                            </button>

                            <button
                              className="bg-green-500 px-2 py-1 text-white hover:bg-green-800 rounded-r w-20 border rounded "
                              onClick={() => {
                                handleClick(item._id, "checker");
                              }}
                            >
                              Checker
                            </button>

                            <button
                              className="bg-red-500 px-2 py-1 text-white hover:bg-red-800 rounded-r w-20 border rounded "
                              onClick={() => {
                                handleClick(item._id, "user");
                              }}
                            >
                              User
                            </button>
                          </span>
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
