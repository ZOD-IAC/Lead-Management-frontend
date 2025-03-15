import React, { useState } from "react";
import { useRouter } from "next/navigation";
const Register = () => {
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
        `${process.env.NEXT_PUBLIC_API_URI}/users/register`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      const data = await res.json();
      setUserData({ name: "", email: "", password: "" });
      alert(data.message);
    } catch (error) {
      console.log(error);
      alert("something went wrong");
    }
  };

  return (
    <div className="heading w-full h-full flex flex-col items-center justify-center ">
      <div className="pb-10 text-6xl text-center font-bold">
        <h3>Register </h3>
        <p className="text-xl pt-3 font-normal ">Create new Account ?</p>
      </div>
      <div className="">
        <form
          className="text-xl font-normal flex flex-col gap-5 p-10"
          method="post"
          onSubmit={handleSubmit}
        >
          <label className=" shrink-0 flex flex-col">
            Name :
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              className="border-b-[2px] border-black  py-1 px-3 focus:border-blue-400 transition-all duration-500"
            />
          </label>
          <label className=" shrink-0 flex flex-col">
            Email :
            <input
              type="text"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="border-b-[2px] border-black  py-1 px-3 focus:border-blue-400 transition-all duration-500"
            />
          </label>
          <label className=" shrink-0 flex flex-col">
            Password :
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              className="border-b-[2px] border-black  py-1 px-3 focus:border-blue-400 transition-all duration-500"
            />
          </label>
          <input
            className="px-6 py-3 w-fit bg-blue-700 rounded-md outline-none self-end text-white text-sm"
            type="submit"
            value={"Register"}
          />
        </form>
      </div>
    </div>
  );
};

export default Register;
