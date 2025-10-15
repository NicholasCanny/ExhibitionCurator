import Link from "next/link";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/exhibitions">Browse Artworks</Link>
        </li>
        <li>
          <Link href="/SavedExhibitions">My Collection</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
