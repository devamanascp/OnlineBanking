import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div style={layout}>
      <div style={sidebarWrapper}>
        <Sidebar />
      </div>

      <div style={main}>
        <Navbar />
        <div style={content}>{children}</div>
      </div>
    </div>
  );
}

const layout = {
  display: "flex",
  height: "100vh",
  background: "#f3f4f6"
};

const sidebarWrapper = {
  borderTopRightRadius: "30px",
  borderBottomRightRadius: "30px",
  overflow: "hidden",
  boxShadow: "8px 0 25px rgba(0,0,0,0.15)" // 👈 soft depth
};

const main = {
  flex: 1,
  background: "#f3f4f6",
  marginLeft: "10px" // 👈 spacing from curve
};

const content = {
  padding: "20px"
};