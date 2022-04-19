
import { useParams } from 'react-router-dom';
import Gallery from '../../components/gallery';

export default function GalleryPage({indexJson}) {
    let { pageNr, image } = useParams();

    if (!pageNr) pageNr = 0;

    return (
        <main>
        <Gallery indexJson={indexJson} page={pageNr} image={image} />
        </main>
    )
}