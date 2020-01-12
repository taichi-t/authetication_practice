import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import ProjectDetails from "./components/project/ProjectDetails";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import CreateProject from "./components/project/CreateProject";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { theme } from "./components/dashboard/MuiThema ";
function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/project/:id" component={ProjectDetails} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/create" component={CreateProject} />
          </Switch>
        </div>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
