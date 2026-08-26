import { createElement } from "react";
import type { RouteObject } from "react-router-dom";

// Layout Shell
import { AppLayout } from "../layout/AppLayout";
import { AuthLayout } from "../layout/AuthLayout";

// Pages
import AgentsDetails from "../pages/AgentsDetails";
import { Home } from "../pages/Home";

import PropertyDetails from "../components/map-search/PropertyDetails";
import HelpingDetails from "../pages/HelpingDetails";
import LandLord from "../pages/LandLord";
import Pricing from "../pages/Pricing";
import RealEstateSearchModule from "../pages/RealEstateSearchModule";
import SignInForm from "../pages/SignInForm";
import SignUpForm from "../pages/SignUpForm";
import WorkingProcess from "../pages/WorkingProcess";

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
      {
        path: "list-property",
        element: createElement(LandLord),
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

      {
        path: "pricing",
        element: createElement(Pricing),
      },
      {
        path: "how-it-works",
        element: createElement(WorkingProcess),
      },
      {
        path: "help",
        element: createElement(HelpingDetails),
      },

      // Authentication Pages
      // {
      //   path: "signup",
      //   element: createElement(SignUpForm),
      // },

      //last use page route details
      // {
      //   path: "property/:id",
      //   element: createElement(PropertyDetails),
      // },
    ],
  },
  {
    path: "/auth",
    element: createElement(AuthLayout),
    children: [
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
