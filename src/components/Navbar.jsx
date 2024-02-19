import { NavLink } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import StorageIcon from "@mui/icons-material/Storage";

const Navbar = () => {
  const isActiveStyle = ({ isActive }) => ({
    fontWeight: isActive ? "bold" : "",
    color: isActive ? "#00A9FF" : "",
  });

  return (
    <ul>
      <li>
        <NavLink to="/" style={isActiveStyle} className="nav-items">
          Income
        </NavLink>
      </li>
      <li>
        <NavLink to="/expense" style={isActiveStyle} className="nav-items">
          Expense
        </NavLink>
      </li>
      <li>
        <NavLink to="/saving" style={isActiveStyle} className="nav-items">
          Saving
        </NavLink>
      </li>
      <li>
        <NavLink to="/report" style={isActiveStyle} className="nav-items">
          Report
        </NavLink>
      </li>
      <li>
        <NavLink
          to="https://github.com/zeeshan-akhter/buzz-finance-management/"
          target="_blank"
          className="nav-items"
          style={{ color: "#00A9FF" }}
          title="GitHub"
        >
          <GitHubIcon />
        </NavLink>
      </li>
      <li>
        <NavLink
          to="https://replit.com/@zeeshanakhter/buzzfinancialmanagementapi"
          target="_blank"
          className="nav-items"
          style={{ color: "#00A9FF" }}
          title="Replit"
        >
          <StorageIcon />
        </NavLink>
      </li>
    </ul>
  );
};

export { Navbar };
