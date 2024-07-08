import { prisma } from "@/libs/prismadb";
import FormTodo from "./components/Form.todo";
import ListTodo from "./components/List.Todo";


const TodoPage = async () => {
  const todos = await prisma.todo.findMany();


  return (
    <div className="space-y-5">
      <h1 className="text-center text-3xl my-10">Todos</h1>
      <FormTodo/>
      <ListTodo todos={todos}/>
      
    </div>
  );
};

export default TodoPage;
