// Package imports.
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import auth from '@react-native-firebase/auth';

// Type imports.
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

// Interface definitions.
interface IAuthContext {
  currentUser: FirebaseAuthTypes.User | null,
  loadingCurrentUser: boolean,
}

interface IAuthProvider {
  children: React.ReactNode,
}

// Variables.
const AuthContext = createContext<IAuthContext>({
  currentUser: null,
  loadingCurrentUser: true,
});

// Component.
export function AuthProvider({ children } : IAuthProvider) : JSX.Element {
  // Variables.
  const [currentUser, setCurrentUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [loadingCurrentUser, setLoadingCurrentUser] = useState(true);

  // Page effects.
  useEffect(() => {
    const unsubscribeFromAuthStateChanged = auth().onAuthStateChanged(
      (user) => {
        setLoadingCurrentUser(true);
        setCurrentUser(user);
        setLoadingCurrentUser(false);
      },
    );

    return function cleanUp() : void {
      unsubscribeFromAuthStateChanged();
    };
  }, []);

  // JSX returned.
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loadingCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Context use function.
export function useAuthContext() : IAuthContext {
  return useContext(AuthContext);
}
