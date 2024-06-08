// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Slider.css'
// import required modules
import { Autoplay, Pagination } from 'swiper/modules';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';



const Slider = () => {

    const axiosPublic = useAxiosPublic();

    const { data: trArticles = [] } = useQuery({
        queryKey: ['trending_articles'],
        queryFn: async () => {
            const res = await axiosPublic.get("/trending_articles")
            return res.data
        }
    });

    return (
        <>
            <Swiper
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}

                modules={[Autoplay, Pagination]}
                className="mySwiper"
            >
                {
                    trArticles?.slice(0,4).map(trArticle => <SwiperSlide key={trArticle?._id}>
                        <div className="relative">
                            <div className="absolute flex flex-col items-start justify-center h-full lg:w-[60%] z-10">
                                <div className='space-y-5 m-20'>
                                    <h1 className='font-extrabold text-3xl lg:text-5xl text-white'>{trArticle?.articleTitle}</h1>
                                    <div className='text-white'>
                                        <p>{trArticle?.articleTags.join(',')} | {trArticle?.author} | {trArticle?.publishDate}</p>
                                    </div>
                                    <Link to={`/article/${trArticle?._id}`} className="btn btn-ghost text-white bg-red-700 mt-5 w-28">See details</Link>
                                </div>
                            </div>
                            <img src={trArticle?.articleImg} alt="" />
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </>
    );
};

export default Slider;