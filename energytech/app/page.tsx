'use client';
import { useAuthentication } from "@/context/userAuthentication";
import { useEffect, useState } from "react";
import { AuthServerSideMsal } from "@/services/microsoft/auth";

export default function Authentication() {
  const { user, graphClient, initializeMsalAndGraphClient, fetchUser } = useAuthentication();
  const [time, setTime] = useState(0);
  const [isTrue, setIsTrue] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  
  const handleTimeToRefresh = () => {
    const timeToRefraesh = 24*60*60*1000;
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

  useEffect(() => {
    fetchUser();
  }, [graphClient, isTrue]);

  return (
    <main className="sm:ml-14 p-4">
      <h1>Seja Bem-vindo</h1>
      {user ? (
        <div>
          <p>Name: {user.displayName}</p>
          <p>Email: {user.mail}</p>

          
        </div>
      ) : (
        <p>Loading user data...</p>)}
    </main>
  );
}

