import React, { useState, useEffect } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import getPictures from 'API/getPictures';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [picturesData, setPicturesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [modalImg, setModalImg] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = query => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const loadMore = () => {
    setCurrentPage(prevState => prevState + 1);
  };

  const openModal = (url, id) => {
    setIsModalOpen(true);
    setModalImg({ url, id });
  };

  const onModalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (searchQuery !== '') {
      setPicturesData([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    const func = async () => {
      setIsLoading(true);
      await getPictures(searchQuery, currentPage)
        .then(response => {
          if (response.data.hits.length === 0) {
            alert('Sorry, but no pictures were found');
          } else {
            setPicturesData(prevState => [...prevState, ...response.data.hits]);
            setTotalPages(Math.ceil(response.data.totalHits / 12));
          }
        })
        .catch(error => {
          alert(error.massage);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    func();
  }, [searchQuery, currentPage]);

  return (
    <>
      <Searchbar onSubmit={handleSubmit}></Searchbar>
      {searchQuery !== '' && (
        <ImageGallery data={picturesData} openModal={openModal}></ImageGallery>
      )}
      {isLoading && <Loader />}
      {picturesData.length !== 0 &&
        searchQuery !== '' &&
        currentPage !== totalPages && <Button onClick={loadMore} />}
      {isModalOpen && (
        <Modal onModalClose={onModalClose} modalImg={modalImg}></Modal>
      )}
    </>
  );
}
