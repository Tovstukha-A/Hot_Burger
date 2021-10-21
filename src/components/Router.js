import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from "./Landing";
import App from "./App";
import PageNotFound from "./PageNotFound";

function Router() {

    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Landing} />
                    <Route path='/restaurant/:restaurantId' component={App} />
                    <Route component={PageNotFound} />
                </Switch>
            </BrowserRouter>
        </>
    )
}

export default Router;

