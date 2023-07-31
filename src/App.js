import React, { Component } from 'react'
import './App.css'
import LoanAnalyzer from './components/LoanAnalyzer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <LoanAnalyzer />
        <p>HELLO WORLD</p>
        <p>CHARTS AND GRAPHS</p>
      </div>
    )
  }
}

export default App
