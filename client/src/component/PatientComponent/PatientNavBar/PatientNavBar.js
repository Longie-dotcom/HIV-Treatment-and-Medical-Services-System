import './PatientNavBar.css';
import Icon from '../../../uploads/logo.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function PatientNavBar({ user }) {
    const [state, setState] = useState('');
    const serverApi = process.env.REACT_APP_SERVER_API;
    const userAvatarAssetApi = process.env.REACT_APP_USER_AVATAR_ASSEST_API;

    return (
        <div className='patient-nav-bar'>
            <div className="logo">
                <Link to="/home"><img src={Icon} alt='Logo of You are heard' /></Link>
            </div>
            <div className='main-navigate'>
                <ul>
                    <li style={state === 'home' ? { backgroundColor: '#8474ab' } : {}}>
                        <Link to="/home" onClick={() => setState('home')}>
                            <i className="bi bi-house"></i>
                        </Link>
                    </li>
                    <li style={state === 'userPage' ? { backgroundColor: '#8474ab' } : {}}>
                        <Link to="/userPage" onClick={() => setState('userPage')}>
                            <i className="bi bi-folder-symlink"></i>
                        </Link>
                    </li>
                    <li style={state === 'blogPage' ? { backgroundColor: '#8474ab' } : {}}>
                        <Link to="/blogPage" onClick={() => setState('blogPage')}>
                            <i className="bi bi-people"></i>
                        </Link>
                    </li>
                    <li style={state === 'doctorInfoPage' ? { backgroundColor: '#8474ab' } : {}}>
                        <Link to="/doctorInfoPage" onClick={() => setState('doctorInfoPage')}>
                            <i class="bi bi-hospital"></i>
                        </Link>
                    </li>
                    <li style={state === 'appointmentPage' ? { backgroundColor: '#8474ab' } : {}}>
                        <Link to="/appointmentPage" onClick={() => setState('appointmentPage')}>
                            <i class="bi bi-calendar"></i>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className='user-login'>
                {(user._id !== '68282d903bfc920748af8058' ?
                    (<Link to="/userPage">
                        <div className="avatar">
                            <img
                                src={`${serverApi}${userAvatarAssetApi}/${user.profilePic}`}
                                alt={`${user.name}'s avatar`}
                            />
                        </div>
                    </Link>
                    ) :
                    (
                        <Link to="/login">
                            <i className="bi bi-person-circle"></i>
                        </Link>
                    )
                )}
            </div>
        </div>
    )
}

export default PatientNavBar;