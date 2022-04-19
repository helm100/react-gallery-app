import index from "../index.json"
import { Outlet, Link, useLocation } from "react-router-dom";

export default function Nav() {
    const { pathname } = useLocation();
    const splitLocation = pathname.split('/');

    document.title = splitLocation[1] ? "am - " + splitLocation[1] : "a l e x a m e y e r m a n";

    return (
        <>
            <nav className="Nav">
                <ul>
                    {
                        index.map(p => {
                            let clsNm = splitLocation[1] == p.name ? "NavItemSelected" : "NavItem";
                            return <li key={p.name}>
                                <Link 
                                    to={p.name}
                                    className={clsNm}
                                >
                                    {p.name}
                                </Link></li>;
                        })
                    }
                </ul>
            </nav>
            <Outlet />
        </>
    )
}