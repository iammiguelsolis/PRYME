import { useState, useEffect } from "react";
import ProfileField from "../moleculas/ProfileField";
import { Button } from "../../../../globals/components/atomos/Button";
import { InventoryCardHeader } from "../moleculas/InventoryCardHeader";

const ProfileSecurityCard = ({ user = {}, className = "" }) => {
  const [form, setForm] = useState({
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      email: user.email || "",
    }));
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    // Aquí luego puedes validar y llamar a tu API
    console.log("Actualizar seguridad:", form);
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
      <InventoryCardHeader title="Seguridad y cuenta" />

      <p className="text-text-01 mb-4">
        Actualiza tus credenciales y datos de acceso.
      </p>

      <form onSubmit={handleUpdate} className="space-y-4">
        <ProfileField
          label="Correo de acceso"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="usuario@pryme.com"
        />

        <ProfileField
          label="Contraseña actual"
          name="currentPassword"
          type="password"
          value={form.currentPassword}
          onChange={handleChange}
          placeholder="••••••••"
        />

        <ProfileField
          label="Nueva contraseña"
          name="newPassword"
          type="password"
          value={form.newPassword}
          onChange={handleChange}
          placeholder="••••••••"
        />

        <ProfileField
          label="Confirmar nueva contraseña"
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="••••••••"
        />

        <div className="flex justify-end pt-2">
          <Button type="submit" size="medium" variant="secondaryUNO">
            Actualizar contraseña
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSecurityCard;
