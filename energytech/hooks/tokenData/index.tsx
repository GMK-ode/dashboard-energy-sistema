
import { getCredencialTV } from "@/services/microsoft/excel/sheetData";
import { useEffect, useState } from "react";


const useTokenData = () => {
  const [tokenData, setTokenData] = useState<string>("");

  useEffect(() => {
    const fetchTokenData = async () => {
      const tokenData = await getCredencialTV();
      setTokenData(tokenData.token);
    };

    fetchTokenData();
    console.log("Token", tokenData)
  }, []);

  return { tokenData };
}

export default useTokenData;