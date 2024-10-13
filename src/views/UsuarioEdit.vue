<template>
    <div class="row mt-5">
      <div class="col-md-6 offset-md-3">
        <div class="card">
          <div class="card-header bg-dark text-white text-center">
            Editar Usuario
          </div>
          <div class="card-body">
            <form v-on:submit.prevent="actualizar">
              <div class="input-group mb-3">
                <span class="input-group-text"><i class="fa-solid fa-heading"></i></span>
                <input type="text" v-model="nombre_usuario" id="nombre_usuario" placeholder="Ingrese el nuevo nombre de usuario" maxlength="100" class="form-control">
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text"><i class="fa-solid fa-user"></i></span>
                <input type="text" v-model="rol" id="rol" placeholder="Ingrese el nuevo rol" maxlength="50" class="form-control">
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text"><i class="fa-solid fa-user"></i></span>
                <input type="text" v-model="nombre" id="nombre" placeholder="Ingrese el nuevo nombre" maxlength="50" class="form-control">
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text"><i class="fa-solid fa-user"></i></span>
                <input type="text" v-model="apellido" id="apellido" placeholder="Ingrese el nuevo apellido" maxlength="50" class="form-control">
              </div>
              <div class="d-grid col-6 mx-auto mb-3">
                <button class="btn btn-success"><i class="fa-solid fa-floppy-disk"></i> Actualizar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mostrarAlerta, confirmarActualizacion } from '../funciones';
  import { useRoute } from 'vue-router';
  import axios from 'axios';
  
  export default {
    data() {
      return {
        id: 0,
        nombre_usuario: '',
        rol: 0,
        nombre: '',
        apellido: '',
        url: 'http://127.0.0.1:8000/api/v1/usuarios',  
        cargando: false
      };
    },
    mounted() {
      setTimeout(() => {
    localStorage.setItem('authenticated', 'false'); // Elimina la variable
    console.log('La variable authenticated ha sido eliminada.');
  }, 50000);
      const route = useRoute();
      this.id = route.params.id;
      this.url += '/' + this.id;
      this.getUsuarios();
    },
    methods: {
      getUsuarios() {
        axios.get(this.url).then(res => {
          this.nombre_usuario = res.data.data.nombre_usuario;
          this.rol = res.data.data.rol;
          this.nombre = res.data.data.nombre;
          this.apellido = res.data.data.apellido;
        }).catch(error => {
          console.error("Error al obtener los usuarios:", error);
        });
      },
      actualizar() {
      // Previene el comportamiento por defecto del formulario
      event.preventDefault(); 
  
      // Validar campos antes de confirmar
      if (this.nombre_usuario.trim() === '') {
          mostrarAlerta('Ingrese un nombre_usuario', 'warning', 'nombre_usuario');
      } else if (this.rol ==='') {
          mostrarAlerta('Ingrese un rol', 'warning', 'rol');
      } else if (this.nombre.trim() === '') {
          mostrarAlerta('Ingrese un nombre', 'warning', 'nombre');
        } else if (this.apellido.trim() === '') {
          mostrarAlerta('Ingrese un apellido', 'warning', 'apellido');
      } else {
          const parametros = {
              nombre_usuario: this.nombre_usuario.trim(),
              rol: this.rol,
              nombre: this.nombre.trim(),
              apellido: this.apellido.trim(),
          };
          
          // Llama a confirmarActualizacion en lugar de enviarSolicitud
          confirmarActualizacion(this.url, this.id, 'Confirmar Actualización', '¿Está seguro que desea actualizar este usuario?', parametros, () => {
          this.getUsuarios(); // Recarga los datos después de actualizar
          console.log('Callback de confirmación ejecutado');
        });
      }
  }
  
    }
  };
  </script>