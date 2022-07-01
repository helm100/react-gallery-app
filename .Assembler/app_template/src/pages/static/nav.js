import index from "../index.json"
import { Outlet, NavLink, useLocation } from "react-router-dom";

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
                            return <li key={p.name}>
                            <NavLink 
                                to={p.name}
                                className={({isActive}) => isActive ? "NavItemSelected" : "NavItem"}
                            >
                                {p.name}
                            </NavLink></li>;
                        })
                    }
                </ul>
            </nav>
            <Outlet />
        </>
    )
}