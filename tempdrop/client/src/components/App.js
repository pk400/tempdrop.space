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

const App = () =>
  <Router>
      <div style={{display: 'none'}}>
        <Link to='/'>Home</Link>
        <Link to='/share'>Share</Link>
      </div>
    <header>
      <h1>TempDrop</h1>
      <h2>A safe place to temporarily drop your file and share with others.</h2>
    </header>
    <main>
      <Switch>
        <Route path='/share/:share_id' component={Share} />
        <Route path='/' component={Index} />
      </Switch>
    </main>
  </Router>

const Index = () =>
  <div>
    <DropZone />
  </div>

const Share = () => {
  let { share_id } = useParams();
  return (
    <div>
      <a href={`/api/file/${share_id}`}><button>Download</button></a>
    </div>
  )
}

export default App
