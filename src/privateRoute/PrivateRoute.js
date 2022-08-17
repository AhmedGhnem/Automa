import { Navigate} from 'react-router-dom';

function PrivateRoute({children}) {

    return (
        <div>
            {localStorage.getItem('LoggedIn') ?
                children : <Navigate to="/login"/>
                }
        </div>
    )
}

export default PrivateRoute
