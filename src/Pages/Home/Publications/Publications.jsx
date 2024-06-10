import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import PublicationCard from "./PublicationCard";


const Publications = () => {

    const axiosPublic = useAxiosPublic();

    const { data: publications = [] } = useQuery({
        queryKey: ['publications'],
        queryFn: async () => {
            const res = await axiosPublic.get("/publications")
            return res.data
        }
    });

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
            {
                publications?.map(publication=><PublicationCard 
                    key={publication?._id}
                    publication={publication}
                    ></PublicationCard>)
            }
        </div>
    );
};

export default Publications;