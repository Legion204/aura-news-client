import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home";
import Registration from "../Pages/Registration/Registration";
import Login from "../Pages/Login/Login";
import AddArticle from "../Pages/Add_article/AddArticle";
import AllArticles from "../Pages/All_article/AllArticles";
import ArticleDetails from "../Pages/Article_details/ArticleDetails";

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
          element:<AddArticle></AddArticle>
        },
        {
          path:"/all_articles",
          element:<AllArticles></AllArticles>
        },
        {
          path:"/article/:id",
          element:<ArticleDetails></ArticleDetails>
        }
      ]
    },
  ]);

  export default router;
