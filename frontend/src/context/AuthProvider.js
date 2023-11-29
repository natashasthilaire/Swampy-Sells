import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
      console.log(authenticated, 'authenticated in AuthProvider');
    }, [authenticated]);

    const login = async (email, password) => {
        try {
            
            const response = await fetch('http://localhost:5003/api/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email, password }),
              credentials: 'include',
            });
      
            if (response.status === 200) {
              console.log('response.status === 200')
              setAuthenticated(true);
              const getUser = await fetch('http://localhost:5003/api/auth', {
                method: 'GET',
                credentials: 'include'
              });
              const user = await getUser.json();
              setUser(user.user);
            } else {
              console.log('Does else print');
              setAuthenticated(false);
             
            }
          } catch (error) {
            console.log('Does catch(error) print?')
            console.error(error);
            setAuthenticated(false);
            
          }
      }

      const logout = async () => {
        try {
          const response = await fetch('http://localhost:5003/api/logout', {
            method: 'POST',
            credentials: 'include',
          });
    
          if (response.status === 200) {
            setAuthenticated(false);
            setUser(null);
          }
        } catch (error) {
          console.error(error);
        }
      }

      const loginWithPromise = (email, password) => {
        return new Promise(async (resolve, reject) => {
          try {
            await login(email, password);
            resolve();
          } catch (error) {
            reject(error);
          }
        });
      };

    return (
        <AuthContext.Provider value={{ authenticated, user, login: loginWithPromise, logout}}>
        {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => {
    return useContext(AuthContext);
}