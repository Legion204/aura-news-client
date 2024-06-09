import { useForm } from "react-hook-form";
import SectionTitle from "../../../shared/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_image_hosting_key
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddPublications = () => {

    const axiosPublic = useAxiosPublic();

    const { register, handleSubmit,reset } = useForm();

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

            const publication = {
                publicationImg: res.data.data.display_url,
                publication: data.publication,

            }

            const articleRes = await axiosPublic.post("/publications", publication)

            if (articleRes.data.insertedId) {
                reset();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Publication added successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    };

    return (
        <div className=" p-10 lg:p-32 w-full">
            <SectionTitle heading={"Add Publication"}></SectionTitle>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full bg-white/50 p-4 md:p-8 xl:px-20 rounded-3xl">
                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-5 m">

                    <label className="form-control w-full ">
                        <div className="label">
                            <span className="label-text text-third">Publication</span>
                        </div>
                        <input type="text" {...register("publication")} placeholder="publication" name="publication" className="input input-bordered w-full " />
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Pick a file</span>
                        </div>
                        <input {...register("image")} type="file" className="file-input file-input-bordered w-full" />
                    </label>
                </div>
                <button type="submit" className="btn w-full bg-red-700 border-none text-white mt-8">Add</button>
            </form>
        </div>
    );
};

export default AddPublications;