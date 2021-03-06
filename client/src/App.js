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
import PrivateMitarbeiterRoute from "./components/common/PrivateMitarbeiterRoute";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Faq from "./components/layout/Faq";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import ChangePassword from "./components/auth/ChangePassword";
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
import ChangeAccountType from "./components/administration/ChangeAccountType";
import CreateSeparateContract from "./components/contract/CreateSeparateContract";
import AdvisorInvite from "./components/Invitation/AdvisorInvite";
import AdvisorRegister from "./components/auth/AdvisorRegister";
import CreateAdvisorProfile from "./components/create-profile/CreateAdvisorProfile";
import BudgetControl from "./components/budgetcontrol/BudgetControl";
import BudgetOverview from "./components/budgetcontrol/BudgetOverview";
import MailOverview from "./components/mail/MailOverview";
import CreateMailTemplate from "./components/mail/CreateMailTemplate";
import CreateSeparateContractMail from "./components/mail/CreateSeparateContractMail";
import EditMailTemplate from "./components/mail/EditMailTemplate";
import SendMail from "./components/mail/SendMail";
import SendMailToUser from "./components/mail/SendMailToUser";
import CreateContractMail from "./components/mail/CreateContractMail";
import SignableMail from "./components/mail/SignableMail";
import ContractStats from "./components/contract/ContractStats";
import EditAdvisorDetails from "./components/edit-course/EditAdvisorDetails";
import AddComment from "./components/application/AddComment";
import Help from "./components/help/Help";
import RentalOverview from "./components/rentals/RentalOverview";
import CreateRental from "./components/rentals/CreateRental";
import ViewRental from "./components/rentals/ViewRental";
import Rentalstats from "./components/rentals/Rentalstats";
import RentalstatsConfig from "./components/rentals/RentalstatsConfig";
import CreateRentalApplication from "./components/rentals/CreateRentalApplication";
import RentalApplicationOverview from "./components/rentals/RentalApplicationOverview";
import CreateRentalFromApplication from "./components/rentals/CreateRentalFromApplication";

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
          <div className="main-wrapper">
            <div className={"center-main-inner"}>
              <Navbar />
              <Route exact path="/" component={Landing} />
              <Route exact path="/faq" component={Faq} />
              <Route exact path="/register" component={Register} />
              <Route
                exact
                path="/advisorregistration/:id"
                component={AdvisorRegister}
              />
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
                  path="/change-password"
                  component={ChangePassword}
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
                <PrivateRoute exact path="/help" component={Help} />
              </Switch>
              <Switch>
                <PrivateAdvisorRoute
                  exact
                  path="/tutor-overview"
                  component={TutorOverview}
                />
              </Switch>
              <Switch>
                <PrivateAdvisorRoute
                  exact
                  path="/create-advisorprofile"
                  component={CreateAdvisorProfile}
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
                  path="/course-overview"
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
                  path="/comment/:id"
                  component={AddComment}
                />
              </Switch>
              <Switch>
                <PrivateAdvisorRoute
                  exact
                  path="/advisor-edit-course/:id"
                  component={EditAdvisorDetails}
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
              <Switch>
                <PrivateAdminRoute
                  exact
                  path="/changeaccounttype/:id"
                  component={ChangeAccountType}
                />
              </Switch>
              <Switch>
                <PrivateAdminRoute
                  exact
                  path="/createseparatecontract/"
                  component={CreateSeparateContract}
                />
              </Switch>
              <Switch>
                <PrivateAdminRoute
                  exact
                  path="/advisorinvite/"
                  component={AdvisorInvite}
                />
              </Switch>
              <Switch>
                <PrivateAdminRoute
                  exact
                  path="/budget-control/:id"
                  component={BudgetControl}
                />
              </Switch>
              <Switch>
                <PrivateAdminRoute
                  exact
                  path="/budget-overview"
                  component={BudgetOverview}
                />
              </Switch>
              <Switch>
                <PrivateAdminRoute
                  exact
                  path="/mail-overview"
                  component={MailOverview}
                />
              </Switch>
              <Switch>
                <PrivateAdminRoute
                  exact
                  path="/create-template"
                  component={CreateMailTemplate}
                />
              </Switch>
              <Switch>
                <PrivateAdminRoute
                  exact
                  path="/send-mail"
                  component={SendMail}
                />
              </Switch>
              <Switch>
                <PrivateAdminRoute
                  exact
                  path="/send-mail-to-user/:id"
                  component={SendMailToUser}
                />
              </Switch>
              <Switch>
                <PrivateAdminRoute
                  exact
                  path="/createcontractmail/:id"
                  component={CreateContractMail}
                />
              </Switch>
              <Switch>
                <PrivateAdminRoute
                  exact
                  path="/createseparatecontractmail/:id"
                  component={CreateSeparateContractMail}
                />
              </Switch>
              <Switch>
                <PrivateAdminRoute
                  exact
                  path="/signablemail/:id"
                  component={SignableMail}
                />
              </Switch>
              <Switch>
                <PrivateAdminRoute
                  exact
                  path="/edit-template/:id"
                  component={EditMailTemplate}
                />
              </Switch>
              <Switch>
                <PrivateAdminRoute
                  exact
                  path="/contractstats"
                  component={ContractStats}
                />
              </Switch>{" "}
              <Switch>
                <PrivateMitarbeiterRoute
                  exact
                  path="/rentals-overview"
                  component={RentalOverview}
                />
              </Switch>
              <Switch>
                <PrivateMitarbeiterRoute
                  exact
                  path="/new-rental"
                  component={CreateRental}
                />
              </Switch>
              <Switch>
                <PrivateMitarbeiterRoute
                  exact
                  path="/rental/:id"
                  component={ViewRental}
                />
              </Switch>
              <Switch>
                <PrivateMitarbeiterRoute
                  exact
                  path="/rentalstats"
                  component={Rentalstats}
                />
              </Switch>
              <Switch>
                <PrivateMitarbeiterRoute
                  exact
                  path="/rentalstats-config"
                  component={RentalstatsConfig}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/createrentalapplication"
                  component={CreateRentalApplication}
                />
              </Switch>
              <Switch>
                <PrivateMitarbeiterRoute
                  exact
                  path="/rentalapplications"
                  component={RentalApplicationOverview}
                />
              </Switch>
              <Switch>
                <PrivateMitarbeiterRoute
                  exact
                  path="/createrentalfromapplication/:id"
                  component={CreateRentalFromApplication}
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
