import React, { useState } from 'react';
import type { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}
export const Nav: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const toggleNav = () => setOpen((open) => !open);
  return (
    <nav className="w-full relative flex">
      <div className="hidden md:flex">{props.children}</div>
      <button onClick={toggleNav} className="float-right rounded-md bg-sky-blue md:hidden">
        Click
      </button>
      {open && <div className="absolute top-full left-0 flex flex-wrap md:hidden h-full">{props.children}</div>}
    </nav>
  );
};
