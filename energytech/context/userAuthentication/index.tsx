'use client'
import { createContext, useContext, useState } from "react";
import { MsalConfig, scopesUser, User } from '@/interfaces/microsoft/appsettings';
import { PublicClientApplication } from '@azure/msal-browser';
import { Client } from '@microsoft/microsoft-graph-client';
import { setCookie } from 'nookies';





interface AuthenticationProviderProps {
  children?: React.ReactNode;
}

interface AuthenticationContextProps {
  user: User | null;
  graphClient: any;
  initializeMsalAndGraphClient: (config: MsalConfig) => void;
  fetchUser: () => void;
}


const AuthenticationContext = createContext<AuthenticationContextProps>({
  user: null,
  graphClient: null,
  initializeMsalAndGraphClient: () => { },
  fetchUser: () => { },


} as AuthenticationContextProps);


const AuthenticationProvider = ({ children }: AuthenticationProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [graphClient, setGraphClient] = useState<any>(null);

  async function initializeMsalAndGraphClient(config: MsalConfig) {
    const msalInstance = new PublicClientApplication(config);
    // Inicialize o MSAL
    await msalInstance.initialize();

    // Autentique o usuário
    const authResult = await msalInstance.loginPopup(scopesUser);

    // Set the active account
    msalInstance.setActiveAccount(authResult.account);

    // Configure o provedor de autenticação para o Graph Client
    const authProvider = {
      getAccessToken: async () => {
        const account = msalInstance.getActiveAccount();
        if (!account) {
          throw new Error("No active account set.");
        }
        const response = await msalInstance.acquireTokenSilent({
          ...scopesUser,
          account,
        });
        setCookie(null, 'accessToken', response.accessToken, {
          maxAge: 60 * 60 * 24, // 1 dia
          path: '/',
          sameSite: 'lax',
        });
        return response.accessToken;
      },
    };

    // Inicialize o Graph Client
    const client = Client.initWithMiddleware({
      authProvider,
    });

    setGraphClient(client);
  };

  async function fetchUser() {
    if (graphClient) {
        const user = await graphClient.api('/me').select(['displayName', 'mail', 'userPrincipalName']).get();
        setUser(user);
        setCookie(null, 'user', JSON.stringify(user), {
          maxAge: 60 * 60 * 24, // 1 dia
          path: '/',
          sameSite: 'lax',
      });
    }
  }


    return (
      <AuthenticationContext.Provider value={{
        user,
        graphClient,
        initializeMsalAndGraphClient,
        fetchUser
      }}>
        {children}
      </AuthenticationContext.Provider>
    );
  }

  const useAuthentication = () => {
    const context = useContext(AuthenticationContext);
    if (!context) {
      throw new Error("useAuthentication must be used within an AuthenticationProvider");
    }
    return context;
  }

  export { AuthenticationProvider, AuthenticationContext, useAuthentication };


