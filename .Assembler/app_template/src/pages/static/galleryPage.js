
import { Routes, Route, NavLink, Outlet } from 'react-router-dom';
import Gallery from '../../components/gallery';

export default function GalleryPage({ indexJson }) {

    const navLinks = [];

    navLinks.push(["_", ""]);
    Object.keys(indexJson).forEach(key => {
        if (key !== "_") navLinks.push([key, key]);
    })

    const NavLinkBar = (
        <nav className="Nav" style={{height: "15px", padding: "3px", margin: "0 0 5px 0"}}>
                <ul style={{height: "inherit", margin: "0"}}>
                    {
                        navLinks.map(l => {
                            return <li key={l[0]}>
                                <NavLink
                                    to={l[1]}
                                    className={({ isActive }) => isActive ? "NavItemSelected" : "NavItem"}
                                >
                                    {l[0]}
                                </NavLink></li>;
                        })
                    }
                </ul>
            </nav>
    )

    return (
        <div>

            { navLinks.length > 1 ? NavLinkBar : null }

            {/* <Outlet /> */}

            <Routes>
                {
                    Object.keys(indexJson).map(key => {
                        if (key === "_" && Array.isArray(indexJson[key])) {
                            const galleryIndex = indexJson[key];
                            return (
                                <Route path="" element={<Gallery indexJson={galleryIndex} />}>
                                    <Route path=":pageNr" element={<Gallery indexJson={galleryIndex} />}>
                                        <Route path={":image"} element={<Gallery indexJson={galleryIndex} />} />
                                    </Route>
                                </Route>
                            )
                        }
                        else {
                            const pageIndex = indexJson[key];
                            return (
                                <Route path={key + "/*"} element={<GalleryPage indexJson={pageIndex} />} />
                            )
                        }
                    })
                }
            </Routes>

            {/* <Routes>
                <Route index element={<Gallery indexJson={indexJson} />} />
                {secondGallery ? <Route path="second/*" element={<GalleryPage indexJson={indexJson} secondGallery={false} />} /> : <></>}
                <Route path=":pageNr" element={<Gallery indexJson={indexJson} />} >
                    <Route path={":image"} element={<Gallery indexJson={indexJson} />} />
                </Route>
            </Routes> */}

        </div>
    )
}