import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import Dashboard from './components/Dashboard/Dashboard';
//New Listing Steps
import StepOne from './components/Form/StepOne/StepOne';
import StepTwo from './components/Form/StepTwo/StepTwo';
import StepThree from './components/Form/StepThree/StepThree';
import StepFour from './components/Form/StepFour/StepFour';
import Review from './components/Form/Review/Review';

import MyJobs from './components/MyJobs/MyJobs';

import Post from './components/Post/Post';

import Register from './components/Register/Register';

export default (
  <Switch>
    <Route exact path="/" component={ Auth } />
    <Route path="/register" component= { Register } />
    <Route path="/dashboard" component={ Dashboard } />

    <Route path="/new/StepOne" component= { StepOne } />
    <Route path="/new/StepTwo" component={ StepTwo } />
    <Route path="/new/StepThree" component={ StepThree } />
    <Route path="/new/StepFour" component={ StepFour } />
    <Route path="/new/review" component={ Review } />

    <Route path="/post/:postid" component={ Post } />

    <Route path="/myJobs" component={ MyJobs } />
  </Switch>
)