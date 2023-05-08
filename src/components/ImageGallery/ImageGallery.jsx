import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';
import { fetchPictures } from '../../services/fetch';
import style from './ImageGallery.module.scss';

const ImageGallery = ({query}) => {
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState('idle');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImg, setModalImg] = useState('');
    const [modalAlt, setModalAlt] = useState('');
    const [prevQuery, setPrevQuery] = useState('idle');

    useEffect(() => {
        setStatus('idle');
    }, []);

    useEffect(() => {
        if (page !== 1 && prevQuery === query) {
            try {
                fetchPictures(query, page).then(response => {
                    setImages(prevImages => [...prevImages, ...response.hits]);
                    setStatus('resolved');
                    if (response.hits.length < 12) {
                        setStatus('idle');
                    };
                });
            } catch (error) {
                console.error(error);
            };
        }
    }, [query, page, prevQuery]);

    useEffect(() => {
        if (query && prevQuery !== query) {
            try {
                fetchPictures(query, 1).then(response => {
                    if (!response.hits.length || response.hits.length === 0) {
                        setImages(response.hits);
                        setStatus('rejected');
                    } else {
                        setImages(response.hits);
                        setStatus('resolved');
                        setPage(1);
                    };
                    if (response.totalHits === response.hits.length && response.hits.length !== 0) {
                        setStatus('idle');
                    };
                });
                setPrevQuery(query);
            } catch (error) {
                console.error(error);
            }
        }
    }, [query, prevQuery]);

    const showModal = event => {
        setIsModalOpen(true);
        getLargeImage(event);
    };

    const closeModal = ({ target, currentTarget }) => {
        if (target === currentTarget) {
            setIsModalOpen(false);
            setModalImg('');
            setModalAlt('');
        }
    };

    const getLargeImage = event => {
        const targetImage = images.find(item => item.webformatURL === event.target.src);
        setModalImg(targetImage.largeImageURL);
        setModalAlt(targetImage.tags);
    };

    const onLoadMore = () => {
        setStatus('pending');
        setPage(previous => previous + 1);
    };

    return (
        <>
            {images.length !== 0 && (
                <ul className={style.imageGallery}>
                    {images.map(({ id, webformatURL, tags }) => {
                        return (
                            <ImageGalleryItem key={id} image={webformatURL} tags={tags} showModal={showModal} />
                        );
                    })}
                </ul>
            )}
            {status === 'pending' && <Loader />}
            {status !== 'idle' && status !== 'pending' && images.length !== 0 && <Button onLoadMore={onLoadMore} />}
            {status === 'rejected' && <p>No results for your request, try to search something else</p>}
            {isModalOpen && <Modal largeImage={modalImg} imageAlt={modalAlt} closeModal={closeModal} />}
        </>
    );
}

ImageGallery.propTypes = {
    query: PropTypes.string.isRequired,
};

export default ImageGallery;