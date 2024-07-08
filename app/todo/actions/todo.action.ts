"use server";
import { prisma } from "@/libs/prismadb";
import { revalidatePath } from "next/cache";

export const createTodo = async (title: string) => {
  if (!title || !title.trim()) {
    return { error: "Title is required" };
  }

  try {
    await prisma.todo.create({
      data: {
        title,
      },
    });
    revalidatePath("/todo");
    return {success: true}
  } catch (error) {
    return{
        error:"Error creating todo (Backend)"
    }
  }
};

export const removeTodo = async(id:string) =>{
  if(!id || !id.trim()){
    return {
      error:"Id is required (Backend)"
    }
  }

  try {
    await prisma.todo.delete({
      where:{
        id,
      }
    })
    revalidatePath("/todo")
    return{
      success: true,
    }
  } catch (error) {
    return{
      error: "Error removing todo (backend)"
    }
  }
}
