import Sidebar from "@/components/layout/Sidebar";
// import "../globals.css";

function RootLayout({ children }) {
  return (
    <div className="sm:flex gap-4">
      {/* Sidebar will be fixed on screens larger than sm */}
      <div className="sm:fixed sm:top-[56px] sm:left-0 sm:h-[calc(100vh-56px)] sm:w-[200px] md:w-[220px] lg:w-[250px] xl:w-[270px]">
        <Sidebar />
      </div>

      {/* Content area with margin to account for the fixed sidebar */}
      <div className="w-full sm:ml-[200px] md:ml-[220px] lg:ml-[250px] xl:ml-[270px]">
        <div className="container mx-auto px-3 py-3">{children}</div>
      </div>
    </div>
  );
}

export default RootLayout;
