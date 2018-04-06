import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">

      <header>
      <div className="top-bar">
        <img className="logo" src="assets/images/Logo.png" alt="bloc-jams-logo" />
          <nav className="main-nav">
             <Link to='/'>Landing</Link>
             <Link to='/library'>Library</Link>
           </nav>
           </div>
      </header>

      <main>
      <Route exact path="/" component={Landing} />
      <Route path="/library" component={Library} />
      <Route path="/album/:slug" component={Album} />
      </main>

      </div>
    );
  }
}

export default App;
