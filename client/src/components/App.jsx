import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";

const Header = () => <h2>HEADER</h2>;
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
const Landing = () => <h2>LANDING</h2>;

const App = (props) => {
  return (
    <div>
      <Router>
        <div>
          <Header />
          <Route path="/" exact component={Landing} />
          <Route path="/surveys/new" component={SurveyNew} />
          <Route path="/surveys" exact component={Dashboard} />
        </div>
      </Router>
    </div>
  );
};

export default App;
