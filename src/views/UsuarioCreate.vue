<template>
    <div class="row mt-5">
      <div class="col-md-6 offset-md-3">
        <div class="card">
          <div class="card-header bg-dark text-white text-center">
            Registrar Usuarios
          </div>
          <div class="card-body">
            <form v-on:submit="guardar">
              <div class="input-group mb-3">
                <span class="input-group-text"><i class="fa-solid fa-heading"></i></span>
                <input type="text" v-model="nombre_usuario" id="nombre_usuario" placeholder="Ingrese el Nombre de usuario" maxlength="100" class="form-control">
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text"><i class="fa-solid fa-align-left"></i></span>
                <input type="text" v-model="rol" id="rol" placeholder="Ingrese el rol del usuario" class="form-control" rows="5">
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text"><i class="fa-solid fa-heading"></i></span>
                <input type="text" v-model="nombre" id="nombre" placeholder="Ingrese el Nombre del Usuario" maxlength="100" class="form-control">                
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text"><i class="fa-solid fa-heading"></i></span>
                <input type="text" v-model="apellido" id="apellido" placeholder="Ingrese el Apellido del usuario" maxlength="100" class="form-control">
              </div>
              <div class="d-grid col-6 mx-auto mb-3">
                <button class="btn btn-success"><i class="fa-solid fa-floppy-disk"></i> Registrar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mostrarAlerta, enviarSolicitud } from '../funciones';
  
  export default {
    mounted(){
// localStorage.setItem('authenticated', 'false');
setTimeout(() => {
    localStorage.setItem('authenticated', 'false'); // Elimina la variable
    console.log('La variable authenticated ha sido eliminada.');
  }, 50000);
},
    data() {
      return {
        nombre_usuario: '',
        rol: 0,
        nombre: '',
        apellido: '',
        url: 'http://127.0.0.1:8000/api/v1/usuarios',  
        cargando: false
      };
    },
    methods: {
      guardar(event) {
        event.preventDefault();
        
        if (this.nombre_usuario.trim() === '') {
          mostrarAlerta('Ingrese un nombre de usuario', 'warning', 'nombre_usuario');
        } else if (this.rol.trim() === '') {
          mostrarAlerta('Ingrese el rol', 'warning', 'rol');
        } else if (this.nombre.trim() === '') {
          mostrarAlerta('Ingrese el nombre', 'warning', 'nombre');
        } else if (this.apellido.trim() === '') {
          mostrarAlerta('Ingrese el apellido', 'warning', 'apellido');
        } else {
          const parametros = {
            nombre_usuario: this.nombre_usuario.trim(),
            rol: this.rol.trim(),
            nombre: this.nombre.trim(),
            apellido: this.apellido.trim(),
        };
  
          enviarSolicitud('POST', parametros, this.url, 'Usuario registrado con éxito!!!');
        }
      }
    }
  };
  </script>