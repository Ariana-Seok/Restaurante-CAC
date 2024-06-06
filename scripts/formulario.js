const borrarDatos = () => {
    const nombre = document.querySelector("#nombre");
    const apellido = document.querySelector("#apellido");
    const email = document.querySelector("#email");
    const mensaje = document.querySelector("#mensaje");
    const asunto = document.querySelector("#asunto");

    nombre.value = "";
    apellido.value = "";
    email.value = "";
    mensaje.value = "";
    asunto.value = "Elija una opcion de asunto";
}

function es_correo_valido(correo) {
    const correo_valido = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    return correo_valido.test(correo);
}


function mostrarMensajeError(mensaje, contenedorSeleccionado, inputSeleccionado){
    const contenedor = document.querySelector(contenedorSeleccionado);
    const formulario = document.querySelector(inputSeleccionado);
    const estado = document.createElement("p");
    formulario.classList.add("is-invalid");
    estado.classList.add("info_estado");
    estado.textContent = mensaje;
    contenedor.appendChild(estado);

}

function verificar_campo_completo() {
    const nombre = document.querySelector("#nombre").value;
    const apellido = document.querySelector("#apellido").value;
    const email = document.querySelector("#email").value;
    const mensaje = document.querySelector("#mensaje").value;
    const asunto = document.querySelector("#asunto").value;
    const terminos = document.querySelector("#terminos").checked;
    const estado = document.querySelector(".info_estado");

    document.querySelectorAll('.is-invalid').forEach(element => {
        element.classList.remove('is-invalid');
    });

    if (estado) {
        estado.remove();
    }

    if (nombre === "" || nombre.trim() === "") {
        mostrarMensajeError("Escriba un nombre válido.", ".contenedorInputNombre", "#nombre");
        return;
    } else if (apellido === "" || apellido.trim() === "") {
        mostrarMensajeError("Escriba un apellido válido.", ".contenedorInputApellido", "#apellido");
        return;
    } else if (!es_correo_valido(email)) {
        mostrarMensajeError("Escriba un email válido.", ".contenedorInputEmail", "#email");
        return;
    } else if (asunto === "Elija una opcion de asunto") {
        mostrarMensajeError("Seleccione un asunto.", ".contenedorSelectAsunto", "#asunto");
        return;
    } else if (mensaje === "" || mensaje.trim().length < 20) {
        mostrarMensajeError("Escriba un mensaje válido de almenos 20 caracteres.", ".contenedorMensaje", "#mensaje");    
        return;
    } else if (!terminos) {
        mostrarMensajeError("Debe aceptar los términos y condiciones.", ".contenedorCheckbox", "#terminos");
        return;
    }

    return true;
}

function mostrar_alerta_exito(){
    const alerta_exito = document.querySelector(".alerta_exito");
    alerta_exito.classList.add("alert", "alert-success", "alert-dismissible", "fade", "show");
    alerta_exito.setAttribute("role", "alert");
    alerta_exito.innerHTML = `
        <strong>¡Enviado con éxito!</strong> Tu mensaje ha sido recibido y será atendido dentro de nuestro horario de atención. ¡Gracias por contactarnos!
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `
}


const enviarFormulario = (event) => {
    event.preventDefault(); 
    if (verificar_campo_completo()){
        borrarDatos();
        mostrar_alerta_exito();
    }

    
    
}


const boton_enviar = document.querySelector("#btn_enviar");
boton_enviar.addEventListener("click", enviarFormulario);