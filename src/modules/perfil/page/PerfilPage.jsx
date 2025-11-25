import { useState, useEffect } from "react";
import { SuccessModal } from "../components/organismos/SuccessModal";
import {
  User,
  Mail,
  Phone,
  Building2,
  Shield,
  Lock,
  Key,
  Save,
  Edit2,
  UserCircle2,
  Briefcase,
} from "lucide-react";

// =========================
//  Mock Components
// =========================
const ProfileAvatar = ({ name }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#1B8EF2] to-[#0554F2] flex items-center justify-center text-white text-2xl font-bold shadow-lg">
      {initials || "U"}
    </div>
  );
};

const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "medium",
  onClick,
}) => {
  const baseStyles =
    "font-medium rounded-xl transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md";

  const variants = {
    primary: "bg-[#1B8EF2] hover:bg-[#1675F2] text-white",
    secondary: "bg-[#0554F2] hover:bg-[#22A2F2] text-white",
  };

  const sizes = {
    medium: "px-6 py-2.5 text-sm",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]}`}
    >
      {children}
    </button>
  );
};

const ProfileField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  icon: Icon,
}) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-[#334155] flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-[#1B8EF2]" />}
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-xl border border-[#E4E7EE] bg-white text-[#0F172A] placeholder:text-[#BEC2C9] focus:outline-none focus:ring-2 focus:ring-[#1B8EF2] focus:border-transparent transition-all"
      />
    </div>
  );
};

// =========================
//  Profile Info Card
// =========================
const ProfileInfoCard = ({ user = {}, onProfileSaved }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    rol: "",
    email: "",
    telefono: "",
    sucursal: "",
  });

  useEffect(() => {
    setForm({
      nombre: user.nombre || "",
      apellido: user.apellido || "",
      rol: user.rol || "",
      email: user.email || "",
      telefono: user.telefono || "",
      sucursal: user.sucursal || "",
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Guardar perfil:", form);
    setIsEditing(false);

    // 👇 Aquí disparamos el modal del padre
    if (onProfileSaved) {
      onProfileSaved();
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-[#E4E7EE] overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#1B8EF2] to-[#0554F2] p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>

        <div className="relative flex items-start justify-between">
          <div className="flex items-center gap-6">
            <ProfileAvatar name={`${form.nombre} ${form.apellido}`} />
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">
                {form.nombre || form.apellido
                  ? `${form.nombre} ${form.apellido}`
                  : "Nombre del usuario"}
              </h2>
              <div className="flex items-center gap-2 text-white/90 mb-3">
                <Briefcase className="w-4 h-4" />
                <span className="text-sm">{form.rol || "Rol del usuario"}</span>
              </div>
              {form.sucursal && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-xs font-medium text-white">
                  <Building2 className="w-3.5 h-3.5" />
                  {form.sucursal}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-xl transition-all flex items-center gap-2"
          >
            <Edit2 className="w-4 h-4" />
            {isEditing ? "Cancelar" : "Editar"}
          </button>
        </div>
      </div>

      {/* Form Section */}
      <div className="p-8">
        <h3 className="text-lg font-semibold text-[#0F172A] mb-6 flex items-center gap-2">
          <UserCircle2 className="w-5 h-5 text-[#1B8EF2]" />
          Información Personal
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProfileField
            label="Nombre"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Nombre"
            icon={User}
          />
          <ProfileField
            label="Apellido"
            name="apellido"
            value={form.apellido}
            onChange={handleChange}
            placeholder="Apellido"
            icon={User}
          />
          <ProfileField
            label="Correo electrónico"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="usuario@pryme.com"
            icon={Mail}
          />
          <ProfileField
            label="Teléfono"
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            placeholder="987654321"
            icon={Phone}
          />
          <ProfileField
            label="Rol"
            name="rol"
            value={form.rol}
            onChange={handleChange}
            placeholder="Administrador, Vendedor, etc."
            icon={Briefcase}
          />
          <ProfileField
            label="Sucursal"
            name="sucursal"
            value={form.sucursal}
            onChange={handleChange}
            placeholder="Lima Centro"
            icon={Building2}
          />
        </div>

        {isEditing && (
          <div className="flex justify-end pt-6 mt-6 border-t border-[#E4E7EE]">
            <Button onClick={handleSave} variant="primary">
              <Save className="w-4 h-4" />
              Guardar cambios
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

// =========================
//  Profile Security Card
// =========================
const ProfileSecurityCard = ({ user = {}, onSecurityUpdated }) => {
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
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("Actualizar seguridad:", form);

    if (onSecurityUpdated) {
      onSecurityUpdated();
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-[#E4E7EE] p-8 h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1B8EF2] to-[#0554F2] flex items-center justify-center">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[#0F172A]">
            Seguridad y cuenta
          </h3>
          <p className="text-xs text-[#334155]">Actualiza tus credenciales</p>
        </div>
      </div>

      <div className="space-y-5">
        <ProfileField
          label="Correo de acceso"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="usuario@pryme.com"
          icon={Mail}
        />

        <div className="pt-4 border-t border-[#E4E7EE]">
          <div className="flex items-center gap-2 mb-5">
            <Lock className="w-4 h-4 text-[#1B8EF2]" />
            <span className="text-sm font-medium text-[#334155]">
              Cambiar contraseña
            </span>
          </div>

          <div className="space-y-4">
            <ProfileField
              label="Contraseña actual"
              name="currentPassword"
              type="password"
              value={form.currentPassword}
              onChange={handleChange}
              placeholder="••••••••"
              icon={Key}
            />

            <ProfileField
              label="Nueva contraseña"
              name="newPassword"
              type="password"
              value={form.newPassword}
              onChange={handleChange}
              placeholder="••••••••"
              icon={Lock}
            />

            <ProfileField
              label="Confirmar nueva contraseña"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              icon={Lock}
            />
          </div>
        </div>

        <div className="pt-6">
          <Button onClick={handleUpdate} variant="secondary">
            <Shield className="w-4 h-4" />
            Actualizar contraseña
          </Button>
        </div>
      </div>
    </div>
  );
};

// =========================
//  Main Page Component
// =========================
const PerfilPage = () => {
  const mockUser = {
    nombre: "Nombre",
    apellido: "Apellido",
    rol: "Administrador",
    email: "usuario@pryme.com",
    telefono: "987654321",
    sucursal: "Lima Centro",
  };

  const [isSuccessProductOpen, setIsSuccessProductOpen] = useState(false);

  const handleOpenSuccessModal = () => {
    setIsSuccessProductOpen(true);
  };

  const handleSuccessProductClose = () => {
    setIsSuccessProductOpen(false);
  };

  return (
    <main className="min-h-screen bg-[#E4E7EE] p-6">
      <div className="mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-md px-6 py-4">
          <h1 className="text-2xl font-bold text-[#0F172A]">Perfil</h1>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ProfileInfoCard
              user={mockUser}
              onProfileSaved={handleOpenSuccessModal}
            />
          </div>

          <div className="lg:col-span-1">
            <ProfileSecurityCard
              user={mockUser}
              onSecurityUpdated={handleOpenSuccessModal}
            />
          </div>
        </div>
      </div>

      <SuccessModal
        title="Cambios Guardados con Éxito"
        isOpen={isSuccessProductOpen}
        onClose={handleSuccessProductClose}
        onRegisterAnother={handleSuccessProductClose}
      />
    </main>
  );
};

export default PerfilPage;
