
import { Marquee } from "@/components/ui/marquee";
import { ReviewCard } from "./review";
import { CarrouselDataAtrasados } from "@/utils/engineering/carrouselDataAtrasados";
import { SheetEngBaseAnoFormPromiseInfo } from "@/interfaces/microsoft/excel/dadosSheets/engineering/baseAno";

interface PedidoEmAtrasoProps {
  data: SheetEngBaseAnoFormPromiseInfo[];
}

export const PedidoEmAtraso = ({ data }: PedidoEmAtrasoProps) => {

  const reviews = CarrouselDataAtrasados(data)
  const showMarquee = reviews.length > 3;
  const staticItems = reviews.length <= 3 ? reviews : reviews.slice(0, reviews.length / 2);
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">Pedidos em atraso: </h2>
      {reviews.length > 0 ? (
        showMarquee ? (
          <Marquee pauseOnHover={true} className="animate-move-infinite hover:pause w-full flex ">
            {staticItems.map((review, index) => (
              <ReviewCard key={index} {...review} />
            ))}
          </Marquee>
        ) : (
          <div className="flex gap-4 justify-center w-full">
            {reviews.map((review, index) => (
              <ReviewCard key={index} {...review} />
            ))}
          </div>
        )
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400">Nenhum pedido em atraso.</p>
      )}
      {showMarquee && (
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      )}
    </div>
  );
}
