import React from 'react'
import { BrowserRouter as Router, Route} from "react-router-dom";
import Login from './Login';
import AdminIndex from './AdminIndex'
const Main=()=>{
    return (
        <Router>
            <Route path='/' component={Login} exact></Route>
            <Route path='/index/' component={AdminIndex}></Route>
        </Router>
    )
}
export default Main