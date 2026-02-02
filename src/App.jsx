import { useState , useEffect} from "react";
import "./App.css";
import Navbar from "./components/NavBar";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const saveToLS = (param)=>{
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  useEffect(()=>{
    let todosTring = localStorage.getItem("todos")
    if(todosTring){
    let todos = JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)}
  },[]);


  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos)
    saveToLS()
  };

  const HandleDelete = (e, id) => {
    let index = todos.filter((item) => {
      return item.id === id;
    });
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS()
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    // console.log(todos);
    saveToLS()
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
    
  };
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS()
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto bg-violet-100 my-5 p-5 rounded-xl">
        <div className="addTodo my-5 ">
          <h2 className="text-lg font-bold ">Add Todo</h2>
          <input
            type="text"
            onChange={handleChange}
            value={todo}
            className="border-white border-2 rounded-2xl bg-white my-2 w-80 px-2"
          />
          <button
            onClick={handleAdd}
            className="mx-2 px-4 rounded-3xl py-2 bg-violet-500 hover:font-bold hover:text-violet-50"
          >
            Add
          </button>
        </div>
        <h2 className="font-bold text-lg">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && (
            <div className="m-5"> No todos to display</div>
          )}
          {todos.map((item) => {
            return (
              <div
                key={item.id}
                className="todo flex justify-between my-3 w-1/4"
              >
                <div className="flex gap-5 align-middle">
                  <input
                    name={item.id}
                    onChange={handleCheckbox}
                    type="checkbox"
                    value={item.isCompleted}
                  />
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.todo}
                  </div>
                </div>
                <div className="buttons ">
                  <button
                    onClick={(e) => {
                      handleEdit(e, item.id);
                    }}
                    className="mx-2 px-4 rounded-3xl py-2 bg-violet-500 hover:font-bold hover:text-violet-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      HandleDelete(e, item.id);
                    }}
                    className="mx-2 px-4 rounded-3xl py-2 bg-violet-500 hover:font-bold hover:text-violet-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
