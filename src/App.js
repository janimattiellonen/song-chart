import React from 'react'
import './App.css'
import { ChartList } from './components/ChartList'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { Menu } from './components/Menu'
import { SignInScreen } from './SignInScreen'

function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <header className="App-header">
          <Menu />
          <ChartList />
        </header>
      </DndProvider>
    </div>
  )
}

export default App
