import { useState } from "react";
import estilos from "./TarjetaTaller.module.css";

export default function TarjetaTaller({ taller }) {
    const [expandida, setExpandida] = useState(false);
    const { titulo, categoria, cupo, inscriptos, nuevo, descripcion } = taller;
    const libres = cupo - inscriptos;
    const porcentaje = Math.round((inscriptos / cupo) * 100);

    const estado = libres === 0 ? "completo" : libres <= 3 ? "pocos" : "disponible";

    const clases = [estilos.tarjeta, estilos[estado], expandida && estilos.expandida]
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
        <button onClick={() => setExpandida(!expandida)}>
        {expandida ? "Ocultar detalles" : "Ver detalles"}
        </button>
    </article>
    );
}