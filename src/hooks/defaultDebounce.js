// Funzione debounce che limita la frequenza di esecuzione di una funzione (callback)
// delay è il tempo di attesa in millisecondi prima di eseguire la callback
export default function debounce(callback, delay) {

    // Variabile timer che memorizza l'ID del timeout corrente
    let timer;

    // Ritorna una nuova funzione che riceve un valore (value)
    return (value) => {
        // Pulisce il timeout precedente, se esiste, impedendo che la callback venga chiamata prematuramente
        clearTimeout(timer);

        // Imposta un nuovo timeout per chiamare la callback dopo il delay in millisecondi
        timer = setTimeout(() => {
            callback(value);  // Esegue la callback con il valore passato
        }, delay);
    };
};
