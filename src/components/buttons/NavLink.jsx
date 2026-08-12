"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ href, children }) => {
  const path = usePathname();

  const isActive =
    href === "/" ? path === "/" : path.startsWith(href);

  return (
    <Link
      href={href}
      className={`${isActive ? "text-primary" : ""} font-medium`}
    >
      {children}
    </Link>
  );
};

export default NavLink;