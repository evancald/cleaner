import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import Dashboard from './components/Dashboard/Dashboard';
import Form from './components/Form/Form';
import Post from './components/Post/Post';
import Register from './components/Register/Register';

export default (
  <Switch>
    <Route exact path="/" component={ Auth } />
    <Route path="/register" component= { Register } />
    <Route path="/dashboard" component={ Dashboard } />
    <Route path="/new" component= { Form } />
    <Route path="/post/:postid" component={ Post } />
  </Switch>
)