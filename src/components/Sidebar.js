
import SidebarItem from "./SidebarItem";
import LightLogo from '../assets/Automa-dark.png';
import sidebar_items from '../assets/JsonData/sidebar_routes.json'
import {Link, useLocation} from "react-router-dom";

function Sidebar() {
    const location = useLocation();
    const activeItem = sidebar_items.findIndex(item => item.route === location.pathname)
    return (
        <div className='sidebar'>
            <div className="sidebar__logo">
                <img src={LightLogo} alt="company logo" />
            </div>
            {
                sidebar_items.map((item, index) => (
                    <Link to={item.route} key={index}>
                        <SidebarItem
                            title={item.display_name}
                            icon={item.icon}
                            active={index === activeItem}
                        />
                    </Link>
                ))
            }
        </div>
    )
}

export default Sidebar
