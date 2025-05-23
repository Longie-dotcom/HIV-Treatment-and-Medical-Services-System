import './UserPage.css';

function UserPage({ user }) {
    const serverApi = process.env.REACT_APP_SERVER_API;
    const userAvatarAssetApi = process.env.REACT_APP_USER_AVATAR_ASSEST_API;

    return (
        <div className='user-page'>
            <div className='background-image'></div>
            <div className='user'>
                <div className='user-info'>
                    <div className='detail'>
                        <div className='header'>
                            <div className="avatar">
                                <img
                                    src={`${serverApi}${userAvatarAssetApi}/${user.profilePic}`}
                                    alt={`${user.name}'s avatar`}
                                />
                            </div>
                            <div className='name'>
                                {user.name}
                            </div>
                            <div className='setting'>
                                <button>
                                    <i className="bi bi-gear"></i>
                                </button>
                                <button>
                                    <i className="bi bi-box-arrow-right"></i>
                                </button>
                            </div>
                        </div>

                        <div className='body'>
                            <div className='title'>
                                <div className='hiv-status'>
                                    HIV status
                                </div>
                                <div className='age'>
                                    Age
                                </div>
                                <div className='gender'>
                                    Gender
                                </div>
                                {user.gender === 'female' && (<div className='pregnancy'>
                                    Pregnancy status
                                </div>)}
                            </div>

                            <div className='content'>
                                <div className='hiv-status'>
                                    {user.roleInfo.diagnosisStatus === 'not_tested' && ('not tested')}
                                </div>
                                <div className='age'>
                                    {user.age}
                                </div>
                                <div className='gender'>
                                    {user.gender}
                                </div>
                                {user.gender === 'female' && (<div className='pregnancy'>
                                    {user.roleInfo.pregnancyStatus === 'not_pregnant' && ('not pregnant')}
                                </div>)}
                            </div>
                        </div>
                    </div>
                    <div className='remind-notification'>

                    </div>
                </div>
                <div className='user-post'>
                    aa
                </div>
            </div>
        </div>
    )
}

export default UserPage;