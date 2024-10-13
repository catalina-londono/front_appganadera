import Swal from "sweetalert2";
import axios from "axios";

export function mostrarAlerta(titulo, icono, foco = '') {
    if (foco != '') {
        document.getElementById(foco).focus();
    }
    Swal.fire({
        title: titulo,
        icon: icono,
        customClass: { confirmButton: 'btn btn-primary', popup: 'animated zoomIn' }
    });
}

export function confirmar(urlConSlash, id, titulo, mensaje, callback) {
    var url = urlConSlash + id;
    const swalWithBootstrapButton = Swal.mixin({
        customClass: { confirmarButton: 'btn btn-success me-3', cancelButton: 'btn btn-danger' },
    });

    swalWithBootstrapButton.fire({
        title: titulo,
        text: mensaje,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '<i class="fa-solid fa-check"></i> SI, Eliminar',
        cancelButtonText: '<i class="fa-solid fa-ban"></i> Cancelar'
    }).then((res) => {
        if (res.isConfirmed) {
            enviarSolicitud('DELETE', { id: id }, url, 'Eliminacion  éxitosa.', callback);
        } else {
            mostrarAlerta('Operación Cancelada', 'info');
        }
    });
}

// Modificación de confirmarActualizacion
export function confirmarActualizacion(url, id, titulo, mensaje, parametros, callback) {
    const swalWithBootstrapButton = Swal.mixin({
        customClass: {
            confirmarButton: 'btn btn-success me-3',
            cancelButton: 'btn btn-danger'
        },
    });

    swalWithBootstrapButton.fire({
        title: titulo,
        text: mensaje,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '<i class="fa-solid fa-check"></i> SI, Actualizar',
        cancelButtonText: '<i class="fa-solid fa-ban"></i> Cancelar'
    }).then((res) => {
        if (res.isConfirmed) {
            enviarSolicitud('PUT', parametros, url, ' actualizacion exitosa!!!', callback);
        } else {
            mostrarAlerta('Operación Cancelada', 'info');
        }
    });
}

export function enviarSolicitud(metodo, parametros, url, mensaje, callback) {
    axios({
        method: metodo,
        url: url,
        data: parametros,
    }).then(function (res) {
        var estado = res.status;
        if (estado == 200 || estado == 201 || estado == 202 ) {
            mostrarAlerta(mensaje, 'success');
            // En lugar de redirigir, ejecutamos la función de callback
            if (callback) {
                callback();  // Aquí se refresca la lista de posts
            }
        }
    }).catch(function (error) {
        mostrarAlerta('Servidor no disponible', error);
    });
}