import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../shared/SectionTitle/SectionTitle";
import ArticleCard from "../../Components/ArticleCard";
import useAxiosSecure from "../../Hooks/useAxiosSecure";


const AllArticles = () => {

    const axiosSecure = useAxiosSecure();

    const { data: articles = [] } = useQuery({
        queryKey: ['articles'],
        queryFn: async () => {
            const res = await axiosSecure.get("/articles")
            return res.data
        }
    });

    return (
        <div>
            <SectionTitle
                heading={'All articles'}
            ></SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {
                    articles?.map(article => <ArticleCard
                        key={article._id}
                        article={article}
                    ></ArticleCard>)
                }
            </div>
        </div>
    );
};

export default AllArticles;