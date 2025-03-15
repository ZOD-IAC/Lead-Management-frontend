"use client";
import React from "react";
import Link from "next/link";

const Navigation = () => {
  return (
    <nav className="w-1/4 min-h-screen bg-slate-50 flex flex-col justify-between">
      <div className="  text-black p-10  font-bold ">
        <h3 className=" text-3xl">Options</h3>
        <ul className="flex flex-col gap-5 mt-5">
          <li className="px-1 pl-5 text-blue-800 hover:underline hover:underline-offset-2 transition-all duration-300 ">
            <Link href={"/dashboard/leadManagement/new-leads"}>New leads</Link>
          </li>
          <li className="px-1 pl-5 text-blue-800 hover:underline hover:underline-offset-2 transition-all duration-300 ">
            <Link href={"/dashboard/leadManagement/show-leads"}>
              Show leads
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
