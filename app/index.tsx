import { Box } from '@/components/ui/box';
import Header from "@/components/Header/Header";
import CreateTodo from "../components/CreateTodo/CreateTodo";
import {useEffect, useState} from "react";
import TodoList from "@/components/TodoList/TodoList";

export default function Home() {
    const [todos,setTodos] = useState([])

    const handleCreateTodo = (title:string) => {
        const newTodo = {
            id: Date.now(),
            title: title,
            status:'todo'
        };
        setTodos([...todos,newTodo])
    };
    useEffect(() => {
        console.log("Güncel Todolar:", todos);
    }, [todos]);

    const handleUpdateTodos = (id: number , newStatus:string) => {
        const updated = todos.map(todo => todo.id === id ? {...todo,status :newStatus} : todo);
        setTodos(updated)
    };

    return (
        <Box className="flex-1 bg-slate-900 px-4 pt-12">
            <Header todoCount={todos.filter(t => t.status !== 'done').length} />
            <CreateTodo createTodo={handleCreateTodo} />
            <TodoList todos={todos} updateStatus={handleUpdateTodos} />
        </Box>
    );
}
