import { MsalConfig } from "@/interfaces/microsoft/appsettings"


// export function AuthServerSideMsal(){
//     const settingsMsal: MsalConfig = {
//         auth: {
//           clientId: 'ce48134a-b37f-47b3-bc19-93f01c186bd3' ,
//           authority: `https://login.microsoftonline.com/29acacb2-9e32-49f2-b508-69a378915eea`,
//           redirectUri: 'http://localhost:3000',
//         },
//         cache: {
//           cacheLocation: 'memory',
//           storeAuthStateInCookie: true,
//         },
//       }
//     return settingsMsal
// }




export function AuthServerSideMsal(){
    const settingsMsal: MsalConfig = {
        auth: {
          clientId: 'ce48134a-b37f-47b3-bc19-93f01c186bd3' ,
          authority: `https://login.microsoftonline.com/29acacb2-9e32-49f2-b508-69a378915eea`,
          redirectUri: 'https://dashboard-energy-sistema.vercel.app',
        },
        cache: {
          cacheLocation: 'memory',
          storeAuthStateInCookie: true,
        },
      }
    return settingsMsal
}