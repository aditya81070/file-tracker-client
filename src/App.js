import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/common/Login';
import EmployeeList from './pages/admin/EmployeeList';
import VerifyEmployee from './pages/admin/VerifyEmployee';
import GenerateQR from './pages/qrg/QrGenerator';
import ViewFilesQRG from './pages/qrg/ViewFiles';
import Signup from './pages/common/SignUp';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/admin" component={EmployeeList} />
        <Route exact path="/admin/employee" component={EmployeeList} />
        <Route exact path="/admin/employee/verify" component={VerifyEmployee} />
        <Route exact path="/qrg" component={GenerateQR} />
        <Route exact path="/qrg/generate-qr" component={GenerateQR} />
        <Route exact path="/qrg/files" component={ViewFilesQRG} />
        <Route path="/" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
