<template>
    <div style="margin-top: 80px;"> <!-- Ajusta el valor según sea necesario -->
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <div class="card">
            <div class="card-header bg-dark text-white text-center">
              Detalles del Ganado
            </div>
            <div class="card-body">
              
              <div class="input-group mb-3">
                <span class="input-group-text"><i class="fa-solid fa-heading"></i></span>
                <label v-text="sexo" class="form-control"></label>
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text"><i class="fa-solid fa-align-left"></i></span>
                <label v-text="raza" class="form-control" rows="5"></label>
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text"><i class="fa-solid fa-align-left"></i></span>
                <label v-text="proposito" class="form-control" rows="5"></label>
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text"><i class="fa-solid fa-align-left"></i></span>
                <label v-text="tipo" class="form-control" rows="5"></label>
              </div>
              <div class="d-grid col-6 mx-auto mb-3">
              <img v-if="foto" height="100" :src="foto" id="fotoimg" class="img-thumbnail" alt="">
              <img v-else height="100" src="https://cdn0.iconfinder.com/data/icons/isometric-farm-animals/320/cow-01-256.png" id="fotoimg" class="img-thumbnail" alt=""> 
            </div>
              <div class="input-group mb-3">
                <span class="input-group-text"><i class="fa-solid fa-align-left"></i></span>
                <label v-text="finca_id" class="form-control" rows="5"></label>
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text"><i class="fa-solid fa-align-left"></i></span>
                <label v-text="hierro_id" class="form-control" rows="5"></label>
              </div>
              <div class="d-grid col-6 -mx-auto mb-3">
                <router-link to="/viewG" class="btn  btn-warning btn-sm mx-1">
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
      sexo: 0,
      raza: '',
      proposito: 0,
      tipo: 0,
      foto: '',
      finca_id: 0,
      hierro_id: 0,
      url: 'http://127.0.0.1:8000/api/v1/ganados',  
      cargando: false
    }
  },
    mounted() {
      setTimeout(() => {
    localStorage.setItem('authenticated', 'false'); // Elimina la variable
    console.log('La variable authenticated ha sido eliminada.');
  }, 50000);
      const route = useRoute();
      this.id = route.params.id;
      this.url += '/' + this.id;
      this.getGanados();
    },
    methods: {
      getGanados() {
        this.cargando = true;  // Establecer el estado de carga
        axios.get(this.url).then(res => {
        this.sexo = res.data.data.sexo;
        this.raza = res.data.data.raza;
        this.proposito = res.data.data.proposito;
        this.tipo = res.data.data.tipo;
        this.foto = res.data.data.foto;
        this.finca_id = res.data.data.finca_id;
        this.hierro_id = res.data.data.hierro_id;
        }).catch(error => {
            console.error("Error al obtener el ganado", error);
          })
          .finally(() => {
            this.cargando = false;  // Resetear el estado de carga
          });
      },
    }
  };
  </script>