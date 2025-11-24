import ProfileInfoCard from "../components/organismos/ProfileInfoCard";
import ProfileSecurityCard from "../components/organismos/ProfileSecurityCard";

const PerfilPage = () => {
  // Más adelante puedes reemplazar esto con tu contexto de auth/usuario real
  const mockUser = {
    nombre: "Nombre",
    apellido: "Apellido",
    rol: "Administrador",
    email: "usuario@pryme.com",
    telefono: "987654321",
    sucursal: "Lima Centro",
  };

  return (
    <main className="grow p-6 bg-neutral-03">
      <h1 className="text-l font-bold text-text-01 bg-neutral-01 rounded-4xl shadow-md p-2 px-4 flex flex-col h-full mb-4">
        Perfil
      </h1>

      <div className="grid grid-cols-1 gap-4">
        {/* Columna grande: info personal */}
        <div className="lg:col-span-2">
          <ProfileInfoCard user={mockUser} />
        </div>

        {/* Columna derecha: seguridad/cuenta */}
        <div className="lg:col-span-1">
          <ProfileSecurityCard user={mockUser} />
        </div>
      </div>
    </main>
  );
};

export default PerfilPage;
