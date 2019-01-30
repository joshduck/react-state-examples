import React from "react";
import Link from "next/link";

export default () => (
  <ul>
    <li>
      <Link href="/simple-state">Simple setState().</Link>
    </li>
    <li>
      <Link href="/simple-buggy-state">Pitfalls of setState().</Link>
    </li>
    <li>
      <Link href="/complex-interactions">Modelling complex state.</Link>
    </li>
    <li>
      <Link href="/complex-interactions-with-store">Using a store.</Link>
    </li>
    <li>
      <Link href="/complex-interactions-with-reducer">Using a reducer.</Link>
    </li>
    <li>
      <Link href="/complex-interactions-with-redux">Using redux</Link>
    </li>
    <li>
      <Link href="/complex-interactions-with-more-redux">
        Using fancy-pants redux
      </Link>
    </li>
  </ul>
);
