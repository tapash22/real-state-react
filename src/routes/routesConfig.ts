import { createElement } from "react";
import type { RouteObject } from "react-router-dom";
// Layout Shell
import { AppLayout } from "../layout/AppLayout";
import { AuthLayout } from "../layout/AuthLayout";
// Pages
import PropertyDetails from "../components/map-search/PropertyDetails";
import AgentsDetails from "../pages/AgentsDetails";
import HelpingDetails from "../pages/HelpingDetails";
import { Home } from "../pages/Home";
import LandLord from "../pages/LandLord";
import Pricing from "../pages/Pricing";
import RealEstateSearchModule from "../pages/RealEstateSearchModule";
import SignInForm from "../pages/SignInForm";
import SignUpForm from "../pages/SignUpForm";
import WorkingProcess from "../pages/WorkingProcess";
import { GuestRoute } from "./GuestRoute";
import { ProtectedRoute } from "./ProtectedRoute";
// need to update or replace this page  with new
// import PropertyDetails from "../pages/PropertyDetails";

/**
 * Routes Configuration Array
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
      // Protected
      {
        element: createElement(ProtectedRoute),

        children: [
          {
            path: "list-property",
            element: createElement(LandLord),
          },
        ],
      },
    ],
  },

  // AUTH / GUEST ROUTES
  {
    path: "/auth",
    element: createElement(GuestRoute),
    children: [
      {
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
    ],
  },
];
