import { useState } from "react";
import { CheckboxGroup } from "../moleculas/CheckboxGroup";
import { SelectMeses } from "../moleculas/SelectMeses";
import { Button } from "../../../../globals/components/atomos/Button.jsx";
import { useInventario } from "../../../../context/InventarioContext";
import { useVentas } from "../../../../context/VentasContext";

export const ExportReportModal = ({ isOpen, onClose }) => {
  const [formatos, setFormatos] = useState([]);
  const [informacion, setInformacion] = useState([]);
  const [mes, setMes] = useState(null);

  const { ingresos, productos } = useInventario();
  const { ventas } = useVentas();

  if (!isOpen) return null;

  const toggleFormato = (value) => {
    setFormatos((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const toggleInfo = (value) => {
    setInformacion((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  // Filtrar datos por mes si está seleccionado
  const filtrarPorMes = (items, mesSeleccionado) => {
    if (!mesSeleccionado) return items;
    
    return items.filter(item => {
      const fecha = new Date(item.fecha);
      const mesItem = fecha.getMonth() + 1; // getMonth() devuelve 0-11
      return mesItem === parseInt(mesSeleccionado);
    });
  };

  // Generar datos para exportar
  const generarDatosExportacion = () => {
    const datos = {};

    // Filtrar por mes si está seleccionado
    const ventasFiltradas = filtrarPorMes(ventas, mes);
    const ingresosFiltrados = filtrarPorMes(ingresos, mes);

    if (informacion.includes("Ventas")) {
      datos.ventas = {
        total: ventasFiltradas.length,
        ingresoTotal: ventasFiltradas.reduce((sum, v) => sum + v.total, 0),
        detalle: ventasFiltradas.map(v => ({
          id: v.id,
          cliente: v.clienteFull,
          fecha: v.fecha,
          total: v.total,
          productos: v.productos.length,
          sucursal: v.sucursal
        }))
      };
    }

    if (informacion.includes("Inventario")) {
      datos.inventario = {
        totalIngresos: ingresosFiltrados.length,
        costoTotal: ingresosFiltrados.reduce((sum, i) => sum + i.costoTotal, 0),
        totalProductos: productos.length,
        detalle: ingresosFiltrados.map(i => ({
          id: i.id,
          proveedor: i.proveedor,
          fecha: i.fecha,
          cantidad: i.cantidad,
          costoTotal: i.costoTotal
        }))
      };
    }

    if (informacion.includes("Devoluciones")) {
      const devoluciones = ventasFiltradas.filter(v => 
        v.total < (v.subtotal - v.descuento) || v.productos.length === 0
      );
      
      datos.devoluciones = {
        total: devoluciones.length,
        detalle: devoluciones.map(v => ({
          id: v.id,
          cliente: v.clienteFull,
          fecha: v.fecha,
          montoDevuelto: (v.subtotal - v.total - v.descuento),
          sucursal: v.sucursal
        }))
      };
    }

    return datos;
  };

  // Simular exportación a PDF
  const exportarPDF = (datos) => {
    console.log("📄 Exportando a PDF:", datos);
    
    // Crear un resumen en texto
    let resumen = "=== REPORTE EXPORTADO ===\n\n";
    
    if (datos.ventas) {
      resumen += `VENTAS:\n`;
      resumen += `Total de ventas: ${datos.ventas.total}\n`;
      resumen += `Ingreso total: S/ ${datos.ventas.ingresoTotal.toFixed(2)}\n\n`;
    }
    
    if (datos.inventario) {
      resumen += `INVENTARIO:\n`;
      resumen += `Total de ingresos: ${datos.inventario.totalIngresos}\n`;
      resumen += `Costo total: S/ ${datos.inventario.costoTotal.toFixed(2)}\n\n`;
    }
    
    if (datos.devoluciones) {
      resumen += `DEVOLUCIONES:\n`;
      resumen += `Total de devoluciones: ${datos.devoluciones.total}\n\n`;
    }

    // En una app real, aquí usarías una librería como jsPDF
    console.log(resumen);
  };

  // Simular exportación a Excel
  const exportarExcel = (datos) => {
    console.log("📊 Exportando a Excel:", datos);
    
    // Convertir a CSV simple
    let csv = "REPORTE DE DATOS\n\n";
    
    if (datos.ventas) {
      csv += "VENTAS\n";
      csv += "ID,Cliente,Fecha,Total,Productos\n";
      datos.ventas.detalle.forEach(v => {
        csv += `${v.id},${v.cliente},${v.fecha},${v.total},${v.productos}\n`;
      });
      csv += "\n";
    }
    
    if (datos.inventario) {
      csv += "INVENTARIO\n";
      csv += "ID,Proveedor,Fecha,Cantidad,Costo Total\n";
      datos.inventario.detalle.forEach(i => {
        csv += `${i.id},${i.proveedor},${i.fecha},${i.cantidad},${i.costoTotal}\n`;
      });
      csv += "\n";
    }

    // En una app real, aquí usarías una librería como xlsx
    console.log(csv);
  };

  const handleExport = () => {
    // Validaciones
    if (formatos.length === 0) {
      return;
    }

    if (informacion.length === 0) {
      return;
    }

    // Generar datos
    const datos = generarDatosExportacion();

    // Exportar según formatos seleccionados
    if (formatos.includes("PDF")) {
      exportarPDF(datos);
    }

    if (formatos.includes("Excel")) {
      exportarExcel(datos);
    }

    // Mensaje de éxito
    const formatosTexto = formatos.join(" y ");
    const infoTexto = informacion.join(", ");
    const mesTexto = mes ? ` del mes ${mes}` : "";
    
    
    // Resetear y cerrar
    setFormatos([]);
    setInformacion([]);
    setMes(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        className="bg-neutral-01 rounded-2xl shadow-2xl w-[430px] max-w-full p-6 flex flex-col gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-text-01">Exportar reporte</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-text-02 hover:text-text-01 text-xl leading-none"
          >
            ×
          </button>
        </header>

        <CheckboxGroup
          title="Selecciona qué formato quieres exportar:"
          options={["PDF", "Excel"]}
          values={formatos}
          onToggle={toggleFormato}
        />

        <CheckboxGroup
          title="Selecciona qué información quieres exportar:"
          options={["Ventas", "Inventario", "Devoluciones"]}
          values={informacion}
          onToggle={toggleInfo}
        />

        <SelectMeses value={mes} onChange={setMes} />

        <div className="flex justify-end gap-3 pt-2">
          <Button
            variant="white"
            size="medium"
            onClick={onClose}
            type="button"
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            size="medium"
            type="button"
            onClick={handleExport}
          >
            Exportar
          </Button>
        </div>
      </div>
    </div>
  );
};