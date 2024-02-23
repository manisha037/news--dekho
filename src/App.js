// App.js

import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import { HashRouter, Routes, Route } from 'react-router-dom';
import './styles.css';

export default class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <div className="container">
            <Navbar />
          </div>
          <div className="container">
            <Routes>
              <Route
                exact
                path="/"
                element={<News pageSize={6} country="in" category="" />}
              />
              <Route
                path="/business"
                element={<News pageSize={6} country="in" category="business" />}
              />
              <Route
                path="/entertainment"
                element={<News pageSize={6} country="in" category="entertainment" />}
              />
              <Route
                path="/general"
                element={<News pageSize={6} country="in" category="general" />}
              />
              <Route
                path="/health"
                element={<News pageSize={6} country="in" category="health" />}
              />
              <Route
                path="/science"
                element={<News pageSize={6} country="in" category="science" />}
              />
              <Route
                path="/sports"
                element={<News pageSize={6} country="in" category="sports" />}
              />
              <Route
                path="/technology"
                element={<News pageSize={6} country="in" category="technology" />}
              />
            </Routes>
          </div>
        </div>
      </HashRouter>
    );
  }
}
