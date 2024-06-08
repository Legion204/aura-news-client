import PropTypes from 'prop-types';
import DetailsBtn from './DetailsBtn';

const PremiumArticleCard = ({premiumArticle}) => {
    return (

        <div className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-50">
            <img role="presentation" className="object-cover w-full rounded h-44 dark:bg-gray-500" src={premiumArticle?.articleImg} />
            <div className="p-6 space-y-2">
                <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">{premiumArticle?.articleTitle}</h3>
                <span className="text-xs dark:text-gray-600">{premiumArticle?.publishDate}</span>
                <p>{premiumArticle?.details.slice(0,100)+ '...'}</p>
                <DetailsBtn id={premiumArticle?._id}></DetailsBtn>
            </div>
        </div>

    );
};

PremiumArticleCard.propTypes={
    premiumArticle:PropTypes.object
}

export default PremiumArticleCard;