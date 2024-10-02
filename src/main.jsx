import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {   createBrowserRouter,  RouterProvider,} from "react-router-dom";
import "./styles/index.css";
import Root, { loader as rootLoader, action as rootAction, } from "./routes/root";
import ErrorPage from "./components/error-page";
import Contact, {  loader as contactLoader,  action as contactAction,} from "./routes/contact";
import EditContact, { action as editAction,} from "./routes/edit";
import { action as destroyAction } from "./routes/destroy";
import Index from "./components/index";
import SignIn from "./components/sign-in/SignIn";
import SignUp from "./components/sign-up/SignUp";
import theme from "./components/theme";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from '@mui/material/CssBaseline';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


const router = createBrowserRouter([
  {
    path: "/",
    element: <SignUp />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,

        children: [
          { index: true, element: <Index />,  },
          {
            path: "contacts/:contactId",
            element: <Contact />,
            loader: contactLoader,
            action: contactAction,
          },
          {
            path: "contacts/:contactId/edit",
            element: <EditContact />,
            loader: contactLoader,
            action: editAction,
          },
          {
            path: "contacts/:contactId/destroy",
            action: destroyAction,
            errorElement: <div>Oops! There was an error.</div>,
          },
        ],

      }],

  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />    
    </ThemeProvider>    
  </React.StrictMode>
);
