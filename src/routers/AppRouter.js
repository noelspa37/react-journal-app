import React, { useEffect, useState } from 'react';
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
    const [cheking, setCheking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    

    useEffect(() => {
        
        firebase.auth().onAuthStateChanged((user) => {
            if(user?.id) {
                dispatch( login( user.uid, user.displayName));
                setIsLoggedIn(true)
            }else {
                setIsLoggedIn(false)
            }

            setCheking(false);
        })

    },[dispatch, setCheking])

    if (cheking){
        return (
            <h1>Espere ...</h1>
        )
    }

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
