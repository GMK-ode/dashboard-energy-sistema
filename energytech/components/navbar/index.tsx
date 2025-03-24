
import Image from 'next/image'
import { SideBarComputador } from '../sidebar/computador'
import { SideBarMobile } from '../sidebar/mobile'
import logo from '@/assets/logo4.png'


export const NavBar = () => {

  return (
    <header className="sticky z-50 top-0 flex sm:flex-row justify-between h-16 items-center px-4 border-b bg-muted/40  p-2">
      <nav className='flex items-center sm:w-full justify-left'>
      <Image src={logo} alt='logo' width={200} height={200} />
      </nav>
      <nav className='flex items-center sm:w-full justify-right'>
        <SideBarMobile/>
        <SideBarComputador/>
      </nav>
    </header>
)
}