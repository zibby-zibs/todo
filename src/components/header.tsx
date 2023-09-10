/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
import React, { useState, useEffect } from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import { BiBell } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";

type Props = {};

const Header = (props: Props) => {
  return (
    <header className="flex justify-between py-4 xl:py-5">
      <aside className="font-inter text-black font-bold text-[24px]">
        <section className="flex items-center gap-1">
          <img src="/logo.svg" alt="" />
          <h1>ToDo</h1>
        </section>
      </aside>
      <aside className="flex gap-[10px] items-center">
        <div className="hidden lg:flex lg:items-center lg:gap-[24px]">
          <div>
            <BiBell className="w-[20px] h-[20px] text-gray-500 cursor-pointer" />
          </div>
          <div>
            <IoSettingsOutline className="w-[20px] h-[20px] text-gray-500 cursor-pointer" />
          </div>
          <div>
            <FaUserCircle className="w-[30px] h-[30px] text-gray-500 cursor-pointer" />
          </div>
        </div>

        <HiMenuAlt1 className="lg:hidden text-gray-500 w-[20px] h-[20px] cursor-pointer" />
      </aside>
    </header>
  );
};

export default Header;
