import {Link, useNavigate} from 'react-router-dom';
import LightLogo from '../assets/Automa-dark.png'
import Success from '../assets/check.png'
import Failed from '../assets/cross.png'
import Dropdown from "./Dropdown";


function Header({ notifications, updateNotifications }) {
    const history = useNavigate();

    const renderNotificationItem = (item, index) => (
        <div className="notification-item" key={index}>

            <div className="notifName">{item.TestResult.toString()=== 'false'  ?
                <img className="resultImg" src={Success}></img>:<img className="resultImg" src={Failed}></img>}{item.TestName}</div>
            <span className="notifDate">{item.TestDate}</span>
        </div>
    )

    function handleLogout() {
        localStorage.removeItem("LoggedIn");
        history("/login");
    }

    return (
        <header>
            <Link className="brand" to="/" >
                <img id="homelogo" src={LightLogo}></img>
            </Link>
            {!localStorage.getItem('LoggedIn') ?
        <div>
            <Link className="styledLink2" to="/">
                About
            </Link>
            <Link className="styledLink2" to="/register">
                Register
            </Link>
            <Link className="styledLink" to="/login">
                Login
            </Link>
        </div> : (
                <div>
                    <button onClick={handleLogout} className="styledLink" to="/">
                        Logout
                    </button>
                    <div className="topnav__right-item">
                        <Dropdown
                            icon='bx bx-bell'
                            badge={notifications.length}
                            contentData={notifications.sort((a,b)=>{return b.id - a.id})}
                            renderItems={(item, index) => renderNotificationItem(item, index)}
                            renderFooter={() => <button className="btn3" onClick={() => updateNotifications([])}>Clear All</button>}
                        />
                    </div>
                </div>

                )}
        </header>
    )
}

export default Header
