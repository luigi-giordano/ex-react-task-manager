// Importa createPortal da react-dom per rendereizzare un componente in un nodo DOM diverso
import { createPortal } from "react-dom";

// Componente Modal che riceve props: title, content, show, onClose, onConfirm, confirmText (default = "Conferma")
export default function Modal({ title, content, show, onClose, onConfirm, confirmText = "Conferma" }) {

    // Se la prop show è falsa, non renderizza nulla (modal nascosta)
    if (!show) return null;

    // Usa createPortal per "teletrasportare" il modal fuori dall'albero React corrente, nel body del DOM
    return createPortal(
        <div className="modal-overlay">
            <div className="modal">
                {/* Titolo del modal */}
                <h2>{title}</h2>
                {/* Contenuto dinamico passato come prop */}
                {content}
                <div className="modal-actions">
                    {/* Bottone per chiudere il modal */}
                    <button onClick={onClose}>Annulla</button>
                    {/* Bottone per confermare l'azione */}
                    <button onClick={onConfirm}>{confirmText}</button>
                </div>
            </div>
        </div>,
        document.body
    )
}
