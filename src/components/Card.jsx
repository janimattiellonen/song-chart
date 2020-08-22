import React, { useRef } from 'react'
import styled from '@emotion/styled'

import { useDrag, useDrop } from 'react-dnd'

import { Rating } from './Rating'

const StyledCard = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  textAlign: 'left',
  border: '1px solid #020202',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: '#950952',
  cursor: 'move',
  color: 'white'
})

const createCardName = (card) => (
  <>
    <span style={{ display: 'block', marginBottom: '5px' }}>{card.name}</span>

    <span style={{ fontSize: '11px' }}>{card.composer || card.artist}</span>
  </>
)

/*
      <Card
        card={card}
        key={card.itunesId}
        index={index}
        id={card.itunesId}
        text={createCardName(card)}
        moveCard={moveCard}
      />
 */
export const Card = ({ card, index, moveCard }) => {
  const ItemTypes = {
    CARD: 'card'
  }

  const ref = useRef(null)
  const [, drop] = useDrop({
    drop: (item, monitor) => {
      /**
       DROPPED: {
          "type": "card",
          "id": 1,
          "index": 6
        }
       */
      // this is called when an item is successfully dragged and dropped
      console.log('DROPPED: ' + JSON.stringify(item, null, 2))
    },

    accept: ItemTypes.CARD,
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    }
  })
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, id: card.itunesId, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })
  const opacity = isDragging ? 0 : 1
  drag(drop(ref))

  return (
    <StyledCard ref={ref}>
      <span style={{ float: 'left', display: 'inline-block', marginRight: '20px' }}>
        {index + 1}
      </span>
      <span>{createCardName(card)}</span>
      <span>
        <Rating rating={card.rating} />
      </span>
    </StyledCard>
  )
}
