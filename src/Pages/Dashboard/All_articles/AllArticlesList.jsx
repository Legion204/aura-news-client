import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { FaCheck, FaTrashAlt } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { TbPremiumRights } from "react-icons/tb";
import Swal from "sweetalert2";
import { useState } from "react";

const AllArticlesList = () => {
    const axiosPublic = useAxiosPublic();
    const [articleData, setArticleData] = useState({});

    const { data: articles = [], refetch } = useQuery({
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

    const handleApproved = id => {
        axiosPublic.patch(`/article/approve/${id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Article approved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    };

    const handlePremium = id => {
        axiosPublic.patch(`/article/premium/${id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: " Made Article Premium Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    };

    // get food data from table
    const getArticleData = (id) => {
        const data = articles.find(myArticle => myArticle._id === id);
        setArticleData(data);
    };

    const getReason = e => {
        e.preventDefault()
        const form = e.target;
        const reason = form.reason.value
        const declineReason = { reason }
        console.log(declineReason, articleData);
        axiosPublic.patch(`/article/decline/${articleData?._id}`, declineReason)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: " Article successfully declined",
                        showConfirmButton: false,
                        timer: 1500
                    });
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
                                <td>{article?.status === "declined" || article?.status === "approved" ? article?.status : <button onClick={() => { handleApproved(article?._id) }} className="btn text-xl bg-red-700 text-white"><FaCheck /></button>}</td>
                                <td>{article?.status === "declined" || article?.status === "approved" ? article?.status : <button onClick={() => { getArticleData(article?._id), document.getElementById('my_modal_3').showModal() }} className="btn text-xl bg-red-700 text-white"><ImCross /></button>}</td>
                                <td><button onClick={() => { handleDelete(article?._id) }} className="btn text-xl bg-red-700 text-white"><FaTrashAlt /></button></td>
                                <td>{article?.isPremium && "premium" || <button onClick={() => { handlePremium(article?._id) }} className="btn text-xl bg-red-700 text-white"><TbPremiumRights /></button>}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog" onSubmit={getReason} >
                        {/* if there is a button in form, it will close the modal */}
                        <button onClick={() => { document.getElementById('my_modal_3').close() }} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text text-third">Decline reason</span>
                            </div>
                            <input type="text" placeholder=" write decline reason" name="reason" className="input input-bordered w-full " />
                        </label>
                        <button onClick={() => { document.getElementById('my_modal_3').close() }} type="submit" className="btn w-full bg-red-700 border-none text-white mt-8">send</button>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default AllArticlesList;