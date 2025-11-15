// src/components/proveedores/ProveedorList.jsx
import React from "react";
import { Edit2, Trash2 } from "lucide-react";

/**
 * ProveedorList
 * Props:
 *  - proveedores: array de objetos { id, nombre, contacto, email, telefono, especialidad }
 *  - onEdit: function(proveedor) -> abre formulario con datos
 *  - onDelete: function(id) -> elimina proveedor
 */
const ProveedorList = ({ proveedores = [], onEdit, onDelete }) => {
  if (!proveedores || proveedores.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-12 text-center text-gray-500">
        No hay proveedores registrados
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-gray-200">
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(to right, #e0aaff, #c77dff, #9d4edd)",
          padding: '11px',
          marginBottom: "17px",
          marginLeft: '17px',
          borderRadius: '17px',
          maxWidth: '96%'
        }}
      >
        <h2 style={{ fontSize: 26, fontWeight: "700", color: "black", margin: 0 }}>
          🧾 Lista de Proveedores
        </h2>
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto", padding: "0 24px 24px 24px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr
              style={{
                background: 'linear-gradient(to right, #7b2cbf, #5a189a)',
              }}
            >
              <th style={thStyle}>Empresa</th>
              <th style={thStyle}>Contacto</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Teléfono</th>
              <th style={{ ...thStyle, minWidth: 220 }}>Especialidad / Materiales</th>
              <th style={thStyle}>Firma</th>
              <th style={{ ...thStyle, textAlign: "center" }}>Acciones</th>
              
            </tr>
          </thead>

          <tbody>
            {proveedores.map((p, idx) => (
              <tr
                key={p.id ?? idx}
                style={{
                  backgroundColor: idx % 2 === 0 ? "#f9fafb" : "white",
                  borderBottom: "2px solid #e5e7eb",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#eef2ff")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = idx % 2 === 0 ? "#f9fafb" : "white")
                }
              >
                <td style={tdStyle}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={avatarStyle(p.nombre)}>{(p.nombre || "—").slice(0, 1)}</span>
                    <div>
                      <div style={{ fontWeight: 700, color: "#0f172a", fontSize: 18 }}>{p.nombre || "—"}</div>
                      <div style={{ color: "#475569", fontSize: 13 }}>{p.email || ""}</div>
                    </div>
                  </div>
                </td>

                <td style={tdStyle}>
                  <div style={{ fontWeight: 600, color: "#0f172a" }}>{p.contacto || "—"}</div>
                </td>

                <td style={tdStyle}>
                  <div style={{ color: "#0f172a" }}>{p.email || "—"}</div>
                </td>

                <td style={tdStyle}>
                  <div style={{ color: "#0f172a" }}>{p.telefono || "—"}</div>
                </td>

                <td style={tdStyle}>
                  <div style={{ color: "#111827", lineHeight: 1.4 }}>{p.especialidad || "—"}</div>
                </td>

                <td style={tdStyle}>
                  <div style={{ color: "#111827", lineHeight: 1.4 }}>{p.firma || "—"}</div>
                </td>

                <td style={{ padding: "18px 24px", textAlign: "center" }}>
                  <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                    <button
                      onClick={() => onEdit && onEdit(p)}
                      style={actionButtonStyle("#06b6d4")}
                      onMouseEnter={(e) => hoverIn(e, "#0891b2")}
                      onMouseLeave={(e) => hoverOut(e, "#06b6d4")}
                      title="Editar"
                    >
                      <Edit2 size={18} />
                    </button>

                    <button
                      onClick={() => onDelete && onDelete(p.id)}
                      style={actionButtonStyle("#ef4444")}
                      onMouseEnter={(e) => hoverIn(e, "#dc2626")}
                      onMouseLeave={(e) => hoverOut(e, "#ef4444")}
                      title="Eliminar"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div
        style={{
          backgroundColor: "#f3f4f6",
          padding: "14px 20px",
          borderTop: "4px solid #0554d2ff",
        }}
      >
        <p style={{ margin: 0, color: "#374151", fontWeight: 600 }}>
          Total de proveedores:{" "}
          <span style={{ color: "#1d4ed8", fontWeight: 800 }}>{proveedores.length}</span>
        </p>
      </div>
    </div>
  );
};

export default ProveedorList;

/* ---------- Helpers inline (encapsulados para no depender de CSS externo) ---------- */

const thStyle = {
  padding: "7px 17px",
  textAlign: "center",
  fontWeight: 'bold',
  fontSize: '20px',
  borderRight: "2px solid rgba(255,255,255,0.04)",
};

const tdStyle = {
  padding: "7px 17px",
  verticalAlign: "middle",
  fontWeight: 'bold',
  textAlign: "center",
  fontSize: '20px',
  borderRight: "2px solid #5a189a",
};

const avatarStyle = (name) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 44,
  height: 44,
  borderRadius: 10,
  background: "#e0f2fe",
  color: "#075985",
  fontWeight: 800,
  fontSize: 16,
});

const actionButtonStyle = (bg) => ({
  backgroundColor: bg,
  color: "white",
  padding: "10px",
  borderRadius: 10,
  border: "none",
  cursor: "pointer",
  boxShadow: "0 4px 8px rgba(0,0,0,0.08)",
  transition: "all 0.12s",
});

const hoverIn = (e, color) => {
  e.currentTarget.style.backgroundColor = color;
  e.currentTarget.style.transform = "scale(1.05)";
};

const hoverOut = (e, color) => {
  e.currentTarget.style.backgroundColor = color;
  e.currentTarget.style.transform = "scale(1)";
};
