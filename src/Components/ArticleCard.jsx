import PropTypes from 'prop-types';
import DetailsBtn from "./DetailsBtn";

const ArticleCard = ({ article }) => {
    return (
        <article className="flex flex-col dark:bg-gray-50">
            <a rel="noopener noreferrer" href="#" aria-label="Te nulla oportere reprimique his dolorum">
                <img alt="" className="object-cover w-full h-64 dark:bg-gray-500" src={article?.articleImg} />
            </a>
            <div className="flex flex-col flex-1 p-6">
                <p className="text-xs tracking-wider uppercase hover:underline dark:text-green-600">{article?.author}</p>
                <h3 className="flex-1 py-2 text-lg font-semibold leading-snug">{article?.articleTitle}</h3>
                <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs dark:text-gray-600">
                    <span>{article?.publishDate}</span>
                    <span>{article?.articleView} views</span>
                </div>
                <DetailsBtn id={article?._id}></DetailsBtn>
            </div>
        </article>
    );
};

ArticleCard.propTypes={
    article:PropTypes.object
}

export default ArticleCard;