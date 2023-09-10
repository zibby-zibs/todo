/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
import React, { useState, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import { Button } from "./ui/button";
import { useDates } from "@/lib/store/useDates";
import { BiTimeFive } from "react-icons/bi";
import { AiOutlineCalendar } from "react-icons/ai";
import { FaBell, FaSpinner } from "react-icons/fa";

type Props = {};

const CreateTodo = (props: Props) => {
  const setIsCreateTodo = useDates((state) => state.setIsCreateTodo);
  const setIsCompleted = useDates((state) => state.setIsCompleted);
  const [textValue, setTextValue] = useState("");
  const [allowPost, setAllowPost] = useState(false);
  const [loading, setLoading] = useState(false);

  const createTodo = async () => {
    if (textValue === "") return alert("please enter a task");
    setIsCompleted(false);
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      body: JSON.stringify({
        title: textValue,
        completed: false,
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json))
      .then(() => {
        setIsCompleted(true);
        setLoading(false);
        setIsCreateTodo(false);
      });
  };

  useEffect(() => {
    if (allowPost) {
      createTodo();
      setAllowPost(false);
    }

    return () => {
      setAllowPost(false);
      setIsCompleted(false);
    };
  }, [allowPost]);
  return (
    <main className="relative p-[20px] xl:border xl:border-gray-200 w-[394px] bg-white rounded-md">
      <IoIosClose
        className="absolute right-[20px] top-2 text-blck text-[20px] hidden xl:block"
        onClick={() => setIsCreateTodo(false)}
      />
      <article className="flex items-center gap-2 mt-[32px]">
        <h1 className="font-bold text-[18px] text-[#272727] font-workS capitalize">
          Add Task
        </h1>
      </article>
      <article className=" mt-[32px]">
        <textarea
          name=""
          id=""
          cols={30}
          rows={10}
          value={textValue}
          onChange={(e: any) => setTextValue(e.target.value)}
          className="resize-none bg-gray-50 border border-[#D0D5DD] rounded-lg w-full h-[140px] px-[14px] py-[12px]"
        ></textarea>
      </article>
      <aside className="flex justify-between items-center mt-[16px]">
        <Button variant={"outline"} className="text-black">
          <AiOutlineCalendar /> <p className="ml-2 text-gray-500">Today</p>
        </Button>
        <Button variant={"outline"} className="text-black">
          <BiTimeFive /> <p className="ml-2 text-gray-500">10:00am</p>
        </Button>
        <Button variant={"outline"} className="text-black">
          <BiTimeFive /> <p className="ml-2 text-gray-500">10:30am</p>
        </Button>
      </aside>
      <aside className="text-[#667085] font-workS text-[16px] flex justify-between items-center mt-[16px]">
        <div className="flex gap-2 items-center font-medium">
          <FaBell className="text-[16px]" />
          <p> 10 Minutes before</p>
        </div>
        <IoIosClose className="text-[24px]" />
      </aside>
      <aside className="flex  justify-between items-center mt-[34px]">
        <Button
          variant={"outline"}
          className="w-[162px]"
          onClick={() => setIsCreateTodo(false)}
        >
          Delete
        </Button>
        <Button
          variant={"default"}
          className="w-[162px]"
          onClick={() => setAllowPost(true)}
        >
          {loading ? <FaSpinner className="animate-spin" /> : <p>save</p>}
        </Button>
      </aside>
    </main>
  );
};

export default CreateTodo;
