import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import { getRouteConfig } from "./route.utils";
import Root from "@/layouts/Root";
import App from "@/App";

// Lazy load components
const HomePage = lazy(() => import("@/pages/HomePage"));
const ReadingZonePage = lazy(() => import("@/pages/ReadingZonePage"));
const MathZonePage = lazy(() => import("@/pages/MathZonePage"));
const GamePage = lazy(() => import("@/pages/GamePage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const RewardsPage = lazy(() => import("@/pages/RewardsPage"));
const ParentDashboard = lazy(() => import("@/pages/ParentDashboard"));
const ChildManagement = lazy(() => import("@/pages/ChildManagement"));
const Login = lazy(() => import("@/pages/Login"));
const Signup = lazy(() => import("@/pages/Signup"));
const Callback = lazy(() => import("@/pages/Callback"));
const ErrorPage = lazy(() => import("@/pages/ErrorPage"));
const ResetPassword = lazy(() => import("@/pages/ResetPassword"));
const PromptPassword = lazy(() => import("@/pages/PromptPassword"));
const Layout = lazy(() => import("@/components/organisms/Layout"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const createRoute = ({
  path,
  index,
  element,
  access,
  children,
  ...meta
}) => {
  // Get config for this route
  let configPath;
  if (index) {
    configPath = "/";
  } else {
    configPath = path.startsWith('/') ? path : `/${path}`;
  }

  const config = getRouteConfig(configPath);
  const finalAccess = access || config?.allow;

  const route = {
    ...(index ? { index: true } : { path }),
    element: element ? <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
    <div className="text-center space-y-4">
      <svg className="animate-spin h-12 w-12 text-blue-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
    </div>
  </div>}>{element}</Suspense> : element,
    handle: {
      access: finalAccess,
      ...meta,
    },
  };

  if (children && children.length > 0) {
    route.children = children;
  }

  return route;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <App />,
        children: [
          // Auth routes
          createRoute({
            path: "login",
            element: <Login />
          }),
          createRoute({
            path: "signup", 
            element: <Signup />
          }),
          createRoute({
            path: "callback",
            element: <Callback />
          }),
          createRoute({
            path: "error",
            element: <ErrorPage />
          }),
          createRoute({
            path: "prompt-password/:appId/:emailAddress/:provider",
            element: <PromptPassword />
          }),
          createRoute({
            path: "reset-password/:appId/:fields",
            element: <ResetPassword />
          }),
          
          // Main app routes
          {
            path: "/",
            element: <Layout />,
            children: [
              createRoute({
                index: true,
                element: <HomePage />
              }),
              createRoute({
                path: "math",
                element: <MathZonePage />
              }),
              createRoute({
                path: "reading",
                element: <ReadingZonePage />
              }),
              createRoute({
                path: "game/:levelId",
                element: <GamePage />
              }),
              createRoute({
                path: "rewards",
                element: <RewardsPage />
              }),
              createRoute({
                path: "profile",
                element: <ProfilePage />
              }),
              createRoute({
                path: "parent",
                element: <ParentDashboard />
              }),
              createRoute({
                path: "parent/manage-children",
                element: <ChildManagement />
              })
            ]
          },
          
          // 404 catch-all
          createRoute({
            path: "*",
            element: <NotFound />
          })
        ]
      }
    ]
  }
]);