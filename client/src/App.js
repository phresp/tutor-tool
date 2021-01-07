import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { logoutUser, setCurrentUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import PrivateRoute from "./components/common/PrivateRoute";
import PrivateAdminRoute from "./components/common/PrivateAdminRoute";
import PrivateAdvisorRoute from "./components/common/PrivateAdvisorRoute";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import PasswordForgotten from "./components/auth/PasswordForgotten";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import AddEducation from "./components/add-credentials/AddEducation";
import AddExperience from "./components/add-credentials/AddExperience";
import TutorOverview from "./components/tutor-overview/TutorOverview";
import SemesterOverview from "./components/semester/SemesterOverview";
import CreateSemester from "./components/create-semester/CreateSemester";
import EditSemester from "./components/edit-semester/EditSemester";
import MetacourseOverview from "./components/metacourses/MetacourseOverview";
import CreateMetacourse from "./components/create-metacourse/CreateMetacourse";
import EditMetacourse from "./components/edit-metacourse/EditMetacourse";
import CourseOverview from "./components/course/CourseOverview";
import CreateCourse from "./components/create-course/CreateCourse";
import EditCourse from "./components/edit-course/EditCourse";
import TutorApplicationView from "./components/application/TutorApplicationView";
import TutorApply from "./components/application/TutorApply";
import MyApplications from "./components/application/MyApplications";
import TutorUpdateApply from "./components/application/TutorUpdateApply";
import AdvisorCourseOverview from "./components/course/AdvisorCourseOverview";
import AdvisorApplicationView from "./components/application/AdvisorApplicationView";
import AdvisorViewTutorProfile from "./components/tutor-profile/AdvisorViewTutorProfile";
import ViewTutorProfile from "./components/tutor-profile/ViewTutorProfile";
import AdvisorCourseApplicationView from "./components/application/AdvisorCourseApplicationView";
import AdminApplicationView from "./components/application/AdminApplicationView";
import CreateContract from "./components/contract/CreateContract";
import ContractOverview from "./components/contract/ContractOverview";
import EditContract from "./components/contract/EditContract";
import MyContracts from "./components/contract/MyContracts";
import ViewContract from "./components/contract/ViewContract";
import FormsAdminOverview from "./components/forms/FormsAdminOverview";
import FormsUpload from "./components/forms/FormsUpload";

import "./App.css";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //Decode Token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  //Set user and is authenticated
  store.dispatch(setCurrentUser(decoded));
  //Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route
                exact
                path="/password-forgotten"
                component={PasswordForgotten}
              />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-experience"
                  component={AddExperience}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-education"
                  component={AddEducation}
                />
              </Switch>

              <Switch>
                <PrivateAdvisorRoute
                  exact
                  path="/tutor-overview"
                  component={TutorOverview}
                />
              </Switch>
              <Switch>
                <PrivateAdminRoute
                  exact
                  path="/semester-overview"
                  component={SemesterOverview}
                />
              </Switch>
              <Switch>
                <PrivateAdminRoute
                  exact
                  path="/create-semester"
                  component={CreateSemester}
                />
              </Switch>
              <Switch>
                <PrivateAdminRoute
                  exact
                  path="/edit-semester/:id"
                  component={EditSemester}
                />
              </Switch>
              <Switch>
                <PrivateAdminRoute
                  exact
                  path="/metacourse-overview"
                  component={MetacourseOverview}
                />
              </Switch>
              <Switch>
                <PrivateAdminRoute
                  exact
                  path="/create-metacourse"
                  component={CreateMetacourse}
                />
              </Switch>
              <Switch>
                <PrivateAdminRoute
                  exact
                  path="/edit-metacourse/:id"
                  component={EditMetacourse}
                />
              </Switch>
              <Switch>
                <PrivateAdminRoute
                  exact
                  path="/class-overview"
                  component={CourseOverview}
                />
              </Switch>
              <Switch>
                <PrivateAdminRoute
                  exact
                  path="/create-course"
                  component={CreateCourse}
                />
              </Switch>
              <Switch>
                <PrivateAdminRoute
                  exact
                  path="/edit-course/:id"
                  component={EditCourse}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/tutorapplication"
                  component={TutorApplicationView}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/tutorapply/:id"
                  component={TutorApply}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/myapplications"
                  component={MyApplications}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/updateapplication/:id"
                  component={TutorUpdateApply}
                />
              </Switch>
              <Switch>
                <PrivateAdvisorRoute
                  exact
                  path="/advisor-classes"
                  component={AdvisorCourseOverview}
                />
              </Switch>
              <Switch>
                <PrivateAdvisorRoute
                  exact
                  path="/check-applications/:id"
                  component={AdvisorApplicationView}
                />
              </Switch>
              <Switch>
                <PrivateAdvisorRoute
                  exact
                  path="/profile/:id"
                  component={ViewTutorProfile}
                />
              </Switch>
              <Switch>
                <PrivateAdvisorRoute
                  exact
                  path="/applicationdetails/:id"
                  component={AdvisorCourseApplicationView}
                />
              </Switch>
              <Switch>
                <PrivateAdminRoute
                  exact
                  path="/course-applications/:id"
                  component={AdminApplicationView}
                />
              </Switch>
              <Switch>
                <PrivateAdminRoute
                  exact
                  path="/create-contract/:id"
                  component={CreateContract}
                />
              </Switch>
              <Switch>
                <PrivateAdminRoute
                  exact
                  path="/contracts"
                  component={ContractOverview}
                />
              </Switch>

              <Switch>
                <PrivateAdminRoute
                  exact
                  path="/edit-contract/:id"
                  component={EditContract}
                />
              </Switch>

              <Switch>
                <PrivateRoute
                  exact
                  path="/mycontracts"
                  component={MyContracts}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/view-contract/:id"
                  component={ViewContract}
                />
              </Switch>

              <Switch>
                <PrivateAdminRoute
                  exact
                  path="/forms-administration"
                  component={FormsAdminOverview}
                />
              </Switch>
              <Switch>
                <PrivateAdminRoute
                  exact
                  path="/form-upload"
                  component={FormsUpload}
                />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
