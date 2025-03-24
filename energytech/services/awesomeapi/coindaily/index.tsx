
import { DailyCoinCotation } from "@/interfaces/awesomeapi/coinDaily";
import { apiCotacao } from "@/services/awesomeapi/apiCotacao";

export async function getCoinDaily(coin: string, day: number): Promise<DailyCoinCotation> {
  try {
    const response = await apiCotacao.get(`daily/${coin}/${day}`);
    return response.data;
  } catch (error: any) {
    alert("Erro ao buscar cotação");
    throw new Error(error);

  }
}