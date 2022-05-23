
import { Link } from 'react-router-dom';
import playBtn from './play.svg'

export default function Work({ image, page }) {

    let link = page + "/" + image.id;

    return (
        <Link to={link}>
            <div className='Thumbnail'>
                
                {image.id.endsWith(".mp4") 
                ?
                    <div style={{position:"relative"}}>
                    <video className='ThumbnailContent' preload="metadata">
                        <source src={image.fileLoc} type="video/mp4" />
                    </video>
                    <img className='PlayOverlay' src={playBtn} alt="play button" />
                    </div>
                : 
                    <img className='ThumbnailContent' src={image.fileLoc} alt={image.name} />}
                <br />
                
            </div>
            <p className='ThumbnailCaption'>{image.name}</p>
        </Link>
    )
}