/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { useDates } from "@/lib/store/useDates";
import { Loader2Icon } from "lucide-react";

type Props = {};

const ToDos = (props: Props) => {
  const setDetail = useDates((state) => state.setDetail);
  const setIsTodoDetail = useDates((state) => state.setIsTodoDetail);
  const isCompleted = useDates((state) => state.isCompleted);
  const setDuration = useDates((state) => state.setDuration);
  const [todos, setTodos] = useState<TodoRes[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 7;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const subset = todos?.slice(startIndex, endIndex);

  const handlePageChange = (selectedPage: {
    selected: React.SetStateAction<number>;
  }) => {
    setCurrentPage(selectedPage.selected);
  };

  const previous = () => {
    return (
      <div className="flex gap-2 items-center">
        <FiArrowLeft />
        <p className="font-workS text-[14px] text-black font-semibold">
          Previous
        </p>
      </div>
    );
  };
  const next = () => {
    return (
      <div className="flex gap-2 items-center">
        <p className="font-workS text-[14px] text-black font-semibold">Next</p>
        <FiArrowRight />
      </div>
    );
  };

  useEffect(() => {
    const getTodods = async () => {
      setLoading(true);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const data = await response.json();
      setTodos(data);
      setLoading(false);
      setTotalPages(Math.ceil(data?.length / itemsPerPage));
    };
    getTodods();
  }, []);
  useEffect(() => {
    const getTodods = async () => {
      setLoading(true);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const data = await response.json();
      setTodos(data);
      setLoading(false);
      setTotalPages(Math.ceil(data?.length / itemsPerPage));
    };

    if (isCompleted) {
      getTodods();
    }
  }, [isCompleted]);

  const durations = [
    "8:00am - 8:30am",
    "8:30am - 9:00am",
    "9:00am - 9:30am",
    "10:00am - 10:30am",
    "10:30am - 11:00am",
    "11:00am - 11:30am",
    "11:30am - 12:00pm",
    "12:00pm - 12:30pm",
    "12:30pm - 1:00pm",
    "1:00pm - 1:30pm",
  ];
  return (
    <main className="mt-[32px]">
      <h1 className="font-workS text-[16px] font-semibold text-black mb-[16px]">
        ToDos
      </h1>

      {!loading ? (
        <article className="space-y-4">
          {subset?.map((todo, i: number) => {
            const duration = durations[i % durations.length];
            return (
              <div
                key={todo.id}
                className="bg-[#F9FAFB] border-b border-gray-200 w-full flex items-center justify-between px-6 py-4"
              >
                <div className="flex gap-2 items-center">
                  <input type="checkbox" onClick={() => {}} />
                  <article
                    className="cursor-pointer ml-[12px]"
                    onClick={() => {
                      setDetail(todo);
                      setIsTodoDetail(true);
                      setDuration(duration);
                    }}
                  >
                    <h1 className="font-workS text-[#101828] text-[14px] font-medium">
                      {todo.title}
                    </h1>
                    <p className="font-workS font-normal text-[#475467]">
                      {duration}
                    </p>
                  </article>
                </div>
                <h1 className="font-workS text-[#475467] text-[14px] font-normal">
                  Today
                </h1>
              </div>
            );
          })}
          <ReactPaginate
            pageCount={totalPages}
            onPageChange={handlePageChange}
            forcePage={currentPage}
            previousLabel={previous()}
            nextLabel={next()}
            breakLabel={"..."}
            containerClassName={
              "flex gap-2 items-center justify-center min-w-full font-workS text-[14px] font-medium relative max-w-full overflow-x-auto pl-[100px] sm:pl-0"
            }
            activeClassName={"bg-gray-200 rounded-full py-[12px] px-[18px]"}
            previousClassName=" xl:absolute xl:left-0"
            nextClassName="xl:absolute xl:right-0"
            pageClassName="py-[12px] px-[18px]"
          />
        </article>
      ) : (
        <div className="mt-4 w-full flex justify-center min-h-[200px] items-center">
          <Loader2Icon className="animate-spin" />
        </div>
      )}
    </main>
  );
};

export default ToDos;
