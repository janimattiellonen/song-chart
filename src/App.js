import React from 'react'
import styled from '@emotion/styled'

import './App.css'
import { ChartList } from './components/ChartList'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { Menu } from './components/Menu'

const Main = styled('div')({ marginTop: '64px', paddingTop: '20px' })
function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <>
          <Menu />
          <Main>
            <ChartList />
          </Main>
        </>
      </DndProvider>
    </div>
  )
}

export default App
