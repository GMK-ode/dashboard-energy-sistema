
import Image from 'next/image'
import { SideBarComputador } from '../sidebar/computador'
import { SideBarMobile } from '../sidebar/mobile'
import logo from '@/assets/logo4.png'


export const NavBar = () => {

  return (
    <header className="sticky z-50 top-0 flex h-16 items-center px-4 border-b bg-muted/40  p-2">
      <nav>
      <Image src={logo} alt='logo' width={200} height={200} />
      </nav>
      <nav >
        <SideBarMobile/>
        <SideBarComputador/>
      </nav>
    </header>
)
}