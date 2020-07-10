import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from 'react-router-dom'

import './App.css'

import DropZone from './DropZone/DropZone'

const App = () => {
  return (
    <Router>
        <div style={{display: 'none'}}>
          <Link to='/'>Home</Link>
          <Link to='/share'>Share</Link>
        </div>
      <Switch>
        <Route path='/share/:share_id'>
          <Share />
        </Route>
        <Route path='/'>
          <Index />
        </Route>
      </Switch>
    </Router>
    )
}

const Index = () => {
  return (
    <div>
      <h1>TempDrop</h1>
      <h2>A safe place to temporarily drop your file and share with others.</h2>
      <DropZone />
    </div>
  )
}

const Share = () => {
  let { share_id } = useParams();
  return (
    <div>
      <h1>TempDrop</h1>
      <h2>A safe place to temporarily drop your file and share with others.</h2>
      <a href={`/api/file/${share_id}`}><button>Download</button></a>
    </div>
  )
}

export default App
