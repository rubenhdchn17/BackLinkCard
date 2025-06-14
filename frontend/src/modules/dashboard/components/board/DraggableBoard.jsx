import { useEffect, useState } from "react";
import {
  DndContext,
  rectIntersection,
  DragOverlay,
} from "@dnd-kit/core";
import Card from "../card/Card";
import LinkItem from "../link/LinkItem";
import FolderItem from "../folder/FolderItem";
import DraggableItem from "./DraggableItem";
import FreeItemsBlock from "./FreeItemsBlock";
import styles from "./DraggableBoard.module.css";
import mockItems from "../../../../data/mockItems";
import { findItemById, findItemLocation, getColumns } from "./helpers";

const DraggableBoard = () => {
  const [items, setItems] = useState(mockItems);
  const [activeId, setActiveId] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Control" || e.metaKey) {
        window.ctrlKeyPressed = true;
      }
    };
    const handleKeyUp = () => {
      window.ctrlKeyPressed = false;
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const updateItemsInCard = (cardId, reorderedItems) => {
    const newItems = [...items];
    const cardIndex = newItems.findIndex((item) => item.id === cardId);
    if (cardIndex !== -1) {
      newItems[cardIndex].items = reorderedItems;
    }
    setItems(newItems);
  };

  const moveItemBetweenCards = (sourceCardId, targetCardId, itemId) => {
    const newItems = [...items];
    const sourceCardIndex = newItems.findIndex((c) => c.id === sourceCardId);
    const targetCardIndex = newItems.findIndex((c) => c.id === targetCardId);
    if (sourceCardIndex === -1 || targetCardIndex === -1) return;
    const sourceItems = newItems[sourceCardIndex].items;
    const targetItems = newItems[targetCardIndex].items;
    const itemIndex = sourceItems.findIndex((i) => i.id === itemId);
    if (itemIndex === -1) return;
    const [movingItem] = sourceItems.splice(itemIndex, 1);
    targetItems.push(movingItem);
    newItems[sourceCardIndex].items = sourceItems;
    newItems[targetCardIndex].items = targetItems;
    setItems(newItems);
  };

  const handleDragStart = ({ active }) => {
    const found = findItemById(items, active.id);
    setActiveId(active.id);
    setDraggedItem(found);
  };

  const handleDragEnd = ({ active, over }) => {
    setActiveId(null);

    if (!over || active.id === over.id || !draggedItem) {
      setDraggedItem(null);
      return;
    }

    const newItems = structuredClone(items);
    const [fromBlock, fromIndex] = findItemLocation(newItems, active.id);
    const [toBlock, toIndex] = findItemLocation(newItems, over.id);

    if (!fromBlock || !toBlock) {
      setDraggedItem(null);
      return;
    }

    const isLinkOrFolder = draggedItem.type === "link" || draggedItem.type === "folder";
    const overItem = findItemById(newItems, over.id);

    // ✅ Mover dentro de carpeta si el over es tipo folder
    if (isLinkOrFolder && overItem?.type === "folder") {
      // 1. Evitar duplicados
      if (Array.isArray(overItem.items) && overItem.items.some(i => i.id === active.id)) {
        setDraggedItem(null);
        return;
      }

      // 2. Eliminar del origen
      if (fromBlock.type === "card" || fromBlock.type === "free-block") {
        const fromBlockIndex = newItems.findIndex(i => i.id === fromBlock.id);
        if (fromBlockIndex !== -1) {
          newItems[fromBlockIndex].items.splice(fromIndex, 1);
        }
      }

      // 3. Insertar en folder destino (anidado)
      const insertIntoFolder = (itemsList) => {
        return itemsList.map(item => {
          if (item.id === overItem.id && item.type === "folder") {
            return {
              ...item,
              items: [...(item.items || []), draggedItem],
            };
          }
          if (item.type === "folder" && Array.isArray(item.items)) {
            return {
              ...item,
              items: insertIntoFolder(item.items),
            };
          }
          return item;
        });
      };

      const updatedItems = newItems.map(item => {
        if (item.type === "card" && Array.isArray(item.items)) {
          return {
            ...item,
            items: insertIntoFolder(item.items),
          };
        }
        if (item.type === "free-block" && Array.isArray(item.items)) {
          return {
            ...item,
            items: insertIntoFolder(item.items),
          };
        }
        return item;
      });

      setItems(updatedItems);
      setDraggedItem(null);
      return;
    }

    // ✅ Reordenar tarjetas
    if (draggedItem.type === "card" && toBlock.type === "card") {
      const fromIdx = newItems.findIndex(i => i.id === active.id);
      const toIdx = newItems.findIndex(i => i.id === over.id);
      if (fromIdx !== -1 && toIdx !== -1) {
        const moved = newItems.splice(fromIdx, 1)[0];
        newItems.splice(toIdx, 0, moved);
      }
      setItems(newItems);
      setDraggedItem(null);
      return;
    }

    // ✅ Reordenar dentro de misma card
    if (
      isLinkOrFolder &&
      fromBlock.type === "card" &&
      toBlock.type === "card" &&
      fromBlock.id === toBlock.id
    ) {
      const cardIndex = newItems.findIndex(i => i.id === fromBlock.id);
      const movedItem = newItems[cardIndex].items.splice(fromIndex, 1)[0];
      newItems[cardIndex].items.splice(toIndex, 0, movedItem);
    } else if (
      isLinkOrFolder &&
      fromBlock.type === "card" &&
      toBlock.type === "card" &&
      fromBlock.id !== toBlock.id
    ) {
      moveItemBetweenCards(fromBlock.id, toBlock.id, active.id);
      setDraggedItem(null);
      return;
    } else if (isLinkOrFolder && toBlock.type === "card") {
      const cardIndex = newItems.findIndex(i => i.id === toBlock.id);
      const card = newItems[cardIndex];
      const alreadyInCard = (card.items || []).some(i => i.id === draggedItem.id);
      if (alreadyInCard) return setDraggedItem(null);
      const fromBlockIndex = newItems.findIndex(i => i.id === fromBlock.id);
      newItems[fromBlockIndex].items.splice(fromIndex, 1);
      newItems[cardIndex].items.push(draggedItem);
    } else if (isLinkOrFolder && toBlock.type === "free-block") {
      const fromBlockIndex = newItems.findIndex(i => i.id === fromBlock.id);
      const toBlockIndex = newItems.findIndex(i => i.id === toBlock.id);
      const alreadyInBlock = toBlock.items.some(i => i.id === draggedItem.id);
      if (alreadyInBlock && fromBlock.id !== toBlock.id) return setDraggedItem(null);
      const movingItem = newItems[fromBlockIndex].items.splice(fromIndex, 1)[0];
      newItems[toBlockIndex].items.splice(toIndex, 0, movingItem);
    }

    setItems(newItems);
    setDraggedItem(null);
  };

  const columns = getColumns(items);

  return (
    <DndContext
      collisionDetection={rectIntersection}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className={styles.board}>
        {columns.map((column, colIndex) => (
          <div key={colIndex} className={styles.column}>
            {column.map((item) =>
              <DraggableItem key={item.id} id={item.id} activeId={activeId}>
                {item.type === "card" ? (
                  <Card
                    {...item}
                    updateItemsInCard={updateItemsInCard}
                    moveItemBetweenCards={moveItemBetweenCards}
                    activeId={activeId}
                  />
                ) : item.type === "free-block" ? (
                  <FreeItemsBlock id={item.id} items={item.items} activeId={activeId} />
                ) : null}
              </DraggableItem>
            )}
          </div>
        ))}
      </div>

      <DragOverlay dropAnimation={null}>
        {draggedItem ? (
          draggedItem.type === "card" ? (
            <Card {...draggedItem} />
          ) : draggedItem.type === "link" ? (
            <LinkItem {...draggedItem} />
          ) : draggedItem.type === "folder" ? (
            <FolderItem {...draggedItem} />
          ) : null
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default DraggableBoard;
