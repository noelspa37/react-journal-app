import React, { useEffect } from 'react';
import {useDispatch} from 'react-redux'
import {firebase} from '../firebase/firestore-config';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from 'react-router-dom';

import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { login } from '../actions/auth';

export const AppRouter = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        
        firebase.auth().onAuthStateChanged((user) => {
            if(user?.id) {
                dispatch( login( user.uid, user.displayName));
            }
        })

    },[dispatch])

    return (
        <Router>
            <div>
                <Switch>
                    <Route 
                        path="/auth"
                        component={ AuthRouter }
                    />

                    <Route 
                        exact
                        path="/"
                        component={ JournalScreen }
                    />

                    <Redirect to="/auth/login" />


                </Switch>
            </div>
        </Router>
    )
}
