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
  ]);

  export default router;
