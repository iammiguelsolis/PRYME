import { useState } from "react";
import { Button } from "../../../../globals/components/atomos/Button";
import { SectionHeader } from "../molecules/SectionHeader";
import { HiPlus, HiOutlineTrash } from "react-icons/hi2";

export const BatchList = () => {
  const [rows, setRows] = useState([
    {
      producto: "Nike Air Zoom X",
      color: "Negro",
      talla: "41",
      cantidad: 10,
      costo: 180,
      subtotal: 1800,
    },
    {
      producto: "Nike SB DUNK",
      color: "Blanco",
      talla: "40",
      cantidad: 6,
      costo: 175,
      subtotal: 1050,
    },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [tempRow, setTempRow] = useState({
    producto: "",
    color: "",
    talla: "",
    cantidad: "",
    costo: "",
    subtotal: "",
  });

  const handleAddRow = () => {
    setRows([...rows, tempRow]);
    setTempRow({
      producto: "",
      color: "",
      talla: "",
      cantidad: "",
      costo: "",
      subtotal: "",
    });
    setIsAdding(false);
  };

  const deleteRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-neutral-01 rounded-lg shadow-md p-6 mt-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 w-full">
        <div className="flex-1 mr-4">
          <SectionHeader title="Items del Lote" />
        </div>

        <Button
          onClick={() => setIsAdding(true)}
          size="medium"
          variant="secondaryUNO"
        >
          <HiPlus className="w-5 h-5 mr-2" />
          Añadir Producto
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-auto grow rounded-lg">
        <table className="w-full">
          <thead className="bg-primary-01 text-text-03">
            <tr>
              {[
                "Producto",
                "Color",
                "Talla",
                "Cantidad",
                "Costo Unitario(S/.)",
                "Subtotal (S/.)",
                "Detalle",
              ].map((h) => (
                <th
                  key={h}
                  className="py-3 px-3 text-center align-middle font-semibold"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {/* Existing rows */}
            {rows.map((r, i) => (
              <tr
                key={i}
                className="border-b border-neutral-03 text-text-02 hover:bg-neutral-03 transition"
              >
                <td className="py-3 px-3 text-center">{r.producto}</td>
                <td className="py-3 px-3 text-center">{r.color}</td>
                <td className="py-3 px-3 text-center">{r.talla}</td>
                <td className="py-3 px-3 text-center">{r.cantidad}</td>
                <td className="py-3 px-3 text-center">{r.costo}</td>
                <td className="py-3 px-3 text-center">{r.subtotal}</td>

                <td className="py-3 px-3 flex items-center justify-center gap-2">
                  <Button size="small" variant="white">
                    Ver detalle
                  </Button>

                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => deleteRow(i)}
                  >
                    <HiOutlineTrash className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}

            {/* Temporary input row */}
            {isAdding && (
              <tr className="bg-neutral-01">
                {/* Producto → dropdown selector */}
                <td className="py-3 px-3">
                  <select
                    className="w-full border border-neutral-03 rounded-md px-3 py-1 bg-white"
                    value={tempRow.producto}
                    onChange={(e) =>
                      setTempRow({ ...tempRow, producto: e.target.value })
                    }
                  >
                    <option value="">Seleccione producto</option>
                    <option value="Escribir Nuevo Producto">Escribir Nuevo Producto</option>
                    <option value="Nike Air Pro Max">Nike Air Pro Max</option>
                    <option value="Nike SB DUNK">Nike SB DUNK</option>
                    <option value="Adidas Forum Low">Adidas Forum Low</option>
                    <option value="Nike Air Force">Nike Air Force</option>
                    <option value="Adidas Samba">Adidas Samba</option>
                    <option value="Adidas Gazelle">Adidas Gazelle</option>
                  </select>
                </td>

                {/* Color */}
                <td className="py-3 px-3">
                  <input
                    placeholder="Color"
                    className="w-full border border-neutral-03 rounded-md px-3 py-1 text-left"
                    value={tempRow.color}
                    onChange={(e) =>
                      setTempRow({ ...tempRow, color: e.target.value })
                    }
                  />
                </td>

                {/* Talla */}
                <td className="py-3 px-3">
                  <input
                    placeholder="Talla"
                    className="w-full border border-neutral-03 rounded-md px-3 py-1 text-left"
                    value={tempRow.talla}
                    onChange={(e) =>
                      setTempRow({ ...tempRow, talla: e.target.value })
                    }
                  />
                </td>

                {/* Cantidad */}
                <td className="py-3 px-3">
                  <input
                    placeholder="Cantidad"
                    type="number"
                    className="w-full border border-neutral-03 rounded-md px-3 py-1 text-left"
                    value={tempRow.cantidad}
                    onChange={(e) =>
                      setTempRow({ ...tempRow, cantidad: e.target.value })
                    }
                  />
                </td>

                {/* Costo */}
                <td className="py-3 px-3">
                  <input
                    placeholder="Costo Unitario"
                    type="number"
                    className="w-full border border-neutral-03 rounded-md px-3 py-1 text-left"
                    value={tempRow.costo}
                    onChange={(e) =>
                      setTempRow({ ...tempRow, costo: e.target.value })
                    }
                  />
                </td>

                {/* Subtotal */}
                <td className="py-3 px-3">
                  <input
                    placeholder="Subtotal"
                    type="number"
                    className="w-full border border-neutral-03 rounded-md px-3 py-1 text-left"
                    value={tempRow.subtotal}
                    onChange={(e) =>
                      setTempRow({ ...tempRow, subtotal: e.target.value })
                    }
                  />
                </td>


                <td className="py-3 px-3 flex gap-2 items-center justify-center">
                  <Button
                    size="small"
                    variant="secondaryUNO"
                    onClick={handleAddRow}
                  >
                    Confirmar
                  </Button>

                  <Button
                    size="small"
                    variant="white"
                    onClick={() => setIsAdding(false)}
                  >
                    Cancelar
                  </Button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
