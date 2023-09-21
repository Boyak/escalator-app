import * as React from "react";
import * as ReactDOM from "react-dom/client";


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import Home from "./routes/home";
import TemplateCreator from "./routes/template-creator";
import EscalationRunner from "./routes/escalation-runner";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/template-creator",
        element: <TemplateCreator />,
        // action: editAction,
      },
      {
        path: "/escalation-runner",
        element: <EscalationRunner />,
        // action: editAction,
      },

      
      
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);