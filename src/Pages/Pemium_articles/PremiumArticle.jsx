import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../shared/SectionTitle/SectionTitle";
import PremiumArticleCard from "../../Components/PremiumArticleCard";
import useAxiosSecure from "../../Hooks/useAxiosSecure";


const PremiumArticle = () => {

    const axiosSecure = useAxiosSecure();

    const { data: premiumArticles = [] } = useQuery({
        queryKey: ['premiumArticles'],
        queryFn: async () => {
            const res = await axiosSecure.get("/premium_articles")
            return res.data
        }
    });

    return (
        <div>
            <SectionTitle heading={'Premium Articles'}></SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {
                    premiumArticles?.map(premiumArticle => <PremiumArticleCard
                        key={premiumArticle?._id}
                        premiumArticle={premiumArticle}
                    ></PremiumArticleCard>)
                }
            </div>
        </div>
    );
};

export default PremiumArticle;