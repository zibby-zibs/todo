/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useRef } from "react";
import moment from "moment";
import { Calendar } from "./components/ui/calendar";
import Header from "./components/header";
import Greeting from "./components/greeting";
import ToDos from "./components/ToDos";
import DatePick from "./components/DatePick";
import DateList from "./components/DateList";
import { useDates } from "./lib/store/useDates";
import TodoDetails from "./components/TodoDetails";
import CreateTodo from "./components/CreateTodo";
import EditTodo from "./components/EditTodo";

function App() {
  const isCreateTodo = useDates((state) => state.isCreateTodo);
  const isTodoDetail = useDates((state) => state.isTodoDetail);
  const isEditTodo = useDates((state) => state.isEditTodo);
  const setIsCreateTodo = useDates((state) => state.setIsCreateTodo);
  const setIsTodoDetail = useDates((state) => state.setIsTodoDetail);
  const setIsEditTodo = useDates((state) => state.setIsEditTodo);
  const modalRefs = useRef<HTMLElement>(null);

  // function getDaysInMonthWithWeekdays(
  //   year: number | undefined,
  //   month: number | undefined
  // ) {
  //   const days: DateRes[] | null = [];
  //   const startDate = moment({ year, month, day: 1 });
  //   const endDate = moment(startDate).endOf("month");

  //   while (startDate.isSameOrBefore(endDate, "day")) {
  //     days.push({
  //       date: startDate.format("YYYY-MM-DD"),
  //       dayOfWeek: startDate.format("ddd"),
  //       dayOfWeekText: startDate.day(),
  //     });
  //     startDate.add(1, "day");
  //   }

  //   setResult(days);
  // }

  // useEffect(() => {
  //   setYear(date?.getFullYear());
  //   setMonth(date?.getMonth());

  //   getDaysInMonthWithWeekdays(year, month);
  //   console.log(date);
  // }, [date]);

  const checkBeforeClose = (event: any) => {
    if (modalRefs.current && !modalRefs.current.contains(event.target)) {
      setIsCreateTodo(false);
      setIsEditTodo(false);
      setIsTodoDetail(false);
    }
  };

  const isInsideAside = (target: any, ref: any) => {
    if (!ref.current) return false;
    return ref.current.contains(target);
  };

  // const checkBeforeClose = (event: any) => {
  //   // if (
  //   //   // !isTodoDetail &&
  //   //   // !isCreateTodo &&
  //   //   // !isEditTodo &&
  //   //   !isInsideAside(event.target, modalRefs)
  //   // ) {
  //   //   setIsCreateTodo(false);
  //   //   setIsEditTodo(false);
  //   //   setIsTodoDetail(false);
  //   //   // Close the modal or perform your desired action
  //   // }

  //   if (isInsideAside(event.target, modalRefs)) {
  //     setIsCreateTodo(false);
  //   }
  // };
  return (
    <main className="px-4 xl:px-5">
      <Header />
      <Greeting />
      <section className="relative flex flex-col xl:flex-row gap-[40px] items-start justify-center">
        <aside className="w-full xl:max-w-[840px] overflow-x-auto">
          <DateList />
          <ToDos />
        </aside>
        <aside>
          {(isTodoDetail || isCreateTodo || isEditTodo) && (
            <div
              className="bg-black/40 fixed inset-0 w-screen h-screen xl:hidden cursor-pointer z-10"
              onClick={(event: any) => {
                checkBeforeClose(event);
              }}
            ></div>
          )}
          {/* <div className="fixed bottom-0 left-0 transition-all duration-500 ease-in-out min-h-[80vh] max-h-[80vh] min-w-[100vw]  max-w-screen overflow-y-auto bg-white xl:relative flex justify-center xl:min-w-fit xl:max-w-none"> */}
          {!isTodoDetail && !isCreateTodo && !isEditTodo && (
            <aside
              ref={modalRefs}
              className="xl:drop-shadow-xl bg-white rounded-md hidden xl:block "
            >
              <DatePick />
            </aside>
          )}
          {isTodoDetail && !isCreateTodo && (
            <aside
              ref={modalRefs}
              className="xl:drop-shadow-xl bg-white rounded-3xl xl:rounded-md fixed bottom-0 left-0 min-h-[80vh] max-h-[80vh] w-full flex justify-center xl:block xl:relative xl:min-h-fit xl:max-h-0 xl:w-fit transition-all duration-500 ease-in-out z-40 xl:z-0"
            >
              <TodoDetails />
            </aside>
          )}
          {isCreateTodo && !isTodoDetail && (
            <aside
              ref={modalRefs}
              className="xl:drop-shadow-xl bg-white rounded-3xl xl:rounded-md fixed bottom-0 left-0 min-h-[80vh] max-h-[80vh] w-full flex justify-center xl:block xl:relative xl:min-h-fit xl:max-h-0 xl:w-fit overflow-y-auto transition-all duration-500 ease-in-out z-40 xl:z-0"
            >
              <CreateTodo />
            </aside>
          )}
          {!isTodoDetail && isEditTodo && (
            <aside
              ref={modalRefs}
              className="xl:drop-shadow-xl bg-white rounded-3xl xl:rounded-md fixed bottom-0 left-0 min-h-[80vh] max-h-[80vh] w-full flex justify-center xl:block xl:relative xl:min-h-fit xl:max-h-0 xl:w-fit overflow-y-auto transition-all duration-500 ease-in-out z-40 xl:z-0"
            >
              <EditTodo />
            </aside>
          )}
          {/* </div> */}
        </aside>
      </section>
      {/* <Calendar
        mode="single"
        selected={date}
        onDayClick={setDate}
        className="rounded-md border"
      />
      <div>
        {result?.map((day: DateRes) => (
          <div key={day.date}>
            <span>{day.date}</span>
            <span>{day.dayOfWeek}</span>
            <span>{day.dayOfWeekText}</span>
          </div>
        ))}
      </div> */}
    </main>
  );
}

export default App;
