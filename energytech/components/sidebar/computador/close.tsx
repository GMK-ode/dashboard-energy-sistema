import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { ModeToggle } from "@/components/theme";
import Link from 'next/link'
import { ChartPie, Building, LogOut, Home } from 'lucide-react'
import Image from 'next/image'
import logo from '@/assets/logo3.png'
import { Button } from '@/components/ui/button'

interface SideBarComputadorCloseProps {

  handleCloseSidebar: () => void;
}

export const SideBarComputadorClose = ({handleCloseSidebar}: SideBarComputadorCloseProps) => {
  return(
    <aside className='fixed inset-0 left-0 z-1 hidden w-14 duration-700 delay-700 border-r bg-zinc-200 dark:bg-background sm:flex flex-col mt-16'>
        <nav className='flex flex-col items-center gap-4 px-2 py-5 '>
          <TooltipProvider>
            <Button
              onClick={() => handleCloseSidebar()}
              className='flex h-9 w-9 shrink-0 items-center justify-center m-0 p-0 bg-primary text-primary-foreground rounded-full cursor-pointer'>
              <Image src={logo} alt='logo' width={500} height={500} />
              <span className='sr-only'>DashBoard Avatar</span>
            </Button>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/"
                  className='flex h-9 w-9 shrink-0 items-center justify-center bg-primary text-orange-400 rounded-lg transition-colors hover:text-foreground'>
                  <Home className='h-5 w-5' />
                  <span className='sr-only'>Home</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side='left'>Home</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard/engineering"
                  className='flex h-9 w-9 shrink-0 items-center justify-center bg-primary text-orange-400 rounded-lg transition-colors hover:text-foreground'>
                  <ChartPie className='h-5 w-5' />
                  <span className='sr-only'>DashBoard Engenharia</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side='left'>Dashboard Engenharia</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard/comercial"
                  className='flex h-9 w-9 shrink-0 items-center justify-center bg-primary text-orange-400 rounded-lg transition-colors hover:text-foreground'>
                  <Building className='h-5 w-5' />
                  <span className='sr-only'>DashBoard Comercial</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side='left'>Dashboard Comercial</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>

        {/* tirando o botão de sair do sistema so para quando tiver */}
        {/* <nav className='mt-auto flex flex-col items-center gap-4 px-2 py-5'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className='flex h-9 w-9 shrink-0 items-center justify-center bg-primary text-muted-foreground rounded-lg transition-colors hover:text-foreground'>
                  <LogOut className='h-5 w-5 text-red-500' />
                  <span className='sr-only'>Sair do Sistema</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side='left'>Sair do Sistema</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav> */}
        <nav className='mt-auto flex flex-col items-center gap-4 px-2 py-5'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className='flex h-9 w-9 shrink-0 items-center justify-center bg-primary text-orange-400 rounded-lg transition-colors hover:text-foreground cursor-pointer'>
                  <ModeToggle />
                </div>
              </TooltipTrigger>
              <TooltipContent side='left'>Modo Light ou Dark </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>

      </aside>

  )
}