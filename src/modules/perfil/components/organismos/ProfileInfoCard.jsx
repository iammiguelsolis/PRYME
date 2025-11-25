import { useState, useEffect } from "react";
import { ProfileAvatar } from "../atomos/ProfileAvatar";
import ProfileField from "../moleculas/ProfileField";
import { Button } from "../../../../globals/components/atomos/Button";
import { InventoryCardHeader } from "../moleculas/InventoryCardHeader";

const ProfileInfoCard = ({ user = {}, onProfileSaved, className = "" }) => {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    rol: "",
    email: "",
    telefono: "",
    sucursal: "",
  });

  // Inicializar con datos del usuario (si vienen de un contexto más adelante)
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      nombre: user.nombre || "",
      apellido: user.apellido || "",
      rol: user.rol || "",
      email: user.email || "",
      telefono: user.telefono || "",
      sucursal: user.sucursal || "",
    }));
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Guardar perfil:", form);
    if (onProfileSaved) onProfileSaved();
  };


  return (
    <div
      className={`
        bg-neutral-01 
        rounded-3xl 
        shadow-md 
        border border-neutral-02 
        p-6
        ${className}
      `}
    >
      <InventoryCardHeader title="Información personal" />

      {/* Header: avatar + nombre + rol */}
      <div className="flex items-center gap-4 mb-4">
        <ProfileAvatar name={`${form.nombre} ${form.apellido}`} />
        <div className="">
          <h2 className="text-base md:text-lg font-semibold text-text-01">
            {form.nombre || form.apellido
              ? `${form.nombre} ${form.apellido}`
              : "Nombre del usuario"}
          </h2>
          <p className="text-xs text-text-02 mt-1">
            {form.rol || "Rol del usuario"}
          </p>
          {form.sucursal && (
            <span className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-primary-01/10 text-[11px] font-medium text-primary-01">
              {form.sucursal}
            </span>
          )}
        </div>
      </div>

      {/* Formulario de datos personales */}
      <form onSubmit={handleSave} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ProfileField
            label="Nombre"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Nombre"
          />
          <ProfileField
            label="Apellido"
            name="apellido"
            value={form.apellido}
            onChange={handleChange}
            placeholder="Apellido"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ProfileField
            label="Correo electrónico"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="usuario@pryme.com"
          />
          <ProfileField
            label="Teléfono"
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            placeholder="987654321"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ProfileField
            label="Rol"
            name="rol"
            value={form.rol}
            onChange={handleChange}
            placeholder="Administrador, Vendedor, etc."
          />
          <ProfileField
            label="Sucursal"
            name="sucursal"
            value={form.sucursal}
            onChange={handleChange}
            placeholder="Lima Centro"
          />
        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit" size="medium" variant="primary">
            Guardar cambios
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileInfoCard;
