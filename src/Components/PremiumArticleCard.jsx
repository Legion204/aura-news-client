import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PremiumArticleCard = ({premiumArticle}) => {
    return (

        <div className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-50">
            <img role="presentation" className="object-cover w-full rounded h-44 dark:bg-gray-500" src={premiumArticle?.articleImg} />
            <div className="p-6 space-y-2">
                <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">{premiumArticle?.articleTitle}</h3>
                <span className="text-xs dark:text-gray-600">{premiumArticle?.publishDate}</span>
                <p>{premiumArticle?.details}</p>
                <Link to={`/article/${premiumArticle?._id}`} className="btn btn-ghost text-white bg-red-700 mt-5 w-28 justify-self-end">See details</Link>
            </div>
        </div>

    );
};

PremiumArticleCard.propTypes={
    premiumArticle:PropTypes.object
}

export default PremiumArticleCard;