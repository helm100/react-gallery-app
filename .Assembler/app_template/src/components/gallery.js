import Work from './work';
import WorkModal from './workModal';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import './workModal.css';

export default function Gallery({ indexJson, page, imageId }) {
    const [showModal, setShowmodal] = useState(false);
    const [modalContent, setModalContent] = useState(indexJson[0]);

    const openModal = (img) => {
        setShowmodal(true);
        setModalContent(img);
    };

    page = parseInt(page);
    const numberPerPage = 100;
    const numberOfPages = Math.ceil(indexJson.length / numberPerPage);    

    //page re-routing and initialization
    if (imageId && showModal === false) {
        let imageIndex = indexJson.map((i) => i.id).indexOf(imageId);
        if (imageIndex !== -1 && page === Math.floor(imageIndex / numberPerPage)) {
            const image = indexJson[imageIndex];
            openModal(image);
        }
        else return <Navigate to="0" />;
    } 
    else {
        if (page >= numberOfPages) {
            let lastPage = String(numberOfPages - 1);
            return <Navigate to={lastPage} />;
        }
        else if (page < 0 || isNaN(page)) {
            return <Navigate to="0" />;
        }
    }
    

    return (
        <>
            {showModal ? 
                <WorkModal indexJson={indexJson} image={modalContent} set={setModalContent} setShow={setShowmodal} numberPerPage={numberPerPage} /> 
                : null}
            <div className='GalleryCanvas'>
                {
                    indexJson
                        .slice(numberPerPage * page, numberPerPage * (page + 1))
                        .map((image) => <Work key={image.id} image={image} page={page} />)
                }
            </div>
            {numberOfPages > 1 ?
                <nav className="GalleryPageNav">
                    <ul>
                        {
                            [...Array(numberOfPages).keys()].map(key => <li key={key}><Link to={'./' + key}>{key}</Link></li>)
                        }
                    </ul>
                </nav>
            : null}
        </>
    );
}