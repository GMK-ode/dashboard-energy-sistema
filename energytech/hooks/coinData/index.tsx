"use client";
import { LastestCotation } from '@/interfaces/awesomeapi/coinlastest';
import { getCoinLatest } from '@/services/awesomeapi/coinlatest';
import { useState, useEffect } from 'react';

const useCoinData = () => {
  const [coin, setCoin] = useState<LastestCotation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [updateCoin, setUpdateCoin] = useState<boolean>(false);

  const handleSelect = async () => {
    try {
      setLoading(true);
      const response = await getCoinLatest('USD-BRL,EUR-BRL,XAU-USD,XAG-USD');
      setCoin([response]);
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  // Atualização automática a cada 4 horas
  useEffect(() => {
    handleSelect(); // Chamada inicial
    const interval = setInterval(handleSelect, 4 * 60 * 60 * 6000);
    return () => clearInterval(interval);
  }, [updateCoin]);
  
    const handleUpdateCoin = () => {
      setUpdateCoin((prev) => !prev); // Alterna o estado para forçar a atualização
    };

  return { coin, loading, handleSelect, handleUpdateCoin };
};

export default useCoinData;