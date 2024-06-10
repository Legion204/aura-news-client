import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home";
import Registration from "../Pages/Registration/Registration";
import Login from "../Pages/Login/Login";
import AddArticle from "../Pages/Add_article/AddArticle";
import AllArticles from "../Pages/All_article/AllArticles";
import ArticleDetails from "../Pages/Article_details/ArticleDetails";
import PremiumArticle from "../Pages/Pemium_articles/PremiumArticle";
import MyArticles from "../Pages/My_articles/MyArticles";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import Users from "../Pages/Dashboard/Users/Users";
import AllArticlesList from "../Pages/Dashboard/All_articles/AllArticlesList";
import AddPublications from "../Pages/Dashboard/Add_publications/AddPublications";
import AdminRoute from "./AdminRoute";
import ErrorPage from "../shared/Error/ErrorPage";

const router = createBrowserRouter([
    {
      path: "/",
      errorElement:<ErrorPage></ErrorPage>,
      element: <Root></Root>,
      children:[
        {
            path:"/",
            element:<Home></Home>
        },
        {
          path:"/registration",
          element:<Registration></Registration>
        },
        {
          path:"/login",
          element:<Login></Login>
        },
        {
          path:"/add_article",
          element:<PrivateRoute><AddArticle></AddArticle></PrivateRoute>
        },
        {
          path:"/all_articles",
          element:<PrivateRoute><AllArticles></AllArticles></PrivateRoute>
        },
        {
          path:"/article/:id",
          element:<PrivateRoute><ArticleDetails></ArticleDetails></PrivateRoute>
        },
        {
          path:"/premium_articles",
          element:<PrivateRoute><PremiumArticle></PremiumArticle></PrivateRoute>
        },
        {
          path:"/my_articles",
          element:<PrivateRoute><MyArticles></MyArticles></PrivateRoute>
        }
      ]
    },
    {
      path:"dashboard",
      element:<AdminRoute><Dashboard></Dashboard></AdminRoute>,
      children:[
        {
          path:"users",
          element:<AdminRoute><Users></Users></AdminRoute>
        },
        {
          path:"all_articles",
          element:<AdminRoute><AllArticlesList></AllArticlesList></AdminRoute>
        },
        {
          path:"add_publications",
          element:<AdminRoute><AddPublications></AddPublications></AdminRoute>
        }
      ]
    }
  ]);

  export default router;
