import { useMemo, useRef, useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export function EventList() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const listRef = useRef<HTMLUListElement>(null);

  // Remaining Todos
  const remainingTodos = useMemo(() => {
    return todos.filter((todo) => !todo.completed).length;
  }, [todos]);

  //-----------------------------------------
  // Add Todo
  //-----------------------------------------
  const addTodo = () => {
    if (!input.trim()) return;

    if (editingId !== null) {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === editingId ? { ...todo, text: input } : todo,
        ),
      );

      setEditingId(null);
      setInput("");
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      text: input,
      completed: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    setInput("");
  };

  //-----------------------------------------
  // Enter Key Support
  //-----------------------------------------
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  //-----------------------------------------
  // ONE Delegated Click Listener
  //-----------------------------------------
  const handleListClick = (e: React.MouseEvent<HTMLUListElement>) => {
    const target = e.target as HTMLElement;

    const button = target.closest("button");

    if (!button) return;

    const action = button.dataset.action;
    const id = Number(button.dataset.id);

    switch (action) {
      //---------------------------------
      // Delete
      //---------------------------------
      case "delete":
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
        break;

      //---------------------------------
      // Toggle
      //---------------------------------
      case "done":
        setTodos((prev) =>
          prev.map((todo) =>
            todo.id === id
              ? {
                  ...todo,
                  completed: !todo.completed,
                }
              : todo,
          ),
        );
        break;

      //---------------------------------
      // Edit
      //---------------------------------
      case "edit": {
        const todo = todos.find((t) => t.id === id);

        if (!todo) return;

        setInput(todo.text);
        setEditingId(todo.id);

        break;
      }
    }
  };

  return (
    <div
      style={{
        width: "500px",
        margin: "40px auto",
        fontFamily: "Arial",
      }}
    >
      <h1>Todo App</h1>

      <h3>Remaining Todos : {remainingTodos}</h3>

      <div
        style={{
          display: "flex",
          gap: 10,
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter todo..."
          style={{
            flex: 1,
            padding: 10,
          }}
        />

        <button onClick={addTodo}>{editingId ? "Update" : "Add"}</button>
      </div>

      <ul
        ref={listRef}
        onClick={handleListClick}
        style={{
          padding: 0,
          marginTop: 20,
        }}
      >
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 10,
              border: "1px solid #ccc",
              marginBottom: 10,
            }}
          >
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.text}
            </span>

            <div
              style={{
                display: "flex",
                gap: 8,
              }}
            >
              <button data-action="done" data-id={todo.id}>
                {todo.completed ? "Undo" : "Done"}
              </button>

              <button data-action="edit" data-id={todo.id}>
                Edit
              </button>

              <button data-action="delete" data-id={todo.id}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
