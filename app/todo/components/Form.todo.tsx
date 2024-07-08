"use client";

import { useRef } from "react";
import { createTodo } from "../actions/todo.action";
import ButtonForm from "./ButtonForm.todo";
import toast from "react-hot-toast";
import { TodoZodSchema } from "../schema/todo.zod.schema";
import { ZodError } from "zod";

const FormTodo = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (data: FormData) => {
    const title = data.get("title") as string;

    try {
      //TodoZodSchema.parse({title})

      const responseBackend = await createTodo(title);

      if(!responseBackend.success){
        return toast.error(responseBackend.message)
      }

    } catch (error) {
      if(error instanceof ZodError){
        console.log(error.issues);
        return error.issues.map((issue) => toast.error(issue.message));
      }
      
    }finally{
      formRef.current?.reset();
    }
    
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
