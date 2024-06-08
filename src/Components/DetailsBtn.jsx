import { Link } from "react-router-dom";
import PropTypes from 'prop-types';


const DetailsBtn = ({id}) => {
    return (
        <>
            <Link to={`/article/${id}`} className="btn btn-ghost text-white bg-red-700 mt-5 w-28 justify-self-end">See details</Link>
        </>
    );
};

DetailsBtn.propTypes={
    id:PropTypes.string
}
export default DetailsBtn;