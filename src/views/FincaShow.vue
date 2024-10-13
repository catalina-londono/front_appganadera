<template>
    <div style="margin-top: 80px;"> <!-- Ajusta el valor según sea necesario -->
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <div class="card">
            <div class="card-header bg-dark text-white text-center">
              Detalles de la Finca
            </div>
            <div class="card-body">
              
              <div class="input-group mb-3">
                <span class="input-group-text"><i class="fa-solid fa-heading"></i></span>
                <label v-text="nombre" class="form-control"></label>
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text"><i class="fa-solid fa-align-left"></i></span>
                <label v-text="ubicacion" class="form-control" rows="5"></label>
              </div>
              <div class="d-grid col-6 -mx-auto mb-3">
                <router-link to="/viewF" class="btn  btn-warning btn-sm mx-1">
                  <i class="fa-solid fa-arrow-left"></i> Regresar a la lista
                </router-link>
              </div> 
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  
  <script>
  import { useRoute } from 'vue-router';
  import axios from 'axios';
  
  export default {
    data() {
      return {
        id: 0,
        nombre: '',
        rol: 0,
        nombre: '',
        apellido: '',
        url: 'http://127.0.0.1:8000/api/v1/fincas',  
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
      this.getFincas();
    },
    methods: {
      getFincas() {
        this.cargando = true;  // Establecer el estado de carga
        axios.get(this.url)
          .then(res => {
            this.nombre = res.data.data.nombre;
            this.ubicacion = res.data.data.ubicacion;
          })
          .catch(error => {
            console.error("Error al obtener la finca", error);
          })
          .finally(() => {
            this.cargando = false;  // Resetear el estado de carga
          });
      },
    }
  };
  </script>