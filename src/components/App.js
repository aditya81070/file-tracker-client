import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginPage from './LoginPage';
import AdminDashboard from './AdminDashboard';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/admin-dashboard" component={AdminDashboard} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
