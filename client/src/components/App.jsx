import React, { useEffect } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import Header from "./UI/Header/Header";
import * as actions from "../store/actions/index";
import Landing from "../components/Landing/Landing";

const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;

const App = (props) => {
  const { fetchUserInit } = props;

  useEffect(() => {
    fetchUserInit();
  }, [fetchUserInit]);

  return (
    <div>
      <Router>
        <div className="container">
          <Header />
          <Route path="/" exact component={Landing} />
          <Route path="/surveys/new" component={SurveyNew} />
          <Route path="/surveys" exact component={Dashboard} />
        </div>
      </Router>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserInit: () => dispatch(actions.fetchUser()),
  };
};

export default connect(null, mapDispatchToProps)(App);
