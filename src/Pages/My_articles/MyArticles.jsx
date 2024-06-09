import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import SectionTitle from "../../shared/SectionTitle/SectionTitle";
import { MdDelete, MdEdit } from "react-icons/md";
import Swal from "sweetalert2";
import { useState } from "react";
import DetailsBtn from "../../Components/DetailsBtn";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const MyArticles = () => {
    const { firebaseUser } = useAuth();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const [articleData, setArticleData] = useState({});
    const [reason, setReason] = useState();

    const { data: myArticles = [], refetch } = useQuery({
        queryKey: ['myArticles'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my_articles?email=${firebaseUser?.email}`)
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


    // get food data from table
    const getArticleData = (id) => {
        const data = myArticles.find(myArticle => myArticle._id === id);
        setArticleData(data);
    };

    const handleUpdate = e => {
        e.preventDefault()
        const form = e.target;
        const articleTitle = form.article_title.value
        const details = form.details.value
        const updatedArticle = { articleTitle, details }

        axiosPublic.put(`/update_article/${articleData?._id}`, updatedArticle)
            .then(data => {
                if (data.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        title: "Article updated successfully!",
                        icon: "success"
                    });
                }
            })

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
                                    <td><DetailsBtn id={myArticle?._id}></DetailsBtn></td>
                                    <td>{myArticle?.status === "declined" ? <button onClick={() => {document.getElementById('my_modal_2').showModal(),setReason(myArticle?.reason)}} className="btn bg-red-700 text-white">{myArticle?.status} , See Reason</button> : myArticle?.status}</td>
                                    <td>{myArticle?.isPremium && "Yes" || "No"}</td>
                                    <td><button onClick={() => { getArticleData(myArticle?._id), document.getElementById('my_modal_3').showModal() }} className="btn text-2xl bg-red-700 text-white"><MdEdit /></button></td>
                                    <td><button onClick={() => { handleDelete(myArticle?._id) }} className="btn text-2xl bg-red-700 text-white"><MdDelete /></button></td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Modal-1 */}
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    <button onClick={() => { document.getElementById('my_modal_2').close() }} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <h3 className="font-bold text-lg">Reason</h3>
                    <p className="py-4">{reason}</p>
                </div>
            </dialog>
            {/* Modal-2 */}
            <dialog id="my_modal_3" className="modal w-full">
                <div className="modal-box w-full max-w-[80%]">
                    <button onClick={() => { document.getElementById('my_modal_3').close() }} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <form method="dialog" onSubmit={handleUpdate} className="w-full bg-white/50 p-4 md:p-8 xl:px-20 rounded-3xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-5 m">

                            <label className="form-control w-full ">
                                <div className="label">
                                    <span className="label-text text-third">Article Title</span>
                                </div>
                                <input type="text" placeholder="Article Title" name="article_title" defaultValue={articleData?.articleTitle} className="input input-bordered w-full " />
                            </label>
                            <label className="form-control w-full ">
                                <div className="label">
                                    <span className="label-text text-third">Details</span>
                                </div>
                                <input type="text" placeholder="Details" name="details" className="input input-bordered w-full " defaultValue={articleData?.details} />
                            </label>
                        </div>
                        <button onClick={() => { document.getElementById('my_modal_3').close() }} type="submit" className="btn w-full bg-red-700 border-none text-white mt-8">Add</button>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default MyArticles;