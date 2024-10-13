<template>
    <div class="row mt-5">
      <div class="col-md-6 offset-md-3">
        <div class="card">
          <div class="card-header bg-dark text-white text-center">
            Registrar Hierros
          </div>
          <div class="card-body">
            <form v-on:submit="guardar">
              <div class="input-group mb-3">
                <span class="input-group-text"><i class="fa-solid fa-heading"></i></span>
                <input type="text" v-model="material" id="material" placeholder="Ingrese el Material" maxlength="100" class="form-control">
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text"><i class="fa-solid fa-align-left"></i></span>
                <input type="text" v-model="marcado" id="marcado" placeholder="Ingrese el Marcado" class="form-control" rows="5">
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
        material: '',
        marcado: '',
        url: 'http://127.0.0.1:8000/api/v1/hierros',  
        cargando: false
      };
    },
    methods: {
      guardar(event) {
        event.preventDefault();
        
        if (this.material.trim() === '') {
          mostrarAlerta('Ingrese un Material', 'warning', 'material');
        } else if (this.marcado.trim() === '') {
          mostrarAlerta('Ingrese el Marcado', 'warning', 'marcado');
        } else {
          const parametros = {
            material: this.material.trim(),
            marcado: this.marcado.trim(),
        };
  
          enviarSolicitud('POST', parametros, this.url, 'Hierro registrado con éxito!!!');
        }
      }
    }
  };
  </script>