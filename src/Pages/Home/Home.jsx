import SectionTitle from "../../shared/SectionTitle/SectionTitle";
import Publications from "./Publications/Publications";
import Slider from "./Slider/Slider";
import SubPlan from "./SubPlan/SubPlan";
import Subscribe from "./Subscribe/Subscribe";
import UserCount from "./UserCount/UserCount";

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <SectionTitle heading={'Publications'}></SectionTitle>
            <Publications></Publications>
            <SectionTitle heading={'User Statistic'}></SectionTitle>
            <UserCount></UserCount>
            <SectionTitle heading={'Subscription plan'}></SectionTitle>
            <SubPlan></SubPlan>
            <SectionTitle heading={'Subscribe'}></SectionTitle>
            <Subscribe></Subscribe>
        </div>
    );
};

export default Home;