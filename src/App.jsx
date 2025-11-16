import Sidebar from "./globals/components/organismos/Sidebar";
import InicioPage from "./modules/inicio/page/InicioPage";


function App() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-grow px-8 bg-neutral-03 h-screen overflow-hidden">
        <InicioPage />
      </main>
    </div>
  );
}

export default App;