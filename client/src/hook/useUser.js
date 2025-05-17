import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

// Guest
const guest = { 
  _id: '68282d903bfc920748af8058', 
  name: 'Guest', 
  profilePic: 'guest.png',
  role: 'patient'
}

// Function to extract token from cookies
const getTokenFromCookies = () => {
  const cookies = document.cookie;
  const token = cookies.split(';').find(cookie => cookie.trim().startsWith('token'));
  return token ? token.split('=')[1] : null;
};

const useUser = () => {
  const [reloadCookies, setReloadCookies] = useState(0);
  const [user, setUser] = useState(guest);

  useEffect(() => {
    const token = getTokenFromCookies();
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUser(decodedToken);
      } catch (error) {
        console.error("Token decoding failed:", error);
        setUser(null);
      }
    }
  }, [reloadCookies]);

  return { user, setReloadCookies };
};

export default useUser;
