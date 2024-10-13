<template>
    <div class="row mt-5">
      <div class="col-md-6 offset-md-3">
        <div class="card">
          <div class="card-header bg-dark text-white text-center">
            Editar Incidente
          </div>
          <div class="card-body">
            <form v-on:submit.prevent="actualizar">
              <div class="input-group mb-3">
                <span class="input-group-text"><i class="fa-solid fa-heading"></i></span>
                <input type="text" v-model="tipo" id="tipo" placeholder="Ingrese el nuevo tipo de incidente" maxlength="100" class="form-control">
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text"><i class="fa-solid fa-user"></i></span>
                <input type="text" v-model="descripcion" id="descripcion" placeholder="Ingrese el nuevo descripcion" maxlength="50" class="form-control">
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
        tipo: 0,
        descripcion: '',
        url: 'http://127.0.0.1:8000/api/v1/incidentes',  
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
      this.getIncidentes();
    },
    methods: {
      getIncidentes() {
        axios.get(this.url).then(res => {
          this.tipo = res.data.data.tipo;
          this.descripcion = res.data.data.descripcion;
        }).catch(error => {
          console.error("Error al obtener los incidentes:", error);
        });
      },
      actualizar() {
      // Previene el comportamiento por defecto del formulario
      event.preventDefault(); 
  
      // Validar campos antes de confirmar
      if (this.tipo === '') {
          mostrarAlerta('Ingrese un tipo de incidente', 'warning', 'tipo');
      } else if (this.descripcion.trim() === '') {
          mostrarAlerta('Ingrese una descripcion', 'warning', 'descripcion');
      } else {
          const parametros = {
              tipo: this.tipo,
              descripcion: this.descripcion.trim(),
          };
          
          // Llama a confirmarActualizacion en lugar de enviarSolicitud
          confirmarActualizacion(this.url, this.id, 'Confirmar Actualización', '¿Está seguro que desea actualizar este incidente?', parametros, () => {
          this.getIncidentes(); // Recarga los datos después de actualizar
          console.log('Callback de confirmación ejecutado');
        });
      }
  }
  
    }
  };
  </script>