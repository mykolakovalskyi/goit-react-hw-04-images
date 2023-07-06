import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ data, openModal }) {
  const handleImgClick = () => {
    const { largeImageURL, id } = data;
    openModal(largeImageURL, id);
  };

  const { webformatURL, id } = data;

  return (
    <li className={css.galleryItem} onClick={handleImgClick}>
      <img src={webformatURL} alt={id} className={css.image} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
  }).isRequired,
  openModal: PropTypes.func.isRequired,
};
