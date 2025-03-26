'use client';
import { useAuthentication } from "@/context/userAuthentication";
import { useEffect, useState } from "react";
import { AuthServerSideMsal } from "@/services/microsoft/auth";
import { patchTokenSheetsData, putCredencialTV } from "@/services/microsoft/excel/sheetData";
import { parseCookies, setCookie } from "nookies";
import useTokenData from "@/hooks/tokenData";
import { CardContent, CardHeader, Card, CardDescription, CardTitle } from "@/components/ui/card";


export default function Authentication() {
  const { user, graphClient, initializeMsalAndGraphClient, fetchUser } = useAuthentication();
  const [time, setTime] = useState(0);
  const [isTrue, setIsTrue] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const { tokenData, dataExpiracao } = useTokenData();


  const handleTimeToRefresh = () => {
    const timeToRefraesh = 24 * 60 * 60 * 1000;
    setTime(timeToRefraesh)
    const id = setTimeout(() => {
      setIsTrue((prev) => !prev);
    }, timeToRefraesh);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setTimeoutId(id)

  };


  useEffect(() => {
    const initialize = async () => {
      if (!graphClient) { // Ensure no interaction is in progress
        const settings = AuthServerSideMsal();
        await initializeMsalAndGraphClient(settings);
        handleTimeToRefresh();
      }
    };
    initialize();
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []); 


  const handlePatchToken = async () => {
    const {
      accessToken: token,
    } = parseCookies();
    try {
      if (graphClient) {
        // await patchTokenSheetsData(token)
        const formattedDate = new Date().toLocaleString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: undefined,
        });
        await putCredencialTV(token, formattedDate);
      }
    } catch (error) {
      console.log(error)
    }
  }




  setCookie(null, 'TokenTv', tokenData, {
    maxAge: 60 * 60 * 24, // 1 dia,
    path: '/',
    sameSite: 'lax',
  })


  useEffect(() => {
    fetchUser();
  }, [graphClient, isTrue]);

  useEffect(() => {
    handlePatchToken();
  }
    , [user])


  return (
    <main className="sm:ml-14 p-4 ">
      <section className=" flex  items-center justify-center gap-2 scroll-smooth overflow-hidden-y">
        {tokenData || user ? (

          <Card className="flex-col gap-2 items-center justify-center min-w-[290px] max-w-[1200px] p-2 border-8 dark:border-1 text-center shadow-2xl  cursor-pointer overflow-y-scroll sm:overflow-auto" >
            <CardHeader className="flex-col items-center w-full">
              <CardTitle className="text-4xl text-orange-500">Seja Bem-vindo</CardTitle>
              <CardDescription className="font-bold text-2xl text-orange-400">Informações do Token</CardDescription>
            </CardHeader>
            <CardContent className="flex-col justify-self-center text-wrap h-fit w-full  p-8 gap-7">
              <h2 className="text-3xl text-green-500 font-extrabold">Inicio: {dataExpiracao}</h2><br />
              <h3 className="text-2xl text-red-500 font-extrabold">Expiração: {dataExpiracao ?
                new Date(
                  new Date(dataExpiracao.replace(/(\d{2})\/(\d{2})\/(\d{4}), (\d{2}):(\d{2})/, '$3-$2-$1T$4:$5:00'))
                    .getTime() + 24 * 60 * 60 * 1000
                ).toLocaleString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: undefined,
                }) : "Data inválida"}
              </h3><br />
              {tokenData ? tokenData.toString().split('').map((char, index) => (
                <span key={index}>
                  {char}
                  {index % 65 === 54 && <br />}
                </span>
              )) : "Not available"}
            </CardContent>
          </Card>



        ) : (
          <p>Loading user data...</p>)}</section>
    </main>
  );
}

