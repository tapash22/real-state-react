import { KanbanBoard } from "../components/ts-practice/KanbanBoard";
import { ShoppingCart } from "../components/ts-practice/ShoppingCart";
import { UserTable } from "../components/ts-practice/UserTable";

export default function HelpingDetails() {
  return (
    <div className="flex flex-col justify-center items-center gap-10 w-full px-8 lg:px-16 py-5 lg:py-10 ">
      <ShoppingCart />

      <UserTable />

      <KanbanBoard />
    </div>
  );
}
