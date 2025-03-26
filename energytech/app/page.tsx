'use client';
import { useAuthentication } from "@/context/userAuthentication";
import { useEffect, useState } from "react";
import { AuthServerSideMsal } from "@/services/microsoft/auth";
import { patchTokenSheetsData, putCredencialTV } from "@/services/microsoft/excel/sheetData";
import { parseCookies, setCookie } from "nookies";
import useTokenData from "@/hooks/tokenData";
import { Card } from "@/components/ui/card";

export default function Authentication() {
  const { user, graphClient, initializeMsalAndGraphClient, fetchUser } = useAuthentication();
  const [time, setTime] = useState(0);
  const [isTrue, setIsTrue] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const { tokenData } = useTokenData();


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
    const settings = AuthServerSideMsal()
    initializeMsalAndGraphClient(settings);
    handleTimeToRefresh();
    return () => {
      if (timeoutId) {
        clearTimeout(time);
      }
    };

  }, [isTrue]);


  const handlePatchToken = async () => {
    const {
      accessToken: token,
    } = parseCookies();
    try {
      if (graphClient) {
        // await patchTokenSheetsData(token)
        await putCredencialTV(token);
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
    <main className="sm:ml-14 p-4">
      <h1>Seja Bem-vindo</h1>
      {tokenData || user ? (
        <div>
          <p>Name: {user?.displayName}</p>
          <p>Email: {user?.mail}</p>
          <Card title="Token" className="flex-wrap h-fit w-[150px]" >
          <p className="text-wrap">Token: {tokenData}</p>
          </Card>


        </div>
      ) : (
        <p>Loading user data...</p>)}
    </main>
  );
}

