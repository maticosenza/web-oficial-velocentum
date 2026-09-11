type TextoBotonProps = {
  texto: string;
};

/** Dos copias visuales; la copia animada queda fuera del árbol accesible. */
export function TextoBoton({ texto }: TextoBotonProps) {
  return (
    <span className="boton__texto">
      <span className="boton__texto-carril">
        <span className="boton__texto-linea">{texto}</span>
        <span className="boton__texto-linea" aria-hidden="true">
          {texto}
        </span>
      </span>
    </span>
  );
}
