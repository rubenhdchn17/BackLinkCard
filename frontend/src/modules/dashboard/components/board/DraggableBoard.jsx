import { useState } from "react";
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

/**
 * Componente principal del tablero con funcionalidad de drag-and-drop.
 * Permite mover y reordenar tarjetas, carpetas y enlaces entre columnas y bloques libres.
 */
const DraggableBoard = () => {
  const [items, setItems] = useState(mockItems); // Estado principal con la estructura de ítems del tablero
  const [activeId, setActiveId] = useState(null); // ID del ítem que se está arrastrando
  const [draggedItem, setDraggedItem] = useState(null); // Objeto del ítem actualmente arrastrado

  /**
   * Actualiza el contenido de una tarjeta con una nueva lista de ítems reordenados.
   * @param {string} cardId - ID de la tarjeta a actualizar.
   * @param {Array} reorderedItems - Nueva lista de ítems dentro de la tarjeta.
   */
  const updateItemsInCard = (cardId, reorderedItems) => {
    const newItems = [...items];
    const cardIndex = newItems.findIndex((item) => item.id === cardId);
    if (cardIndex !== -1) {
      newItems[cardIndex].items = reorderedItems;
    }
    setItems(newItems);
  };

  /**
   * Mueve un ítem de una tarjeta origen a una tarjeta destino.
   * @param {string} sourceCardId - ID de la tarjeta origen.
   * @param {string} targetCardId - ID de la tarjeta destino.
   * @param {string} itemId - ID del ítem a mover.
   */
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

  /**
   * Maneja el inicio del arrastre. Guarda el ítem activo.
   * @param {object} active - Objeto que contiene el ID del ítem arrastrado.
   */
  const handleDragStart = ({ active }) => {
    const found = findItemById(items, active.id);
    setActiveId(active.id);
    setDraggedItem(found);
  };

  /**
   * Maneja la finalización del arrastre y realiza el reordenamiento o movimiento entre bloques.
   * @param {object} active - Ítem arrastrado.
   * @param {object} over - Ítem sobre el que se soltó.
   */
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

    // Reordenamiento de tarjetas
    if (draggedItem.type === "card" && toBlock.type === "card") {
      const fromIdx = newItems.findIndex((i) => i.id === active.id);
      const toIdx = newItems.findIndex((i) => i.id === over.id);
      if (fromIdx !== -1 && toIdx !== -1) {
        const moved = newItems.splice(fromIdx, 1)[0];
        newItems.splice(toIdx, 0, moved);
      }
      setItems(newItems);
      setDraggedItem(null);
      return;
    }

    // Reordenamiento dentro de la misma tarjeta
    if (
      isLinkOrFolder &&
      fromBlock.type === "card" &&
      toBlock.type === "card" &&
      fromBlock.id === toBlock.id
    ) {
      const cardIndex = newItems.findIndex((i) => i.id === fromBlock.id);
      const movedItem = newItems[cardIndex].items.splice(fromIndex, 1)[0];
      newItems[cardIndex].items.splice(toIndex, 0, movedItem);
    }

    // Movimiento entre tarjetas diferentes
    else if (
      isLinkOrFolder &&
      fromBlock.type === "card" &&
      toBlock.type === "card" &&
      fromBlock.id !== toBlock.id
    ) {
      moveItemBetweenCards(fromBlock.id, toBlock.id, active.id);
      setDraggedItem(null);
      return;
    }

    // Movimiento desde bloque libre o tarjeta a otra tarjeta
    else if (isLinkOrFolder && toBlock.type === "card") {
      const cardIndex = newItems.findIndex((i) => i.id === toBlock.id);
      const card = newItems[cardIndex];
      const alreadyInCard = (card.items || []).some((i) => i.id === draggedItem.id);
      if (alreadyInCard) return setDraggedItem(null);

      if (fromBlock.type === "free-block" || fromBlock.type === "card") {
        const fromBlockIndex = newItems.findIndex((i) => i.id === fromBlock.id);
        newItems[fromBlockIndex].items.splice(fromIndex, 1);
      }

      newItems[cardIndex].items.push(draggedItem);
    }

    // Movimiento entre bloques libres
    else if (isLinkOrFolder && toBlock.type === "free-block") {
      const fromBlockIndex = newItems.findIndex((i) => i.id === fromBlock.id);
      const toBlockIndex = newItems.findIndex((i) => i.id === toBlock.id);
      const alreadyInBlock = toBlock.items.some((i) => i.id === draggedItem.id);
      if (alreadyInBlock && fromBlock.id !== toBlock.id) return setDraggedItem(null);

      const movingItem = newItems[fromBlockIndex].items.splice(fromIndex, 1)[0];
      newItems[toBlockIndex].items.splice(toIndex, 0, movingItem);
    }

    setItems(newItems);
    setDraggedItem(null);
  };

  const columns = getColumns(items); // Agrupa los ítems en columnas para su renderizado

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

      {/* Renderizado del ítem arrastrado en la capa superior */}
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
