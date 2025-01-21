import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import RoleSelection from "./Pages/Sign-up/RoleSelection";
import SignupForm from "./Pages/Sign-up/SignupForm";
import LoginForm from "./Pages/Login/LoginForm";
import MainContent from "./Pages/Home/MainContent";
import Client from "./Pages/Client";
import Freelancer from "./Pages/Freelancer";
import ProtectedRoute from "./common/ProtectedRoute";


import ProjectTitle from "./Components/PostProject/ProjectTitle";
import ProjectSkill from "./Components/PostProject/ProjectSkill";
import ProjectScope from "./Components/PostProject/ProjectScope";
import ProjectBudget from "./Components/PostProject/ProjectBudget";
import ProjectDescription from "./Components/PostProject/ProjectDescription";
import ProjectDetails from "./Components/PostProject/ProjectDetails";
import PostProjectLayout from "./Components/PostProject/PostProjectLayout";

import ProjectList from "./Components/Projects/ProjectList";
import ProjectView from "./Components/Projects/ProjectView";
import Profile from "./Components/Profile/Profile";


const customTheme = createTheme({
  palette: {
    secondary: {
      main: "#1976d2",
      light: "#42a5f5",
      dark: "#1565c0",
      contrastText: "#ffffff",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 700,
        },
      },
    },
  },
  MuiContainer: {
    styleOverrides: {
      root: {
        display: "flex",
        flexDirection: "column",
        boxShadow: "none",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100%",
        height: "100%",
      },
    },
  },
  MuiBox: {
    styleOverrides: {
      root: {
        display: "flex",
        boxShadow: "none",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      },
    },
  },
  MuiGrid: {
    styleOverrides: {
      root: {
        display: "flex",
        boxShadow: "none",
        justifyContent: "center",
        alignItems: "center",
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        display: "flex",
        boxShadow: "none",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      },
    },
  },
});

function App() {
  const Layout = ({ role }) => {
    return (
      <>
        <Navbar userType={role} />
        <Outlet />
        <Footer />
      </>
    );
  };
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />

      <Router>
        <Routes>
          <Route path="/" element={<MainContent />}>
            {" "}
          </Route>
          <Route path="/signup" element={<RoleSelection />}>
            {" "}
          </Route>
          <Route path="/signup-form" element={<SignupForm />}>
            {" "}
          </Route>
          <Route path="/login-form" element={<LoginForm />}>
            {" "}
          </Route>

          <Route path="/project-title" element={<ProjectTitle />}>
            {" "}
          </Route>
          <Route path="/project-skill" element={<ProjectSkill />}>
            {" "}
          </Route>
          <Route path="/project-scope" element={<ProjectScope />}>
            {" "}
          </Route>
          <Route path="/project-budget" element={<ProjectBudget />}>
            {" "}
          </Route>
          <Route path="/project-description" element={<ProjectDescription />}>
            {" "}
          </Route>
          <Route path="/project-details" element={<ProjectDetails />}>
            {" "}
          </Route>
          <Route path={"/profile"} element={<Profile />}>
            {" "}
          </Route>

          {/* Protected Route Freelancer*/}
          <Route element={<ProtectedRoute allowedRole="freelancer" />}>
            <Route element={<Layout role={"freelancer"} />}>
              <Route path="/freelancer" element={<Freelancer />} />

              <Route path="/project" element={<ProjectList />} />
              <Route path="/project/:projectId" element={<ProjectView />} />

              {/* <Route path="/freelancer/profile" element={<Profile />} /> */}
            </Route>
          </Route>

          {/* Protected Route Client*/}
          <Route element={<ProtectedRoute allowedRole="client" />}>
            <Route path="/post-project-layout" element={<PostProjectLayout />}>
              {" "}
            </Route>
            <Route element={<Layout role={"client"} />}>
              <Route path="/client" element={<Client />} />
            </Route>
          </Route>

           {/* Shared Protected Route for Profile */}
           <Route element={<ProtectedRoute allowedRole={["freelancer", "client"]} />}>
            <Route path="/profile/:id" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
