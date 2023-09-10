/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDates } from "@/lib/store/useDates";
import { Loader2Icon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { BsFillMicFill } from "react-icons/bs";

type Props = {};

const InputMobile = (props: Props) => {
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
        setTextValue("");
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
    <form
      className="w-full h-fit rounded-lg flex gap-3 items-center border border-gray-300 p-[10px] bg-gray-50"
      onSubmit={() => setAllowPost(true)}
    >
      <input
        type="text"
        value={textValue}
        onChange={(e: any) => setTextValue(e.target.value)}
        className="w-full  border-0 outline-0 focus:outline-0 bg-gray-50 text-[#475467]"
        placeholder="Input task"
      />
      <div>
        {!loading ? (
          <BsFillMicFill className="text-[#3F5BF6] " />
        ) : (
          <Loader2Icon className="animate-spin text-[#3F5BF6] " />
        )}
      </div>
    </form>
  );
};

export default InputMobile;
