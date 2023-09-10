/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDates } from "@/lib/store/useDates";
import React from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";
import { IoIosClose } from "react-icons/io";
import { Button } from "./ui/button";
type Props = {};

const TodoDetails = (props: Props) => {
  const detail = useDates((state) => state.detail);
  const date = useDates((state) => state.date);
  const duration = useDates((state) => state.duration);
  const setIsTodoDetail = useDates((state) => state.setIsTodoDetail);
  const setTodoEdit = useDates((state) => state.setTodoEdit);
  const setIsEditTodo = useDates((state) => state.setIsEditTodo);

  const handleEdit = (detail: string | undefined, date: any) => {
    const concat = `${detail}\n\n${date}`;
    setTodoEdit(concat);
    setIsTodoDetail(false);
    return setIsEditTodo(true);
  };

  return (
    <main className="relative p-[20px] xl:border xl:border-gray-200 w-[394px] bg-white rounded-md">
      <IoIosClose
        className="absolute right-[20px] top-2 text-blck text-[20px] hidden xl:block"
        onClick={() => setIsTodoDetail(false)}
      />
      <article className="flex items-center gap-2 mt-[32px]">
        <h1 className="font-bold text-[18px] text-[#272727] font-workS capitalize">
          {detail?.title}
        </h1>
      </article>
      <article className=" mt-[32px]">
        <p className="flex items-center gap-2 text-[16px] font-workS font-medium">
          <AiOutlineCalendar className="text-[#3F5BF6] text-[20px]" />

          {`${date?.getDate()} ${date?.toLocaleString("default", {
            month: "long",
          })}, ${date?.getFullYear().toString().slice(-2)}`}
        </p>

        <p className="flex gap-2 font-workS text-[#272727] text-[16px] font-medium items-center uppercase">
          <BiTimeFive className="text-[#3F5BF6] text-[20px]" />
          {duration}
        </p>
      </article>
      <aside className="flex  justify-between items-center mt-[34px]">
        <Button
          variant={"outline"}
          className="w-[162px]"
          onClick={() => setIsTodoDetail(false)}
        >
          Delete
        </Button>
        <Button
          variant={"default"}
          className="w-[162px]"
          onClick={() => handleEdit(detail?.title, duration)}
        >
          Edit
        </Button>
      </aside>
    </main>
  );
};

export default TodoDetails;
