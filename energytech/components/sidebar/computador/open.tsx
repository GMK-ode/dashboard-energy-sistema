import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import Link from 'next/link'
import { ChartPie, Building, LogOut, Home } from 'lucide-react'
import Image from 'next/image'
import logo from '@/assets/logo3.png'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/theme'

interface SideBarComputadorOpenProps {
  handleOpenSidebar: () => void;
}

export const SideBarComputadorOpen = ({ handleOpenSidebar }: SideBarComputadorOpenProps) => {
  return (
    <aside className='fixed inset-0 left-0 z-1 hidden duration-700 delay-700  border-r bg-zinc-200 dark:bg-background sm:flex flex-col mt-16 transform w-70'>
      <nav className='flex flex-col items-start gap-4 px-2 py-5 '>
        <TooltipProvider>
          <div className='flex flex-col items-center gap-4 cursor-pointer w-full justify-center' onClick={() => handleOpenSidebar()}>
            {/* <h2 className='text-lg font-bold text-foreground-accent text-center w-full'>EnergyTech</h2> */}
            <Button
              className='flex h-15 w-15 shrink-0 items-center justify-center m-0 p-0 bg-primary text-primary-foreground rounded-full cursor-pointer duration-700 delay-700'>
              <Image src={logo} alt='logo' width={500} height={500} />
              <span className='sr-only'>DashBoard Avatar</span>
            </Button>
          </div>
          <Tooltip>
            <Link href="/" className='flex items-center gap-4 cursor-pointer'>
              <div className='flex h-9 w-9 shrink-0 items-center justify-center bg-primary text-orange-400 rounded-lg transition-colors hover:text-foreground'>
                <Home className='h-5 w-5' />
                <span className='sr-only'>Home</span>
              </div>
              <span className='text-lg font-bold text-foreground-accent'>Home</span>
            </Link>

            <TooltipContent side='left'>Home</TooltipContent>
          </Tooltip>

          <Tooltip>
            <Link href="/dashboard/engineering" className='flex items-center gap-4 cursor-pointer'>
              <div className='flex h-9 w-9 shrink-0 items-center justify-center bg-primary text-orange-400 rounded-lg transition-colors hover:text-foreground'>
                <ChartPie className='h-5 w-5' />
                <span className='sr-only'>DashBoard Engenharia</span>
              </div>
              <span className='text-lg font-bold text-foreground-accent'>DashBoard Engenharia</span>
            </Link>

            <TooltipContent side='left'>Dashboard Engenharia</TooltipContent>
          </Tooltip>

          <Tooltip>

            <Link href="/dashboard/comercial" className='flex items-center gap-4 cursor-pointer'>
              <div className='flex h-9 w-9 shrink-0 items-center justify-center bg-primary text-orange-400 rounded-lg transition-colors hover:text-foreground'>
                <Building className='h-5 w-5' />
                <span className='sr-only'>DashBoard Comercial</span>
              </div>
              <span className='text-lg font-bold text-foreground-accent'>DashBoard Comercial</span>
            </Link>
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
            <div className='flex items-center gap-4 cursor-pointer'>
              <div className='flex h-9 w-9 shrink-0 items-center justify-center bg-primary text-orange-400 rounded-lg transition-colors hover:text-foreground cursor-pointer'>
                <ModeToggle />
              </div>
            </div>
            <TooltipContent side='left'>Tema</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>

    </aside>

  )
}