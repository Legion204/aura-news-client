import PropTypes from 'prop-types';

const PublicationCard = ({ publication }) => {
    return (
        <div className="card w-96 bg-base-100 shadow-xl justify-self-center">
            <div className="card-body">
                <h2 className="card-title">{publication?.publication}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
            </div>
            <figure><img src={publication?.publicationImg} alt="Shoes" /></figure>
        </div>
    );
};

PublicationCard.propTypes = {
    publication: PropTypes.object
}

export default PublicationCard;