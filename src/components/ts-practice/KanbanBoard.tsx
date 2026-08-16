import React, { useState } from "react";

type Status = "Todo" | "In Progress" | "Done";

interface Task {
  id: string;
  title: string;
  status: Status;
}

const INITIAL_TASKS: Task[] = [
  { id: "t1", title: "Setup TypeScript config", status: "Done" },
  { id: "t2", title: "Design component architecture", status: "In Progress" },
  { id: "t3", title: "Implement state reducers", status: "Todo" },
  { id: "t4", title: "Write integration tests", status: "Todo" },
];

type GroupedTasks = Record<Status, Task[]>;

export const KanbanBoard: React.FC = () => {
  const [tasks] = useState<Task[]>(INITIAL_TASKS);

  const groupedTasks: GroupedTasks = tasks.reduce<GroupedTasks>(
    (acc, task) => {
      // Append the current task to its matching status array
      acc[task.status].push(task);
      return acc;
    },
    // Initial state seed with empty arrays for all keys
    { Todo: [], "In Progress": [], Done: [] },
  );

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {(["Todo", "In Progress", "Done"] as Status[]).map((status) => (
        <div
          key={status}
          style={{ flex: 1, border: "1px solid #ccc", padding: "10px" }}
        >
          <h3>
            {status} ({groupedTasks[status].length})
          </h3>
          {groupedTasks[status].map((task) => (
            <div
              key={task.id}
              style={{ background: "#f4f4f4", padding: "8px", margin: "4px 0" }}
            >
              {task.title}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
