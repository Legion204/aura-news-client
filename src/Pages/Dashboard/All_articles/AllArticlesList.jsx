import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { FaCheck, FaTrashAlt } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { TbPremiumRights } from "react-icons/tb";
import Swal from "sweetalert2";

const AllArticlesList = () => {
    const axiosPublic = useAxiosPublic();

    const { data: articles = [],refetch } = useQuery({
        queryKey: ['article', 'dashboard'],
        queryFn: async () => {
            const res = await axiosPublic.get("/articles/admin")
            return res.data
        }
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/my_article/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your article has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    };

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Article Title</th>
                            <th>Author Name</th>
                            <th>Author Email</th>
                            <th>Posted Date</th>
                            <th>Status</th>
                            <th>Publisher</th>
                            <th>Approve</th>
                            <th>Decline</th>
                            <th>Delete</th>
                            <th>Make premium</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            articles?.map((article, idx) => <tr key={article?._id}>
                                <th>{idx + 1}</th>
                                <td>{article?.articleTitle}</td>
                                <td>{article?.author}</td>
                                <td>{article?.authorEmail}</td>
                                <td>{article?.publishDate}</td>
                                <td>{article?.status}</td>
                                <td>{article?.publication}</td>
                                <td>{article?.status === "approved" && article?.status || <button className="btn text-xl bg-red-700 text-white"><FaCheck /></button>}</td>
                                <td>{article?.status === "decline" && article?.status || <button className="btn text-xl bg-red-700 text-white"><ImCross /></button>}</td>
                                <td><button onClick={() => { handleDelete(article?._id) }} className="btn text-xl bg-red-700 text-white"><FaTrashAlt /></button></td>
                                <td>{article?.isPremium && "premium" || <button className="btn text-xl bg-red-700 text-white"><TbPremiumRights /></button>}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllArticlesList;