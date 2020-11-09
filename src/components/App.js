import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import UserList from './List.js';
import AddUser from './AddUser.js'
import EditUser from './EditUser.js'

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/" component={UserList} />
          <Route exact path="/addUser" component={AddUser} />
          <Route exact path="/editUser/:id" component={EditUser} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;