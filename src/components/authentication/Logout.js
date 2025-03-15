"use client";
import { useRouter } from "next/navigation";
import { handleClientScriptLoad } from "next/script";
import React, { useEffect, useState } from "react";

const Logout = () => {
  const [token, setToken] = useState("");
  const router = useRouter();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <button
      className="text-[1rem] bg-red-600 px-2 py-1 rounded"
      onClick={handleLogOut}
    >
      Logout
    </button>
  );
};

export default Logout;
