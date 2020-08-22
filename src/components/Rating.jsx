import React from 'react'

import styled from '@emotion/styled'

import StarBorderIcon from '@material-ui/icons/StarBorder'
import StarIcon from '@material-ui/icons/Star'

const RatingDiv = styled('div')({
  marginTop: '5px'
})

const starCount = (rating) => {
  if (rating === 20) {
    return 1
  }

  if (rating === 40) {
    return 2
  }

  if (rating === 60) {
    return 3
  }

  if (rating === 80) {
    return 4
  }

  if (rating === 100) {
    return 5
  }

  return 0
}

const renderEmptyStars = (amount) => {
  return (
    <>
      {[...Array(amount).keys()].map((value, key) => (
        <StarBorderIcon key={key} />
      ))}
    </>
  )
}

const renderFilledStars = (amount) => {
  return (
    <>
      {[...Array(amount).keys()].map((value, key) => (
        <StarIcon key={key} />
      ))}
    </>
  )
}

export const Rating = ({ rating }) => {
  return (
    <RatingDiv>
      {renderFilledStars(starCount(rating))}

      {renderEmptyStars(5 - starCount(rating))}
    </RatingDiv>
  )
}
