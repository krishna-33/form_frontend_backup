import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/error";
import FormList from "../pages/form/List";
import CreateForm from "../pages/form/Create";
import DisplayForm from "../pages/form/Display";
const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        element: <FormList />,
        index: true
      },
      {
        path: "new",
        element: <CreateForm />,
      },
      {
        path: ":id",
        element: <DisplayForm />,
      },
    ]
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
