import { useState } from "react";
import estilos from "./TarjetaTaller.module.css";
import Boton from "../Boton/Boton";

export default function TarjetaTaller({ taller, vista }) {
    const [expandida, setExpandida] = useState(false);
    const { titulo, categoria, cupo, inscriptos, nuevo, descripcion } = taller;
    const libres = cupo - inscriptos;
  const porcentaje = Math.round((inscriptos / cupo) * 100);

    const estado = libres === 0 ? "completo" : libres <= 3 ? "pocos" : "disponible";

    const clases = [
    estilos.tarjeta,
    estilos[estado],
    expandida && estilos.expandida,
    vista === "lista" && estilos.horizontal,
    ]
    .filter(Boolean)
    .join(" ");

    return (
    <article className={clases}>
        {nuevo && <span className={estilos.etiqueta}>Nuevo</span>}
        <h2>{titulo}</h2>
        <p>{categoria}</p>
        {libres === 0 ? (
        <p>Completo</p>
        ) : (
        <p>Cupos libres: {libres} de {cupo}</p>
        )}

        <div className={estilos.barra}>
        <div className={estilos.relleno} style={{ width: `${porcentaje}%` }} />
        </div>

        {expandida && <p>{descripcion}</p>}
        <Boton variante="secundario" onClick={() => setExpandida(!expandida)}>
        {expandida ? "Ocultar detalles" : "Ver detalles"}
        </Boton>
    </article>
    );
}