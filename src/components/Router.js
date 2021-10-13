import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from "./Landing";
import App from "./App";
import Error from "./Error";

function Router() {

    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Landing} />
                    <Route exact="/restaurant/restaurantId" component={App} />
                    <Route component={Error} />
                </Switch>
            </BrowserRouter>
        </>
    )
}

export default Router;