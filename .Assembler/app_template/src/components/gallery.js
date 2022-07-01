import Work from './work';
import WorkModal from './workModal';
import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import './workModal.css';

export default function Gallery({ indexJson }) {
    const [showModal, setShowmodal] = useState(false);
    const [modalContent, setModalContent] = useState(indexJson[0]);
    let { pageNr, imageId } = useParams();

    const openModal = (img) => {
        setShowmodal(true);
        setModalContent(img);
    };

    pageNr = parseInt(pageNr);
    const numberPerPage = 2;
    const numberOfPages = Math.ceil(indexJson.length / numberPerPage);    

    //page re-routing and initialization
    if (imageId && showModal === false) {
        let imageIndex = indexJson.map((i) => i.id).indexOf(imageId);
        if (imageIndex !== -1 && pageNr === Math.floor(imageIndex / numberPerPage)) {
            const imageData = indexJson[imageIndex];
            openModal(imageData);
        }
        else return <Navigate to="0" />;
    } 
    else {
        if (pageNr >= numberOfPages) {
            let lastPage = String(numberOfPages - 1);
            return <Navigate to={lastPage} />;
        }
        else if (pageNr < 0 || isNaN(pageNr)) {
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
                        .slice(numberPerPage * pageNr, numberPerPage * (pageNr + 1))
                        .map((image) => <Work key={image.id} image={image} page={pageNr} />)
                }
            </div>
            {numberOfPages > 1 ?
                <nav className="GalleryPageNav">
                    <ul>
                        {
                            [...Array(numberOfPages).keys()].map(key => <li key={key}><Link to={"../" + key}>{key}</Link></li>)
                        }
                    </ul>
                </nav>
            : null}
        </>
    );
}