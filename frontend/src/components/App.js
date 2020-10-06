import React from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import LoginPage from "./LoginPage";
import SignUp from './SignUp.js'


//style the App components
const useStyles = makeStyles((theme) => ({
  fieldSpace: {
    padding: "8px 8px 10px 8px",
  },
  containerSpace: {
    padding: "24px 24px 0px 24px",
  },
}));

{
  /*
   * App component is the parent component for TODO application
   */
}
function App() {
  const classes = useStyles();
  return (
      <Container
        fixed={true}
        maxWidth={"md"}
        className={classes.containerSpace}
      >
        <Paper elevation={1} className={classes.fieldSpace}>
          <Router>
            <Switch>
              <Route exact path="/">
                <LoginPage />
              </Route>
              <Route exact path="/signup">
                <SignUp />
              </Route>
            </Switch>
          </Router>
        </Paper>
      </Container>
  );
}

export default App;