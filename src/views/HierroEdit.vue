<template>
    <div class="row mt-5">
      <div class="col-md-6 offset-md-3">
        <div class="card">
          <div class="card-header bg-dark text-white text-center">
            Editar Hierro
          </div>
          <div class="card-body">
            <form v-on:submit.prevent="actualizar">
              <div class="input-group mb-3">
                <span class="input-group-text"><i class="fa-solid fa-heading"></i></span>
                <input type="text" v-model="material" id="material" placeholder="Ingrese el nuevo material" maxlength="100" class="form-control">
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text"><i class="fa-solid fa-user"></i></span>
                <input type="text" v-model="marcado" id="marcado" placeholder="Ingrese el nuevo marcado" maxlength="50" class="form-control">
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
        material: '',
        marcado: '',
        url: 'http://127.0.0.1:8000/api/v1/hierros',  
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
      this.getHierros();
    },
    methods: {
      getHierros() {
        axios.get(this.url).then(res => {
          this.material = res.data.data.material;
          this.marcado = res.data.data.marcado;
        }).catch(error => {
          console.error("Error al obtener los hierros:", error);
        });
      },
      actualizar() {
      // Previene el comportamiento por defecto del formulario
      event.preventDefault(); 
  
      // Validar campos antes de confirmar
      if (this.material.trim() === '') {
          mostrarAlerta('Ingrese un material', 'warning', 'material');
      } else if (this.marcado.trim() === '') {
          mostrarAlerta('Ingrese un marcado', 'warning', 'marcado');
      } else {
          const parametros = {
              material: this.material.trim(),
              marcado: this.marcado.trim(),
          };
          
          // Llama a confirmarActualizacion en lugar de enviarSolicitud
          confirmarActualizacion(this.url, this.id, 'Confirmar Actualización', '¿Está seguro que desea actualizar este hierro?', parametros, () => {
          this.getHierros(); // Recarga los datos después de actualizar
          console.log('Callback de confirmación ejecutado');
        });
      }
  }
  
    }
  };
  </script>