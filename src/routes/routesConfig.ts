import { createElement } from "react";
import type { RouteObject } from "react-router-dom";

// Layout Shell
import { AppLayout } from "../layout/AppLayout";

// Pages
import AgentsDetails from "../pages/AgentsDetails";
import { Home } from "../pages/Home";

import PropertyDetails from "../components/map-search/PropertyDetails";
import SignInForm from "../pages/SignInForm";
import SignUpForm from "../pages/SignUpForm";

// need to update or replace this page  with new
// import PropertyDetails from "../pages/PropertyDetails";

/**
 * 🗺️ Pure TypeScript Routes Configuration Array
 * We use `createElement` to reference components without needing JSX template tags.
 */
export const routesConfig: RouteObject[] = [
  {
    path: "/",
    element: createElement(AppLayout),
    children: [
      {
        index: true,
        element: createElement(Home),
      },
      //last use page route details
      // {
      //   path: "property/:id",
      //   element: createElement(PropertyDetails),
      // },
      {
        path: "property/:id",
        element: createElement(PropertyDetails),
      },
      {
        path: "agents/:id",
        element: createElement(AgentsDetails),
      },
      {
        path: "signin",
        element: createElement(SignInForm),
      },
      {
        path: "signup",
        element: createElement(SignUpForm),
      },
    ],
  },
];
