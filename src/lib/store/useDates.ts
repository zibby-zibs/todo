/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";

interface StoreState {
    date: Date | undefined;
    setDate: (date: Date) => void;
    year: number | undefined;
    setYear: (year: number | undefined) => void;
    month: number | undefined; 
    setMonth: (month: number | undefined) => void;  
    results: DateRes[] | undefined;
    setResults: (result: DateRes[]) => void;
    day: number | undefined;
    setDay: (day: number | undefined) => void;
    allowScroll: boolean;
    setAllowScroll: (allowScroll: boolean) => void;
    detail: TodoRes | undefined;
    setDetail: (detail: TodoRes | undefined) => void;
    isTodoDetail: boolean;
    setIsTodoDetail: (isTodoDetail: boolean) => void;
    isCreateTodo: boolean;
    setIsCreateTodo: (isCreateTodo: boolean) => void;
    duration : string | undefined;
    setDuration: (duration: string) => void;
    isEditTodo: boolean;
    setIsEditTodo: (isEditT: boolean) => void;
    isEdit: boolean;
    setIsEdit: (isEdit: boolean) => void;
    todoEdit: any;
    setTodoEdit: (todoEdit: any) => void;
    isCompleted: boolean;
    setIsCompleted: (isCompleted: boolean) => void;
}

export const useDates = create<StoreState>()((set) => ({
  date: new Date(),
  setDate: (date: Date) =>set({date: date}),
  year: undefined,
  setYear: (year: number | undefined) => set({year: year}),
  month: undefined,
  setMonth: (month: number | undefined) => set({month: month}),
  results: [],
  setResults: (result: DateRes[])=>set({results: result}) ,
  day: undefined,
  setDay: (day: number | undefined) => set({day: day}),
  allowScroll: false,
  setAllowScroll: (allowScroll: boolean) => set({allowScroll: allowScroll}),
  detail: undefined,
  setDetail: (detail: TodoRes | undefined) => set({detail: detail}),
  isTodoDetail: false,
  setIsTodoDetail: (isTodoDetail: boolean) => set({isTodoDetail: isTodoDetail}),
  isCreateTodo: false,
  setIsCreateTodo: (isCreateTodo: boolean) => set({isCreateTodo: isCreateTodo}),
  duration: undefined,
  setDuration: (duration: string) => set({duration: duration}),
  isEditTodo: false,
  setIsEditTodo: (isEditTodo: boolean) => set({isEditTodo: isEditTodo}),
  isEdit: false,
  setIsEdit: (isEdit: boolean) => set({isEdit: isEdit}),
  todoEdit: null,
  setTodoEdit: (todoEdit: any) => set({todoEdit: todoEdit}),
  isCompleted: false,
  setIsCompleted: (isCompleted: boolean) => set({isCompleted: isCompleted})
}));