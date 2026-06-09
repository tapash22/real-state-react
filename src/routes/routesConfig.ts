import { createElement } from "react";
import type { RouteObject } from "react-router-dom";

// Layout Shell
import { AppLayout } from "../layout/AppLayout";

// Pages
import AgentsDetails from "../pages/AgentsDetails";
import { Home } from "../pages/Home";

import PropertyDetails from "../components/map-search/PropertyDetails";
import RealEstateSearchModule from "../pages/RealEstateSearchModule";
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
      //  Map Search & Filters Page
      {
        path: "search",
        element: createElement(RealEstateSearchModule),
      },
      // Updated Property Details Page
      {
        path: "property/:id",
        element: createElement(PropertyDetails),
      },

      // Agent Details Page
      {
        path: "agents/:id",
        element: createElement(AgentsDetails),
      },

      // Authentication Pages
      {
        path: "signin",
        element: createElement(SignInForm),
      },
      {
        path: "signup",
        element: createElement(SignUpForm),
      },

      //last use page route details
      // {
      //   path: "property/:id",
      //   element: createElement(PropertyDetails),
      // },
    ],
  },
];
