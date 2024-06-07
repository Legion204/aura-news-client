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

const router = createBrowserRouter([
    {
      path: "/",
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
      element:<Dashboard></Dashboard>,
      children:[
        {
          path:"users",
          element:<Users></Users>
        },
        {
          path:"all_articles",
          element:<AllArticlesList></AllArticlesList>
        },
        {
          path:"add_publications",
          element:<AddPublications></AddPublications>
        }
      ]
    }
  ]);

  export default router;
