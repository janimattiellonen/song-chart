import React from 'react'

import styled from '@emotion/styled'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

import { SignInScreen } from '../SignInScreen'

const StyledAppBar = styled(AppBar)({
  '& .MuiToolbar-root': { background: '#270215' }
})

export const Menu = () => {
  return (
    <div>
      <StyledAppBar>
        <Toolbar>
          {' '}
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <SignInScreen />
        </Toolbar>
      </StyledAppBar>
    </div>
  )
}
