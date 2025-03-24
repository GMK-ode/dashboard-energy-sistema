'use client'

import {  useState } from 'react'
import { SideBarComputadorClose } from './close';
import { SideBarComputadorOpen } from './open';

export const SideBarComputador = () => {
  const [isOpen, setIsOpen] = useState(false);



  return isOpen ? (
    <SideBarComputadorOpen  handleOpenSidebar={() => setIsOpen(false)} />
  ) : (
    <SideBarComputadorClose handleCloseSidebar={() => setIsOpen(true)} />
  );
} 