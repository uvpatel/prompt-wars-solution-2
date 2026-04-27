import { NavLink } from "react-router-dom";

const links = [
  { path: "/", label: "Dashboard" },
  { path: "/timeline", label: "Election Timeline" },
  { path: "/learning", label: "Learning Modules" },
  { path: "/quiz", label: "Quiz" }
];

export default function Sidebar() {
  return (
    <nav className="sidebar" aria-label="Main Navigation">
      <h1 className="brand">ElectionGuide AI</h1>
      <p className="brand-subtitle">Learn elections with confidence</p>
      <ul className="nav-list">
        {links.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
