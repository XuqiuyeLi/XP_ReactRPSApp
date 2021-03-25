import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import {RPSApp} from "./web/RPSApp"
import {RPS} from "./rps/RPS";

ReactDOM.render(
  <React.StrictMode>
    <RPSApp rps={new RPS(new LocalHistoryRepo())}/>
  </React.StrictMode>,
  document.getElementById('root')
);