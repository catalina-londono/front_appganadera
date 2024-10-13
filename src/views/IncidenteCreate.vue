<template>
    <div class="row mt-5">
      <div class="col-md-6 offset-md-3">
        <div class="card">
          <div class="card-header bg-dark text-white text-center">
            Registrar Incidentes
          </div>
          <div class="card-body">
            <form v-on:submit="guardar">
              <div class="input-group mb-3">
                <span class="input-group-text"><i class="fa-solid fa-heading"></i></span>
                <input type="text" v-model="tipo" id="tipo" placeholder="Ingrese el tipo de incidente" maxlength="100" class="form-control">
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text"><i class="fa-solid fa-heading"></i></span>
                <input type="text" v-model="descripcion" id="descripcion" placeholder="Ingrese la descripcion del Incidente" maxlength="100" class="form-control">                
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
        tipo: 0,
        descripcion: '',
        url: 'http://127.0.0.1:8000/api/v1/incidentes',  
        cargando: false
      };
    },
    methods: {
      guardar(event) {
        event.preventDefault();
        
        if (this.tipo === '') {
          mostrarAlerta('Ingrese un tipo de incidente', 'warning', 'tipo');
        } else if (this.descripcion.trim() === '') {
          mostrarAlerta('Ingrese la descripcion', 'warning', 'descripcion');
        } else {
          const parametros = {
            tipo: this.tipo,
            descripcion: this.descripcion.trim(),
        };
  
          enviarSolicitud('POST', parametros, this.url, 'Incidente registrado con éxito!!!');
        }
      }
    }
  };
  </script>