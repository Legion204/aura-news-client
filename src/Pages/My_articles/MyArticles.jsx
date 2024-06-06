import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import SectionTitle from "../../shared/SectionTitle/SectionTitle";
import { MdDelete, MdEdit } from "react-icons/md";
import Swal from "sweetalert2";

const MyArticles = () => {
    const { firebaseUser } = useAuth();
    const axiosPublic = useAxiosPublic();

    const { data: myArticles = [], refetch } = useQuery({
        queryKey: ['myArticles'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/my_articles?email=${firebaseUser?.email}`)
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
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <div>
            <SectionTitle heading={"My Articles"}></SectionTitle>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Title</th>
                                <th>Details</th>
                                <th>Status</th>
                                <th>Is premium</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                myArticles?.map((myArticle, index) => <tr key={myArticle?._id}>
                                    <th>{index + 1}</th>
                                    <td>{myArticle?.articleTitle}</td>
                                    <td><button className="btn bg-red-700 text-white">Details</button></td>
                                    <td>{myArticle?.status}</td>
                                    <td>{myArticle?.isPremium && "Yes" || "No"}</td>
                                    <td><button className="btn text-2xl bg-red-700 text-white"><MdEdit /></button></td>
                                    <td><button onClick={() => { handleDelete(myArticle?._id) }} className="btn text-2xl bg-red-700 text-white"><MdDelete /></button></td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyArticles;