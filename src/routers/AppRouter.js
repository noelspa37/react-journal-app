import React, { useEffect, useState } from 'react';
import {useDispatch} from 'react-redux'
import {firebase} from '../firebase/firestore-config';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from 'react-router-dom';

import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { JournalScreen } from '../components/journal/JournalScreen';
import { login } from '../actions/auth';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {

    const dispatch = useDispatch();
    const [cheking, setCheking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    

    useEffect(() => {
        
        firebase.auth().onAuthStateChanged( async (user) => {
            if(user?.uid) {
                dispatch( login( user.uid, user.displayName));
                setIsLoggedIn(true)
                dispatch( startLoadingNotes(user.uid) );

            }else {
                setIsLoggedIn(false)
            }

            setCheking(false);
        })

    },[dispatch, setCheking, setIsLoggedIn])

    if (cheking){
        return (
            <h1>Wait ...</h1>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute 
                        path="/auth"
                        component={ AuthRouter }
                        isAuthenticated={ isLoggedIn }
                    />

                    <PrivateRoute 
                        exact
                        isAuthenticated={ isLoggedIn }
                        path="/"
                        component={ JournalScreen }
                    />

                    <Redirect to="/auth/login" />


                </Switch>
            </div>
        </Router>
    )
}
