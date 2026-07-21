import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <>
      {/* Header/Navbar later */}
      <Outlet />
    </>
  );
}

export default MainLayout;