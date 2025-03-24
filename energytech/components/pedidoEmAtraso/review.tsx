import { cn } from "@/lib/utils";


  export const ReviewCard = ({pv}:{pv:string}) => {
  return(
    <figure
    className={cn(
      "relative p-2 w-48-max cursor-pointer overflow-hidden rounded-xl border ",
      // light styles
      "border-gray-950/[.1] bg-gray-850/[.09] hover:bg-gray-950/[.05] border-4",
      // dark styles
      "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
    )}
  >
    <div className="flex flex-row items-center gap-2">
      <div className="flex flex-col bg-slate-800 dark:bg-white p-2 rounded-lg ">
        <figcaption className="text-md text-orange-500 font-bold">
          PV: {pv}
        </figcaption>
      </div>
    </div>
  </figure>
  )
}