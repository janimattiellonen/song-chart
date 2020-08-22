import React, { useEffect, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import update from 'immutability-helper'

import styled from '@emotion/styled'

import { Card } from './Card'

import { fetchSongs } from '../ducks/songs'

const style = {
  width: 400,
  margin: '0 auto'
}

export const ChartList = () => {
  const dispatch = useDispatch()

  const [cards, setCards] = useState([])

  const songs = useSelector((state) => state.songs.get('songs'))

  useEffect(() => {
    console.log('RETCHING NOW....')
    dispatch(fetchSongs())
  }, [])

  useEffect(() => {
    if (!!songs && songs.count()) {
      setCards(songs.toArray())
    }
  }, [songs])

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = cards[dragIndex]

      console.log(`dragIndex: ${dragIndex}, hoverIndex: ${hoverIndex}`)
      setCards(
        update(cards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard]
          ]
        })
      )
    },
    [cards]
  )

  const renderCard = (card, index) => {
    return <Card card={card} index={index} moveCard={moveCard} />
  }

  return (
    <div style={style}>
      <h1>Top 20</h1>
      {cards.map((card, i) => renderCard(card, i))}
    </div>
  )
}
