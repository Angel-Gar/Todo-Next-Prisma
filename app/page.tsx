import { prisma } from "@/libs/prismadb";
import FormTodo from "./todo/components/Form.todo";
import ListTodo from "./todo/components/List.Todo";
import { currentUser, User } from "@clerk/nextjs/server";
import { SignOutButton } from "@clerk/nextjs";
import { CiLogout } from "react-icons/ci";

const TodoPage = async () => {
  const user: User | null = await currentUser();

  if (!user) {
    return <div>Loading...</div>;
  }

  const todos = await prisma.todo.findMany({
    where: {
      userId: user.id,
    },
  });

  return (
    <div className="space-y-5">
      <h1 className="text-center text-3xl my-10">Todos de {user.username}</h1>
      <SignOutButton>
        <button><CiLogout /></button>
      </SignOutButton>
      <FormTodo />
      <ListTodo todos={todos} />
    </div>
  );
};

export default TodoPage;
