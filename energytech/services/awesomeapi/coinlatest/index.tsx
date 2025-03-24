import { LastestCotation } from "@/interfaces/awesomeapi/coinlastest";
import { apiCotacao } from "../apiCotacao";



export async function getCoinLatest(coin: string): Promise<LastestCotation> {
  try {
    const response = await apiCotacao.get(`last/${coin}`);
    return response.data;
  } catch (error: any) {
    alert("Erro ao buscar cotação");
    throw new Error(error);

  }
}