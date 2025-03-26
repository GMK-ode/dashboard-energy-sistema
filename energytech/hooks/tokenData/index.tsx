
import { getCredencialTV } from "@/services/microsoft/excel/sheetData";
import { useEffect, useState } from "react";


const useTokenData = () => {
  const [tokenData, setTokenData] = useState<string>("");
  const [dataExpiracao, setDataExpiracao] = useState<string>("");

  useEffect(() => {
    const fetchTokenData = async () => {
      const tokenData = await getCredencialTV();
      setTokenData(tokenData.token);
      setDataExpiracao(tokenData.savedData);
    };

    fetchTokenData();
    console.log("Token", tokenData)
  }, []);

  return { tokenData, dataExpiracao };
}

export default useTokenData;