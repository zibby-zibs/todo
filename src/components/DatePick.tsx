/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import { Calendar } from "./ui/calendar";
import { useDates } from "@/lib/store/useDates";
import moment from "moment";

type Props = {};

const DatePick = (props: Props) => {
  const date = useDates((state) => state.date);
  const setDate = useDates((state) => state.setDate);
  const year = useDates((state) => state.year);
  const setYear = useDates((state) => state.setYear);
  const month = useDates((state) => state.month);
  const setMonth = useDates((state) => state.setMonth);
  const setResults = useDates((state) => state.setResults);
  const setDay = useDates((state) => state.setDay);
  const SetAllowScroll = useDates((state) => state.setAllowScroll);

  function getDaysInMonthWithWeekdays(
    year: number | undefined,
    month: number | undefined
  ) {
    const days: DateRes[] | null = [];
    const startDate = moment({ year, month, day: 1 });
    const endDate = moment(startDate).endOf("month");

    while (startDate.isSameOrBefore(endDate, "day")) {
      days.push({
        date: startDate.format("YYYY-MM-DD"),
        dayOfWeek: startDate.format("ddd"),
        dayOfWeekText: startDate.date(),
      });
      startDate.add(1, "day");
    }

    setResults(days);
  }

  useEffect(() => {
    setYear(date?.getFullYear());
    setMonth(date?.getMonth());

    getDaysInMonthWithWeekdays(year, month);
    setDay(date?.getDate());
    console.log(date);
  }, [date]);
  return (
    <main className="h-fit w-fit" onClick={() => SetAllowScroll(true)}>
      <Calendar
        mode="single"
        selected={date}
        onDayClick={setDate}
        className="rounded-md border"
      />
    </main>
  );
};

export default DatePick;
