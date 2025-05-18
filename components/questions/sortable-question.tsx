"use client"

import { useState, useEffect } from "react"
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd"
import { GripVertical, CheckCircle, XCircle } from "lucide-react"
import { motion } from "framer-motion"

interface SortableQuestionProps {
  question: {
    options: string[]
    correctOrder: string[]
  }
  onSort: (sortedItems: string[]) => void
  isAnswered: boolean
}

export default function SortableQuestion({ question, onSort, isAnswered }: SortableQuestionProps) {
  // Create a shuffled initial state
  const [items, setItems] = useState<string[]>([])
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    // Initialize with shuffled options if not already set
    if (items.length === 0 && question.options.length > 0) {
      setItems([...question.options].sort(() => Math.random() - 0.5))
    }
  }, [question.options, items.length])

  useEffect(() => {
    // Submit the current order when answered
    if (isAnswered) {
      onSort(items)
    }
  }, [isAnswered, items, onSort])

  const handleDragEnd = (result: DropResult) => {
    setIsDragging(false)

    if (!result.destination || isAnswered) return

    const newItems = [...items]
    const [reorderedItem] = newItems.splice(result.source.index, 1)
    newItems.splice(result.destination.index, 0, reorderedItem)

    setItems(newItems)
    onSort(newItems)
  }

  const handleDragStart = () => {
    setIsDragging(true)
  }

  const isItemInCorrectPosition = (item: string, index: number) => {
    return isAnswered && item === question.correctOrder[index]
  }

  const isItemInWrongPosition = (item: string, index: number) => {
    return isAnswered && item !== question.correctOrder[index]
  }

  return (
    <div className="flex-1">
      <p className="text-gray-400 mb-4 text-sm">Drag to arrange in the correct order</p>

      <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
        <Droppable droppableId="sortable-list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
              {items.map((item, index) => (
                <Draggable key={item} draggableId={item} index={index} isDragDisabled={isAnswered}>
                  {(provided, snapshot) => (
                    <motion.div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`sortable-item ${snapshot.isDragging ? "dragging" : ""} ${
                        isItemInCorrectPosition(item, index)
                          ? "border-green-500 bg-green-900/30 shadow-glow-success"
                          : isItemInWrongPosition(item, index)
                            ? "border-red-500 bg-red-900/30 shadow-glow-error"
                            : ""
                      }`}
                      style={{
                        ...provided.draggableProps.style,
                        zIndex: snapshot.isDragging ? 100 : "auto",
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center flex-1">
                          <div
                            {...provided.dragHandleProps}
                            className="mr-3 text-gray-400 cursor-grab active:cursor-grabbing p-1"
                          >
                            <GripVertical className="h-5 w-5" />
                          </div>
                          <span className="text-gray-200">{item}</span>
                        </div>

                        {isAnswered && (
                          <>
                            {isItemInCorrectPosition(item, index) && (
                              <CheckCircle className="h-5 w-5 text-green-500 ml-2 flex-shrink-0" />
                            )}
                            {isItemInWrongPosition(item, index) && (
                              <XCircle className="h-5 w-5 text-red-500 ml-2 flex-shrink-0" />
                            )}
                          </>
                        )}
                      </div>
                    </motion.div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {isAnswered && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 p-4 bg-gray-800/50 border border-gray-700/50 rounded-xl"
        >
          <p className="text-gray-300 font-medium mb-2">Correct order:</p>
          <ol className="list-decimal pl-5 space-y-1">
            {question.correctOrder.map((item, index) => (
              <li key={index} className="text-gray-400">
                <span className="text-white">{item}</span>
              </li>
            ))}
          </ol>
        </motion.div>
      )}
    </div>
  )
}
