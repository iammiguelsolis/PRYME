import Sidebar from "./globals/components/organismos/Sidebar";


function App() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-grow p-8 bg-neutral-03">
        {/* El resto de tu aplicación iría aquí */}
        <h1 className="text-2xl font-bold text-text-01">
          Contenido Principal
        </h1>
      </main>
    </div>
  );
}

export default App;