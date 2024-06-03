import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_image_hosting_key
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddArticle = () => {

    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();

    const options = [
        { value: 'sport', label: 'sport' },
        { value: 'politics', label: 'politics' },
        { value: 'entertainment', label: 'entertainment' },
        { value: 'science', label: 'science' },
        { value: 'health', label: 'health' },
    ];

    const {
        register,
        handleSubmit,
        control,
    } = useForm();

    const onSubmit = async (data) => {
        console.log(data)
        // upload image
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });

        if (res.data.success) {
            // send data to server

            const date = new Date();

            const day = date.getDate();
            const month = date.getMonth() + 1; // The month index starts from 0
            const year = date.getFullYear();

            let currentDate = `${day}/${month}/${year}`;

            const article = {
                articleTitle: data.article_title,
                articleImg: res.data.data.display_url,
                articleTags: data.tags.map(tag => tag.value),
                details: data.details,
                publication: data.publication,
                author: user?.displayName,
                authorEmail: user?.email,
                status: 'pending',
                isPremium: false,
                publishDate: currentDate,
                articleView: 0

            }

            const articleRes = await axiosPublic.post("/articles", article)

            if (articleRes.data.insertedId) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Article added successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    }

    return (
        <div className=" p-10 lg:p-32 w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full bg-white/50 p-4 md:p-8 xl:p-20 rounded-3xl">
                <h1 className="text-center font-semibold text-5xl text-third mb-6 font-Poetsen">Add Article</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-5 m">

                    <label className="form-control w-full ">
                        <div className="label">
                            <span className="label-text text-third">Article Title</span>
                        </div>
                        <input type="text" {...register("article_title")} placeholder="Article Title" name="article_title" className="input input-bordered w-full " />
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Pick a file</span>
                        </div>
                        <input {...register("image")} type="file" className="file-input file-input-bordered w-full" />
                    </label>

                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Pick some tags</span>
                        </div>
                        <Controller
                            name="tags"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    isMulti
                                    options={options}
                                    onChange={(selectedOptions) => field.onChange(selectedOptions)}
                                />
                            )}
                        />
                    </label>

                    <label className="form-control w-full ">
                        <div className="label">
                            <span className="label-text text-third">Details</span>
                        </div>
                        <input type="text" {...register("details")} placeholder="Details" name="details" className="input input-bordered w-full " />
                    </label>

                    <label className="form-control w-full ">
                        <div className="label">
                            <span className="label-text text-third">Publication</span>
                        </div>
                        <select defaultValue={"default"} {...register("publication")} className="select select-bordered w-full max-w-xs">
                            <option disabled value={"default"}>select one</option>
                            <option value={"BBC"}>BBC</option>
                            <option value={"CNN"}>CNN</option>
                        </select>
                    </label>
                </div>
                <button type="submit" className="btn w-full bg-red-700 border-none text-white mt-8">Add</button>
            </form>
        </div>
    );
};

export default AddArticle;