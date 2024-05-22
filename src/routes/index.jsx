import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import MyLayout from "../layouts/layout";
import CustomEditor from "../components/custom";
import Manage from "../components/manage";
import NewFormula from "../components/newFormula";

let variables = ['DURATION_IN_DAYS', "TRIP_TYPE"];
const router = createBrowserRouter([
    {
        children: [
            {
                element: <Manage />,
                path: '/',
            },
          {
            element: <CustomEditor variables={variables}/>,
            path: '/try',
          },
          {
            element: <NewFormula />,
            path: '/new',
          }


        //   {
        //     element: <Products />,
        //     path: '/products',
        //   },
        ],
        element: (
            <MyLayout />
        ),
      }
]);

export default function AppRouter(){
    return (
        <RouterProvider router = {router} />
    )
}