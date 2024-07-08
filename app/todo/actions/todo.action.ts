"use server";
import { prisma } from "@/libs/prismadb";
import { revalidatePath } from "next/cache";
import { TodoZodSchema } from "../schema/todo.zod.schema";
import { ZodError } from "zod";
import { auth } from "@clerk/nextjs/server";

export const createTodo = async (title: string) => {

  const { userId }: {userId: string | null} = auth();

  if(!userId){
    return{
      success:false,
      message: "user not found (backend)"
    }
  }

  try {
    TodoZodSchema.parse({ title });
    await prisma.todo.create({
      data: {
        title,
        userId,
      },
    });
    revalidatePath("/todo");
    return { success: true, message: "ToDo created successfully (backend)" };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false,
        message: error.issues[0].message,
      };
    }
    return {
      success: false,
      message: "Error creating todo (Backend)",
    };
  }
};

export const removeTodo = async (id: string) => {
  if (!id || !id.trim()) {
    return {
      error: "Id is required (Backend)",
    };
  }

  try {
    await prisma.todo.delete({
      where: {
        id,
      },
    });
    revalidatePath("/todo");
    return {
      success: true,
    };
  } catch (error) {
    return {
      error: "Error removing todo (backend)",
    };
  }
};
