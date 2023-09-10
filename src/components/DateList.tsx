/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDates } from "@/lib/store/useDates";
import {
  scrollIntoView,
  elementScrollIntoView,
} from "seamless-scroll-polyfill";
import React, { useEffect, useState } from "react";

type Props = {};

const DateList = (props: Props) => {
  const results = useDates((state) => state.results);
  const dayy = useDates((state) => state.day);
  const date = useDates((state) => state.date);
  const allowScroll = useDates((state) => state.allowScroll);
  const setAllowScroll = useDates((state) => state.setAllowScroll);

  const scroller = () => {
    const itemElement = document.querySelector(`#item-${dayy}`);
    if (itemElement) {
      elementScrollIntoView(itemElement, {
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  };
  useEffect(() => {
    if (allowScroll) {
      scroller();
      setAllowScroll(false);
    }
  }, [allowScroll]);
  return (
    <main className="w-full">
      <p className="flex items-center gap-2 text-[16px] font-workS font-semibold mb-[16px]">
        {`${date?.getDate()} ${date?.toLocaleString("default", {
          month: "long",
        })}, ${date?.getFullYear().toString()}`}
      </p>
      <div className="flex items-center gap-4 overflow-x-auto scrollbar-none">
        {results?.map((day: DateRes) => (
          <div
            id={String(`item-${day?.dayOfWeekText}`)}
            key={day.date}
            className={`w-[62px] h-[68px] p-4 flex justify-center items-center rounded-lg bg-transparent border border-[#D0D5DD] ${
              dayy === day?.dayOfWeekText
                ? "!bg-[#3F5BF6] text-white"
                : "text-black bg-transparent"
            }`}
          >
            <article className="space-y-2 text-center text-[14px] font-semibold font-workS">
              <p>{day.dayOfWeekText}</p>
              <p>{day.dayOfWeek}</p>
            </article>
          </div>
        ))}
      </div>
    </main>
  );
};

export default DateList;
