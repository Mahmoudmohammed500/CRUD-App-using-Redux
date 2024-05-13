import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Rootlayout from './Pages/Rootlayout';
import Index from './Pages/Index';
import Errorpage from './Pages/Errorpage';
import { Provider } from 'react-redux';
import store from './RTK/store';
// To make Code spliting we using React.lazy
// code splitting used to prevent components from being loaded in the background when the application starts,
// because this will cause a lag in the application if the number of components is too many.
const Add = React.lazy(() => import('./Pages/Add'));
const Details = React.lazy(() => import('./Pages/Details'));
const Edit = React.lazy(() => import('./Pages/Edit'));
const PostParamHandeler = ({ params }) => {
  if (isNaN(params.id)) {
    throw new Response("Bad Request", {
      statusText: "Please Enter an Integer Positive Id",
      status: 400
    });
  }
  return null
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <Rootlayout />,
    errorElement: < Errorpage />,
    children: [
      { index: true, element: <Index /> },
      { path: "post", element: <Index /> },
      {
        path: "post/add", element:
          <Suspense fallback="Loading please Wait">
            <Add />
          </Suspense>
      }, // we write fallback={< Componentname />} instead of fallback="Loading please Wait" to calling component on loading
      {
        path: "post/:id/details", element:
          <Suspense fallback="Loading please Wait">
            <Details />
          </Suspense>
        ,
        loader: PostParamHandeler,
      },
      {
        path: "post/:id/edit", element:
          <Suspense fallback="Loading please Wait">
            <Edit />
          </Suspense>
        ,
        loader: PostParamHandeler,
      }
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      < RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
