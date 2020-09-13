import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "../components/style/style.css";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import Navbar from "./layouts/Navbar";
import Landing from "./layouts/Landing";
import TutorialPage from "./views/tutorials/TutorialPage";
import ProfilePage from "./views/profiles/ProfilePage";
import Error from "./layouts/Error";
import PrivateRoute from "./utils/PrivateRoute";
import Discussion from "./views/discussion/Discussion";
import FilteredDiscussions from "./views/discussion/sections/FilteredDiscussions";
import ReplyOnPosts from "./views/discussion/sections/ReplyOnPosts";
import CreateProfile from "./views/profiles/CreateProfile";
import Developers from "./views/developers/Developers";
import Dashboard from "./views/dashboard/Dashboard";
// Redux
import { Provider } from "react-redux";
import store from "./store/store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuth";
import Axios from "axios";

if (localStorage.token) {
    setAuthToken(localStorage.token);
}
function App() {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Landing} />
                    <Route exact exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    <PrivateRoute
                        exact
                        path="/dashboard"
                        component={Dashboard}
                    />
                    <PrivateRoute
                        exact
                        path="/discussions"
                        component={Discussion}
                    />
                    <PrivateRoute
                        exact
                        path="/discussions/lists/:tag"
                        component={FilteredDiscussions}
                    />
                    <PrivateRoute
                        exact
                        path="/discussions/comments/:postId"
                        component={ReplyOnPosts}
                    />
                    <PrivateRoute
                        exact
                        path="/tutorials"
                        component={TutorialPage}
                    />
                    <PrivateRoute
                        exact
                        path="/:userId/profiles"
                        component={ProfilePage}
                    />
                    <PrivateRoute
                        exact
                        path="/:userId/profiles/create_profile"
                        component={CreateProfile}
                    />
                    <PrivateRoute
                        exact
                        path="/:userId/profiles/edit_profile&edit=true"
                        component={CreateProfile}
                    />
                    <PrivateRoute
                        exact
                        path="/developers"
                        component={Developers}
                    />
                    {/* <Route exact path="/developers" component={Developers} /> */}
                    {/* <Route default component={Error} /> */}
                </Switch>
            </BrowserRouter>
        </Provider>
    );
}

ReactDOM.render(<App />, document.getElementById("app"));
