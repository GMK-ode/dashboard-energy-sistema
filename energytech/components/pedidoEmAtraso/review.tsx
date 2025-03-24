import { cn } from "@/lib/utils";


  export const ReviewCard = ({pv}:{pv:string}) => {
  return(
    <figure
    className={cn(
      "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
      // light styles
      "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
      // dark styles
      "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
    )}
  >
    <div className="flex flex-row items-center gap-2">
      <div className="flex flex-col">
        <figcaption className="text-md text-orange-500 font-bold">
          PV: {pv}
        </figcaption>
      </div>
    </div>
  </figure>
  )
}