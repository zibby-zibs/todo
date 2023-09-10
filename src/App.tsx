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

  const checkBeforeClose = (event: any) => {
    if (modalRefs.current && !modalRefs.current.contains(event.target)) {
      setIsCreateTodo(false);
      setIsEditTodo(false);
      setIsTodoDetail(false);
    }
  };

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
        </aside>
      </section>
    </main>
  );
}

export default App;
