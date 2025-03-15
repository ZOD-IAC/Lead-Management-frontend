"use client";
import React, { useState } from "react";
import Register from "./Register";
import { useRouter } from "next/navigation";

const Index = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URI}/users/login`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      const data = await res.json();
      localStorage.setItem("token", data.token);

      switch (data.user.role) {
        case "user":
          router.push("/dashboard/leadManagement/new-leads");
          break;
        case "maker":
          router.push("/dashboard/maker/show-leads");
          break;
        case "checker":
          router.push("/dashboard/checker");
          break;
        default:
          router.push("/");
      }
    } catch (error) {
      console.log(error, "something is not right");
      alert("something went right");
    }
  };
  return (
    <div className="authpage flex h-screen bg-gradient-to-br from-slate-800/50 via-90% via-blue-400/30 to-white ">
      <div className="heading w-full h-full text-white bg-slate-900 flex flex-col items-center justify-center  rounded-r-full shadow-2xl shadow-black ">
        <div className="pb-10 text-6xl text-center font-bold">
          <h3>LogIn</h3>
          <p className="text-xl pt-3 font-normal ">Already have a account?</p>
        </div>
        <div className="p-10">
          <form
            className="text-xl font-normal flex flex-col gap-5 p-10s"
            method="post"
            onSubmit={handleSubmit}
          >
            <label className="flex flex-col gap-2 w-full">
              Email :{" "}
              <input
                name="email"
                onChange={handleChange}
                type="text"
                className="border-b-[2px] border-white  py-1 px-3 focus:border-blue-400 transition-all duration-500"
              />
            </label>
            <label className="shrink-0 flex flex-col w-full">
              Password :
              <input
                name="password"
                onChange={(e) => handleChange(e)}
                type="password"
                className="border-b-[2px] border-white   py-1 px-3 focus:border-blue-400 transition-all duration-500"
              />
            </label>
            <input
              className="px-6 tracking-[1px] py-3 bg-blue-700 rounded-md outline-none self-end text-sm"
              type="submit"
              value="Login"
            />
          </form>
        </div>
      </div>
      <Register />
    </div>
  );
};

export default Index;
