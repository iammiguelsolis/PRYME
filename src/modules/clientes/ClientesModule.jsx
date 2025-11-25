import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Mail, Phone, MapPin, Calendar, User, X, Save } from 'lucide-react';

const ClientesModule = () => {
  const [clientes, setClientes] = useState([
    {
      id: 1,
      nombre: 'Juan Pérez García',
      documento: '12345678',
      email: 'juan.perez@email.com',
      telefono: '+51 987 654 321',
      direccion: 'Av. Larco 1234, Miraflores',
      distrito: 'Miraflores',
      fechaRegistro: '2024-01-15',
      totalCompras: 15,
      montoTotal: 12450.00,
      estado: 'activo'
    },
    {
      id: 2,
      nombre: 'María López Sánchez',
      documento: '87654321',
      email: 'maria.lopez@email.com',
      telefono: '+51 912 345 678',
      direccion: 'Jr. Las Flores 567, San Isidro',
      distrito: 'San Isidro',
      fechaRegistro: '2024-02-20',
      totalCompras: 8,
      montoTotal: 6780.00,
      estado: 'activo'
    },
    {
      id: 3,
      nombre: 'Carlos Rodríguez Vega',
      documento: '45678912',
      email: 'carlos.rodriguez@email.com',
      telefono: '+51 998 765 432',
      direccion: 'Av. Javier Prado 890, San Borja',
      distrito: 'San Borja',
      fechaRegistro: '2024-03-10',
      totalCompras: 22,
      montoTotal: 18900.00,
      estado: 'activo'
    },
    {
      id: 4,
      nombre: 'Ana Torres Medina',
      documento: '78912345',
      email: 'ana.torres@email.com',
      telefono: '+51 945 678 901',
      direccion: 'Calle Los Olivos 234, Surco',
      distrito: 'Surco',
      fechaRegistro: '2023-11-05',
      totalCompras: 35,
      montoTotal: 28650.00,
      estado: 'activo'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [clienteToDelete, setClienteToDelete] = useState(null);

  const [formData, setFormData] = useState({
    nombre: '',
    documento: '',
    email: '',
    telefono: '',
    direccion: '',
    distrito: ''
  });

  const filteredClientes = clientes.filter(cliente =>
    cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.documento.includes(searchTerm) ||
    cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.telefono.includes(searchTerm)
  );

  const handleOpenModal = (mode, cliente = null) => {
    setModalMode(mode);
    setSelectedCliente(cliente);
    if (mode === 'edit' && cliente) {
      setFormData({
        nombre: cliente.nombre,
        documento: cliente.documento,
        email: cliente.email,
        telefono: cliente.telefono,
        direccion: cliente.direccion,
        distrito: cliente.distrito
      });
    } else {
      setFormData({
        nombre: '',
        documento: '',
        email: '',
        telefono: '',
        direccion: '',
        distrito: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCliente(null);
    setFormData({
      nombre: '',
      documento: '',
      email: '',
      telefono: '',
      direccion: '',
      distrito: ''
    });
  };

  const handleSubmit = () => {
    if (!formData.nombre || !formData.documento || !formData.email || !formData.telefono || !formData.direccion || !formData.distrito) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }
    
    if (modalMode === 'create') {
      const newCliente = {
        id: clientes.length + 1,
        ...formData,
        fechaRegistro: new Date().toISOString().split('T')[0],
        totalCompras: 0,
        montoTotal: 0,
        estado: 'activo'
      };
      setClientes([...clientes, newCliente]);
    } else if (modalMode === 'edit') {
      setClientes(clientes.map(c =>
        c.id === selectedCliente.id
          ? { ...c, ...formData }
          : c
      ));
    }
    
    handleCloseModal();
  };

  const handleDeleteClick = (cliente) => {
    setClienteToDelete(cliente);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    setClientes(clientes.filter(c => c.id !== clienteToDelete.id));
    setShowDeleteConfirm(false);
    setClienteToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
    setClienteToDelete(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="mx-auto">

        <div className="bg-neutral-01 rounded-3xl shadow-md px-6 py-4 mb-4">
          <h1 className="text-2xl font-bold text-text-01">Gestión de Clientes</h1>
          <p className="text-text-02 mt-1">
            Administra la información de tus clientes
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#BEC2C9' }} />
              <input
                type="text"
                placeholder="Buscar por nombre, documento, email o teléfono..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 transition-all"
                style={{
                  borderColor: '#E4E7EE',
                  backgroundColor: '#FFFFFF'
                }}
              />
            </div>
            <button
              onClick={() => handleOpenModal('create')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold transition-all hover:shadow-lg transform hover:-translate-y-0.5"
              style={{ backgroundColor: '#1B8EF2' }}
            >
              <Plus className="w-5 h-5" />
              Nuevo Cliente
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="p-4 rounded-xl" style={{ backgroundColor: '#E4E7EE' }}>
              <p className="text-sm font-medium" style={{ color: '#334155' }}>Total Clientes</p>
              <p className="text-2xl font-bold mt-1" style={{ color: '#1B8EF2' }}>
                {clientes.length}
              </p>
            </div>
            <div className="p-4 rounded-xl" style={{ backgroundColor: '#E4E7EE' }}>
              <p className="text-sm font-medium" style={{ color: '#334155' }}>Clientes Activos</p>
              <p className="text-2xl font-bold mt-1" style={{ color: '#2FAE90' }}>
                {clientes.filter(c => c.estado === 'activo').length}
              </p>
            </div>
            <div className="p-4 rounded-xl" style={{ backgroundColor: '#E4E7EE' }}>
              <p className="text-sm font-medium" style={{ color: '#334155' }}>Ventas Totales</p>
              <p className="text-2xl font-bold mt-1 text-blue-500">
                S/. {clientes.reduce((sum, c) => sum + c.montoTotal, 0).toLocaleString('es-PE', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredClientes.map((cliente) => (
            <div
              key={cliente.id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#1B8EF2' }}>
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg" style={{ color: '#0F172A' }}>
                      {cliente.nombre}
                    </h3>
                    <p className="text-sm" style={{ color: '#334155' }}>
                      DNI: {cliente.documento}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenModal('edit', cliente)}
                    className="p-2 rounded-lg transition-colors hover:bg-blue-50"
                    style={{ color: '#1B8EF2' }}
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(cliente)}
                    className="p-2 rounded-lg transition-colors hover:bg-red-50"
                    style={{ color: '#D06D49' }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" style={{ color: '#BEC2C9' }} />
                  <span className="text-sm" style={{ color: '#334155' }}>
                    {cliente.email}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" style={{ color: '#BEC2C9' }} />
                  <span className="text-sm" style={{ color: '#334155' }}>
                    {cliente.telefono}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" style={{ color: '#BEC2C9' }} />
                  <span className="text-sm" style={{ color: '#334155' }}>
                    {cliente.direccion}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" style={{ color: '#BEC2C9' }} />
                  <span className="text-sm" style={{ color: '#334155' }}>
                    Cliente desde: {new Date(cliente.fechaRegistro).toLocaleDateString('es-PE')}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t flex justify-between" style={{ borderColor: '#E4E7EE' }}>
                <div>
                  <p className="text-xs" style={{ color: '#334155' }}>Total Compras</p>
                  <p className="font-bold" style={{ color: '#1B8EF2' }}>
                    {cliente.totalCompras}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs" style={{ color: '#334155' }}>Monto Total</p>
                  <p className="font-bold text-blue-500">
                    S/. {cliente.montoTotal.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredClientes.length === 0 && (
          <div className="text-center py-12">
            <User className="w-16 h-16 mx-auto mb-4" style={{ color: '#BEC2C9' }} />
            <p className="text-lg font-medium" style={{ color: '#334155' }}>
              No se encontraron clientes
            </p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center" style={{ borderColor: '#E4E7EE' }}>
              <div>
                <h2 className="text-2xl font-bold" style={{ color: '#0F172A' }}>
                  {modalMode === 'create' ? 'Nuevo Cliente' : 'Editar Cliente'}
                </h2>
                <p className="text-sm mt-1" style={{ color: '#334155' }}>
                  {modalMode === 'create' ? 'Completa los datos del nuevo cliente' : 'Actualiza la información del cliente'}
                </p>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-6 h-6" style={{ color: '#334155' }} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#0F172A' }}>
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 transition-all"
                  style={{ borderColor: '#E4E7EE' }}
                  placeholder="Ej: Juan Pérez García"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#0F172A' }}>
                    Documento (DNI) *
                  </label>
                  <input
                    type="text"
                    value={formData.documento}
                    onChange={(e) => setFormData({ ...formData, documento: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 transition-all"
                    style={{ borderColor: '#E4E7EE' }}
                    placeholder="12345678"
                    maxLength={8}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#0F172A' }}>
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 transition-all"
                    style={{ borderColor: '#E4E7EE' }}
                    placeholder="+51 987 654 321"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#0F172A' }}>
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 transition-all"
                  style={{ borderColor: '#E4E7EE' }}
                  placeholder="cliente@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#0F172A' }}>
                  Dirección *
                </label>
                <input
                  type="text"
                  value={formData.direccion}
                  onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 transition-all"
                  style={{ borderColor: '#E4E7EE' }}
                  placeholder="Av. Larco 1234"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#0F172A' }}>
                  Distrito *
                </label>
                <input
                  type="text"
                  value={formData.distrito}
                  onChange={(e) => setFormData({ ...formData, distrito: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 transition-all"
                  style={{ borderColor: '#E4E7EE' }}
                  placeholder="Miraflores"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleCloseModal}
                  className="flex-1 px-6 py-3 rounded-xl font-semibold transition-all border-2"
                  style={{
                    borderColor: '#E4E7EE',
                    color: '#334155'
                  }}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 px-6 py-3 rounded-xl text-white font-semibold transition-all hover:shadow-lg flex items-center justify-center gap-2"
                  style={{ backgroundColor: '#1B8EF2' }}
                >
                  <Save className="w-5 h-5" />
                  {modalMode === 'create' ? 'Crear Cliente' : 'Guardar Cambios'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#FEE2E2' }}>
                <Trash2 className="w-8 h-8" style={{ color: '#D06D49' }} />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#0F172A' }}>
                ¿Eliminar Cliente?
              </h3>
              <p style={{ color: '#334155' }}>
                ¿Estás seguro de eliminar a <strong>{clienteToDelete?.nombre}</strong>? Esta acción no se puede deshacer.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCancelDelete}
                className="flex-1 px-6 py-3 rounded-xl font-semibold transition-all border-2"
                style={{
                  borderColor: '#E4E7EE',
                  color: '#334155'
                }}
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 px-6 py-3 rounded-xl text-white font-semibold transition-all hover:shadow-lg"
                style={{ backgroundColor: '#D06D49' }}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientesModule;