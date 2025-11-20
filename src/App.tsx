import {
  DndContext,
  DragOverlay,
  useDraggable,
  useDroppable,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import "./index.css";
import { memo, useState, type FC } from "react";

const data: Record<number, Array<{ id: number; name: string }>> = {
  1: [
    { id: 1, name: "nestor" },
    { id: 2, name: "gerona" },
  ],
  2: [
    { id: 3, name: "john" },
    { id: 4, name: "doe" },
  ],
  3: [
    { id: 5, name: "mike" },
    { id: 6, name: "tyson" },
  ],
};

export function App() {
  const [mainData, setMainData] = useState(data);

  const [draggables, setDraggables] = useState(data[1]!);
  const [draggables2, setDraggables2] = useState(data[2]!);
  const [draggables3, setDraggables3] = useState(data[3]!);
  const [activeItem, setActiveItem] = useState<number>();

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    if (over) {
      switch (over.id) {
        case 1:
          if (mainData[1]!.some((p) => p.id === active.data.current?.id))
            return;
          console.log("drop 1");

          if (Number(active.data.current?.dropId) === 2) {
            const itemToMove = mainData[2]!.find(
              (p) => p.id === active.data.current?.id,
            )!;
            setMainData((prev) => ({
              ...prev,
              [2]: prev[2]!.filter(
                (p) => p.id !== Number(active.data.current?.id),
              ),
            }));
            setMainData((prev) => ({
              ...prev,
              [1]: [...prev[1]!, itemToMove],
            }));
            // setDraggables2((prev) =>
            //   prev.filter((p) => p.id !== active.data.current?.id),
            // );
            // setDraggables((prev) => [...prev, itemToMove]);
          } else if (Number(active.data.current?.dropId) === 3) {
            const itemToMove = mainData[3]!.find(
              (p) => p.id === active.data.current?.id,
            )!;
            setMainData((prev) => ({
              ...prev,
              [3]: prev[3]!.filter(
                (p) => p.id !== Number(active.data.current?.id),
              ),
            }));
            setMainData((prev) => ({
              ...prev,
              [1]: [...prev[1]!, itemToMove],
            }));
            // setDraggables3((prev) =>
            //   prev.filter((p) => p.id !== active.data.current?.id),
            // );
            // setDraggables((prev) => [...prev, itemToMove]);
          }

          break;

        case 2:
          if (mainData[2]!.some((p) => p.id === active.data.current?.id))
            return;
          console.log("drop 2");

          if (Number(active.data.current?.dropId) === 1) {
            const itemToMove = mainData[1]!.find(
              (p) => p.id === active.data.current?.id,
            )!;

            setMainData((prev) => ({
              ...prev,
              [1]: prev[1]!.filter(
                (p) => p.id !== Number(active.data.current?.id),
              ),
            }));
            setMainData((prev) => ({
              ...prev,
              [2]: [...prev[2]!, itemToMove],
            }));
            // setDraggables((prev) =>
            //   prev.filter((p) => p.id !== active.data.current?.id),
            // );
            // setDraggables2((prev) => [...prev, itemToMove]);
          } else if (Number(active.data.current?.dropId) === 3) {
            const itemToMove = mainData[3]!.find(
              (p) => p.id === active.data.current?.id,
            )!;
            setMainData((prev) => ({
              ...prev,
              [3]: prev[3]!.filter(
                (p) => p.id !== Number(active.data.current?.id),
              ),
            }));
            setMainData((prev) => ({
              ...prev,
              [2]: [...prev[2]!, itemToMove],
            }));
            // setDraggables3((prev) =>
            //   prev.filter((p) => p.id !== active.data.current?.id),
            // );
            // setDraggables2((prev) => [...prev, itemToMove]);
          }

          break;
        case 3:
          if (mainData[3]!.some((p) => p.id === active.data.current?.id))
            return;
          console.log("drop 3");
          if (Number(active.data.current?.dropId) === 1) {
            const itemToMove = mainData[1]!.find(
              (p) => p.id === active.data.current?.id,
            )!;
            setMainData((prev) => ({
              ...prev,
              [1]: prev[1]!.filter(
                (p) => p.id !== Number(active.data.current?.id),
              ),
            }));
            setMainData((prev) => ({
              ...prev,
              [3]: [...prev[3]!, itemToMove],
            }));
            // setDraggables((prev) =>
            //   prev.filter((p) => p.id !== active.data.current?.id),
            // );
            // setDraggables3((prev) => [...prev, itemToMove]);
          } else if (Number(active.data.current?.dropId) === 2) {
            const itemToMove = mainData[2]!.find(
              (p) => p.id === active.data.current?.id,
            )!;
            setMainData((prev) => ({
              ...prev,
              [2]: prev[2]!.filter(
                (p) => p.id !== Number(active.data.current?.id),
              ),
            }));
            setMainData((prev) => ({
              ...prev,
              [3]: [...prev[3]!, itemToMove],
            }));
            // setDraggables2((prev) =>
            //   prev.filter((p) => p.id !== active.data.current?.id),
            // );
            // setDraggables3((prev) => [...prev, itemToMove]);
          }
          break;
        default:
          break;
      }
    }

    setActiveItem(undefined);
    return;
  };
  const handleDragStart = (e: DragStartEvent) => {
    const { active } = e;
    console.log("test");

    setActiveItem(Number(active.data.current?.id));
    return;
  };

  return (
    <div className="app">
      <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
        <div style={{ display: "flex", gap: 40 }}>
          <Droppable id={1} list={mainData[1]!} color="orange" />
          <Droppable id={2} list={mainData[2]!} color="green" />
          <DragOverlay
            dropAnimation={{
              duration: 200,
              easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
            }}
          >
            {activeItem && <Draggable id={activeItem} dropId={0} />}
          </DragOverlay>

          <Droppable id={3} list={mainData[3]!} color="blue" />
        </div>
      </DndContext>
    </div>
  );
}

const Droppable: FC<{
  id: number;
  list: Array<{ id: number; name: string }>;
  color: string;
}> = ({ id, list, color }) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        backgroundColor: isOver ? color : "purple",
        width: "100px",
        height: "100px",
      }}
    >
      {list.map((p, index) => (
        <Draggable key={index} id={p.id} dropId={id} />
      ))}
    </div>
  );
};

const Draggable: FC<{ id: number; dropId: number }> = memo(({ id, dropId }) => {
  const { listeners, attributes, isDragging, setNodeRef } = useDraggable({
    id: `draggable-${id}`,
    data: {
      id,
      dropId,
    },
  });

  return (
    <div {...listeners} {...attributes} ref={setNodeRef}>
      draggable {id}
    </div>
  );
});

export default App;
