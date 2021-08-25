/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import styles from './header.module.scss';

export default function Header() {
  return (
    <>
      <header className={styles.headerContainer}>
        <img src="/images/Logo.png" alt="Space Traveling" />
      </header>
    </>
  );
}
