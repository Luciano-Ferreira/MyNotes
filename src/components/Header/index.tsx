/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Link from 'next/link';
import styles from './header.module.scss';

export default function Header() {
  return (
    <>
      <header className={styles.headerContainer}>
        <Link href="/">
          <a>
            <img src="/images/Logo.svg" alt="Space Traveling" />
          </a>
        </Link>
      </header>
    </>
  );
}
