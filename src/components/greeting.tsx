/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Button } from "../components/ui/button";
import { BsPlusLg } from "react-icons/bs";
import { useDates } from "@/lib/store/useDates";

type Props = {};

const Greeting = (props: Props) => {
  const setIsCreateTodo = useDates((state) => state.setIsCreateTodo);
  const setIsTodoDetail = useDates((state) => state.setIsTodoDetail);
  const setIsEditTodo = useDates((state) => state.setIsEditTodo);
  return (
    <main className="flex justify-between mb-[32px]">
      <article>
        <h1 className="text-[24px] xl:text-[30px] font-inter xl:font-workS text-black font-semibold">
          Good Morning!
        </h1>
        <p className="text-[#475467] font-workS text-[16px] font-normal">
          You&apos;ve got some tasks to do
        </p>
      </article>
      <Button
        className="flex gap-2 items-center"
        onClick={() => {
          setIsTodoDetail(false);
          setIsEditTodo(false);
          setIsCreateTodo(true);
        }}
      >
        <div>
          <BsPlusLg className="text-white text-xl" />
        </div>
        <p className="hidden font-workS text-[16px] xl:block text-white">
          Create new task
        </p>
      </Button>
    </main>
  );
};

export default Greeting;
