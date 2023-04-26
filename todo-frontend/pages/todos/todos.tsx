import Link from "next/link"
import { useState, useEffect } from "react"
import axios from '@/lib/axios'
import { setRequestMeta } from "next/dist/server/request-meta";

export default function FirstPost(){

    const [todos, setTodos] = useState([]);
    const [title,setTitle] = useState('')
    const [todoid,setTodoId] = useState();

    useEffect(() => {
        fetchTodos()
    },[])

    function fetchTodos(){
        axios.get('api/todos').then((res) => {
            setTodos(res.data)
        })
    }

    function titleChange(e){
        setTitle(e.target.value)
    }

    function submitForm(e){
        e.preventDefault()
        let formData = new FormData()
        if(title != ''){
            formData.append('title', title)
            formData.append('completed', 0)
            let url = 'api/todos'
            if(todoid != ""){
                url = 'api/todos/'+todoid;
                formData.append('_method','put')
            }
            axios.post(url, formData).then((res) => {
                setTitle('')
                fetchTodos()
                setTodoId('')
            })

        }else{
            alert('the title is required')
        }
        
    
    }

    function editTodo(id){
        setTodoId(id)
        todos.map((todo,index) => {
            if(todo.id === id){
                setTitle(todo.title)
            }
        })

    }

    function deleteTodo(id){
        let params = {'_method': 'delete'};
        axios.post('api/todos/'+id, params).then((res) => {
            setTitle('')
            fetchTodos()
            setTodoId('')
        })
    }

    return (
        <div className="h-screen">
            <div className="max-w-4xl h-screen bg-gray-800 shadow mx-auto">

                <div className=" border-b flex justify-between items-center p-7">
                    
                    <h1 className="text-4xl">Todos App</h1>
                    <p className="text-xs font-mono text-sky-600">Save your daily todos here</p>
                </div>

                <div className="text-center m-2">
                    <form onSubmit={submitForm} className="px-10" method="POST">
                        <input className="bg-transparent border border-gray-200/40 rounded-full w-5/6 p-1 px-5
                         focus:outline-none placeholder:text-gray-300/30"
                          placeholder="title..." onChange={titleChange} name="title" type="text" value={title} />
                        <button className="w-1/6 -ml-28 bg-violet-500 rounded-full p-1 border">Save</button>
                    </form>
                </div>
                
                <table className="w-full mt-3 table-fixed">
                    <thead className="bg-sky-900 text-left">
                        <tr>
                            <th className="pl-3 p-2">ID</th>
                            <th className="pl-3">Title</th>
                            <th>Completed</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos &&
                        todos.map((todo,index) => (
                            <tr key={todo.id} className="border-b border-gray-400">
                                <td className="pl-3 py-2">{todo.id}</td>
                                <td className="pl-3 py-2 ">{ todo.title }</td>
                                <td><input className="" type="checkbox" checked={todo.completed} /></td>
                                <td  className="space-x-1 pl-3 py-2">
                                    <button onClick={() => editTodo(todo.id)} className="text-xs bg-blue-600 p-1 px-3 rounded">Edit</button>
                                    <button onClick={() => deleteTodo(todo.id)} className="text-xs bg-red-500 p-1 px-2 rounded">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
        
        
    )
}