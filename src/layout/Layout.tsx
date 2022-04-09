import React from 'react';
import type { FC, ReactNode } from 'react';
import { Nav } from './Nav';
import Link from 'next/link';

interface Props {
  children: ReactNode;
}

export const Layout: FC<Props> = (props) => {
  return (
    <>
      <Nav>
        <Link href="/">
          <a className="p-4 w-full">Home</a>
        </Link>
        <Link href="/mlb">
          <a className="p-4 w-full">MLB</a>
        </Link>
        <Link href="/nhl">
          <a className="p-4 w-full">NHL</a>
        </Link>
        <Link href="/nfl">
          <a className="p-4 w-full">NFL</a>
        </Link>
      </Nav>
      {props.children}
    </>
  );
};
