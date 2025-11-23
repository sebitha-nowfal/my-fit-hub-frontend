import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <Link to="/" style={styles.link}>LOGO</Link>
      </div>

      <div style={styles.navLinks}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/workouts" style={styles.link}>Workouts</Link>
        <Link to="/nutrition" style={styles.link}>Nutrition</Link>
        <Link to="/yoga" style={styles.link}>Yoga</Link>
        <Link to="/trainers" style={styles.link}>Trainer</Link>
        <Link to="/about" style={styles.link}>About</Link>
      </div>

      <div style={styles.login}>
        <Link to="/login" style={styles.link}>LOGIN</Link>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#333",
    color: "#fff"
  },
  logo: {
    fontWeight: "bold",
    fontSize: "20px"
  },
  navLinks: {
    display: "flex",
    gap: "15px"
  },
  login: {},
  link: {
    color: "#fff",
    textDecoration: "none"
  }
};

export default Navbar;
