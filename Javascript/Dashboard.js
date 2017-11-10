/**
 * Los Observables se utilizan para actualizar datos de la UI desde JS
 */
var Observable = require("FuseJS/Observable");
var search = Observable("");
var books = Observable(
    {
        image : "https://definicion.de/wp-content/uploads/2009/12/Portada.png",
        name : "El principito",
        count : "400"
    },
    {
        image : "https://images-na.ssl-images-amazon.com/images/I/51Fc8mToJML._SX292_BO1,204,203,200_.jpg",
        name : "El psicoanalista",
        count : "800"
    }
);
var activities = Observable();
var special = Observable();

/**
 * Se puede utilizar ECS6 pero depende del dispositivo
 * Por lo pronto en la version 1.4 de Fuse utilizar ECS5
 */
function getDashboardInfo() {
    // Obtener datos desde un servidor
    fetch("https://cdn.rawgit.com/jesusmartinoza/Fuse-Workshop/9731ceb3/raw_api.json")
        .then(function(response) {
            // Devuelve la respuesta con Headers
            return response.json(); // Parsear el body a JSON
        })
        .then(function(response) {
            books.clear();
            if(response.success) {
                books.addAll(response.data.popular);
                activities.addAll(response.data.activities);
                special.addAll(response.data.special);
            }
        })
}
getDashboardInfo();

/**
 * Sender tiene información del nodo con el que se interactuó
 * Posición, datos, color, contexto.
 */
function deleteCard(sender) {
    //books.remove(sender.data)
    console.log(sender.data);
    search.value = sender.data.name
}

module.exports = {
    search : search,
    activities : activities,
    books : books,
    special : special,
    deleteCard : deleteCard
}