"use client";

import { useRef } from "react";
import { createTodo } from "../actions/todo.action";
import ButtonForm from "./ButtonForm.todo";
import toast from "react-hot-toast";

const FormTodo = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (data: FormData) => {
    const title = data.get("title") as string;

    if (!title || !title.trim()) {
      return toast.error("Title is required");
    }

    const res = await createTodo(title);

    if(res.error){
        return toast.error(res.error)
    }
    
    formRef.current?.reset();

    toast.success("ToDo added")
  };

  return (
    <form ref={formRef} action={handleSubmit} className="flex">
      <input
        type="text"
        name="title"
        className="border rounded border-gray-400 mr-2 p-2 w-full"
      />
      <ButtonForm />
    </form>
  );
};

export default FormTodo;
