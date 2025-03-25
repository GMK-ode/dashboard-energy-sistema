  export interface User {
    displayName: string;
    mail: string;
    userPrincipalName: string;
  }

  export interface MsalConfig  {
    auth: {
      clientId: string, 
      authority: string, 
      redirectUri: string, 
    },
    cache: {
      cacheLocation: string,
      storeAuthStateInCookie: boolean,
    },
  };

  export const scopesUser = {
    scopes: ['Files.Read ', 
      'Files.Read.All', 
      'Files.ReadWrite', 
      'Files.ReadWrite.All', 
      'openid profile', 
      'Sites.Read.All', 
      'Sites.ReadWrite.All ',
      'User.Read email']
  };// Escopos necessários

  export const dashboardEngenharia = '0132CK6B56FVUHPDARGVFK2VQAK2RZZZDB';

  export const dashboardCormecial = '0132CK6BZ2F6ZZCD7BHBEKF7NI7U6QMP3Z';


  export const Sheetcredencial = '0132CK6B5OBPQZE5R64ZCLAS2DMDQBT6UO';
