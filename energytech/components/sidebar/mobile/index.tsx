import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetDescription, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Package, ChartPie, Building } from 'lucide-react'
import logo from '@/assets/logo3.png'
import Image from 'next/image'


export const SideBarMobile = () => {

  return (
    <div className="flex w-full flex-col ">
      <div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14  '>
        <header className='stick top-0 z-30 flex h-16 items-center px-2   sm:static sm:h-auto sm:border-0  sm:px-4 md:z-0'>
          <Sheet >
            <SheetTrigger asChild >
              <Button variant='outline' className='sm:hidden h-[45px] w-[45px] p-0 m-0 rounded-full'>
                <Image src={logo} alt='logo' width={500} height={500} />
                <span className='sr-only'>Abrir/fecharmenu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className='sm:max-w-x'>
              <SheetHeader hidden={true}>
                <SheetTitle>EnergyTech sidebar</SheetTitle>
                <SheetDescription>
                  sidebar
                </SheetDescription>
              </SheetHeader>
              <nav className='grid gap-6 text-lg font-medium'>
                <div className='flex items-center gap-2 w-full justify-center'>
                  <Link
                    href="/"
                    className='flex h-10 w-10 bg-primary rounded-full text-lg items-center justify-center text-primary-foreground md:text-base gap-2'
                    prefetch={false}>
                    <Image src={logo} alt='logo' width={500} height={500} className='rotate-3' />
                    <span className='sr-only'>logo</span>
                  </Link>
                  <span className='text-2xl text-muted-foreground'>EnergyTech</span>
                </div>
                <Link
                  href="/dashboard/engineering"
                  className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
                  prefetch={false}>
                  <ChartPie className='h-5 w-5 text-orange-400' />
                  <span>Dashboard Engenharia</span>
                </Link>
                <Link href="/dashboard/comercial" className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground' prefetch={false}>
                  <Building className='h-5 w-5 text-orange-400' />
                  <span>Dashboard Comercial</span>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          {/* <h2 className='visible sm:invisible '>Menu</h2> */}
        </header>
      </div>
    </div>
  )
}