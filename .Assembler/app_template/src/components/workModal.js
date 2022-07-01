import { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import React from 'react';
import './workModal.css'

export default function WorkModal({ indexJson, image, set, setShow, numberPerPage }) {
    let { pageNr } = useParams();
    const navigate = useNavigate();

    let nextIndex = indexJson.indexOf(image) + 1;
    let showNext = nextIndex >= indexJson.length ? false : true;
    let showPrev = nextIndex <= 1 ? false : true;
    let prevPage = Math.floor((nextIndex - 2) / numberPerPage);
    let nextPage = Math.floor(nextIndex / numberPerPage);
    let divRef = React.createRef();

    useEffect(() => {
        divRef.current.focus();
    })

    const keyDownHandler = (k) => {
        if (k.code === "ArrowRight" && nextIndex < indexJson.length) {
            navigate("../" + nextPage + "/" + indexJson[nextIndex].name);
            set(indexJson[nextIndex]);
        }
        else if (k.code === "ArrowLeft" && nextIndex > 1) {
            navigate("../" + prevPage + "/" + indexJson[nextIndex - 2].name);
            set(indexJson[nextIndex - 2]);
        }
    }

    let content = (
        <div className='Modal' tabIndex={0} onKeyDown={keyDownHandler} ref={divRef} >

            <Link className="Close" to={pageNr}>
                <span onClick={
                    () => setShow(false)
                }>&times;</span>
            </Link>

            {image.id.endsWith(".mp4") 
                ?
                    <video className='Modal-Content' controls>
                        <source src={image.fileLoc} type="video/mp4" />
                    </video>
                : 
                    <img className='Modal-Content-Img' src={image.fileLoc} alt={image.name} />}

            <div className='Modal-Navigator'>
                {showPrev ? <Link className="Prev" to={"../" + prevPage + "/" + indexJson[nextIndex - 2].name}>
                    <span onClick={() => set(indexJson[nextIndex - 2])} >&lt;</span>
                </Link> : null}
                <p className='Caption'>
                    {image.name}<br/>
                    {image.description ? <>{image.description} <br/></> : <></>}
                    {image.month}-{image.year}
                </p>
                {showNext ? <Link className="Next" to={"../" + nextPage + "/" + indexJson[nextIndex].name}>
                    <span onClick={() => set(indexJson[nextIndex])} >&gt;</span>
                </Link> : null}
            </div>
            
        </div>
    )

    return content;
}