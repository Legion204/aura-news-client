import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import SectionTitle from "../../shared/SectionTitle/SectionTitle";


const ArticleDetails = () => {

    const axiosPublic = useAxiosPublic();
    const { id } = useParams()

    const { data: article = {} } = useQuery({
        queryKey: ['article'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/article/${id}`)
            return res.data
        }
    });

    return (
        <div className="">
            <SectionTitle heading={"article details"}></SectionTitle>
            <div className="w-[80%] flex flex-col m-10 mx-auto">
                <h1 className="text-5xl font-bold mb-5 ">{article?.articleTitle}</h1>
                <img className="w-full" src={article?.articleImg} alt="" />
                <h1 className="mt-5 text-xl font-semibold">Author: {article?.author}</h1>
                <h1 className=" mb-5 text-xl font-semibold">Publisher: {article?.publication}</h1>
                <div className="flex">
                    <div className="flex gap-3 items-center">
                        <h3>Tags:</h3>
                        {article?.articleTags?.map((tag, idx) => (
                            <p className="bg-red-700 text-white p-1 w-15" key={idx}>{tag}</p>
                        ))}
                    </div>
                    <div className="ml-auto">
                        <h1 className="font-semibold text-xl">Publish Date: {article?.publishDate}</h1>
                    </div>
                </div>
                <h1 className="text-3xl font-bold underline">Details:</h1>
                <p className="font-semibold">{article?.details}</p>
            </div>
        </div>
    );
};

export default ArticleDetails;