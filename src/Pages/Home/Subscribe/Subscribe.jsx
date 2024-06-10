import Lottie from "lottie-react";
import news from "../../../assets/news.json"

const Subscribe = () => {
    return (
        <div className="mt-10">
            <section className="py-6 bg-red-700 text-white">
                <div className="container mx-auto flex flex-col justify-center p-4 space-y-8 md:p-10 lg:space-y-0 lg:space-x-12 lg:justify-around lg:flex-row">
                    <div className="flex flex-col items-center space-y-4 text-center lg:text-left">
                        <Lottie className="w-60" animationData={news} loop={true} />
                        <h1 className="text-5xl font-bold leading-none">Stay With Us</h1>
                        <p className="text-lg">Subscribe to get Exclusive and Exciting Offers</p>
                    </div>
                    <div className="flex flex-row items-center self-center justify-center flex-shrink-0 shadow-md lg:justify-end">

                        <div className="flex flex-row">
                            <input type="text" placeholder="example@email.com" className="w-3/5 p-3 rounded-l-lg sm:w-2/3" />
                            <button type="button" className="w-2/5 p-3 font-semibold rounded-r-lg sm:w-1/3 bg-accent text-white">Subscribe</button>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default Subscribe;