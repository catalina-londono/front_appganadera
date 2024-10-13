<template>
    <div class="row mt-5">
      <div class="col-md-6 offset-md-3">
        <div class="card">
          <div class="card-header bg-dark text-white text-center">
            Registrar Fincas
          </div>
          <div class="card-body">
            <form v-on:submit="guardar">
              <div class="input-group mb-3">
                <span class="input-group-text"><i class="fa-solid fa-heading"></i></span>
                <input type="text" v-model="nombre" id="nombre" placeholder="Ingrese el Nombre de la Finca" maxlength="100" class="form-control">
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text"><i class="fa-solid fa-align-left"></i></span>
                <input type="text" v-model="ubicacion" id="ubicacion" placeholder="Ingrese la ubicacion" class="form-control" rows="5">
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
        nombre: '',
        ubicacion: '',
        url: 'http://127.0.0.1:8000/api/v1/fincas',  
        cargando: false
      };
    },
    methods: {
      guardar(event) {
        event.preventDefault();
        
        if (this.nombre.trim() === '') {
          mostrarAlerta('Ingrese un nombre para la finca', 'warning', 'nombre');
        } else if (this.ubicacion.trim() === '') {
          mostrarAlerta('Ingrese la ubicacion', 'warning', 'ubicacion');
        } else {
          const parametros = {
            nombre: this.nombre.trim(),
            ubicacion: this.ubicacion.trim(),
        };
  
          enviarSolicitud('POST', parametros, this.url, 'Finca registrada con éxito!!!');
        }
      }
    }
  };
  </script>