<template>
    <div class="container mt-5">
      <div class="row">
        <div class="col-lg-8 offset-lg-2">
          <div class="table-responsive">
            <br />
            <table class="table table-bordered table-striped table-hover">
              <thead class="table-dark">
                <tr>
                  <th>#</th>
                  <th>ID</th>
                  <th>MATERIAL</th>
                  <th>MARCADO</th>
                  <th>REGISTRO</th>
                  <th>ACCIONES</th>
                </tr>
              </thead>
              <tbody class="table-group-divider" id="contenido">
                <tr v-if="cargando">
                  <td colspan="7">
                    <h3 class="text-center">Cargando...</h3>
                  </td>
                </tr>
                <tr v-else v-for="(hie, i) in hierros" :key="hie.id">
                  <td v-text="(i+1)"></td>
                  <td v-text="hie.id"></td>
                  <td v-text="hie.material"></td>
                  <td v-text="hie.marcado"></td>
                  <td v-text="new Date(hie.created_at).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                  })"></td>
                  <td class="text-center align-middle">
                    <div class="d-flex justify-content-center align-items-center">
                      <router-link :to="{ path: 'viewH/'+ hie.id }" class="btn btn-info btn-sm rounded-circle mx-1">
                        <i class="fa-solid fa-eye"></i>
                      </router-link>
                      <router-link :to="{ path: 'editH/' + hie.id }" class="btn btn-warning btn-sm rounded-circle mx-1">
                        <i class="fa-solid fa-edit"></i>
                      </router-link>
                      <button class="btn btn-danger btn-sm rounded-circle mx-1" v-on:click="eliminar(hie.id)">
                        <i class="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { confirmar } from '../funciones';
  export default {
    data() {
      return {
        hierros: null,
        cargando: false
      };
    },
    mounted() {
      setTimeout(() => {
    localStorage.setItem('authenticated', 'false'); // Elimina la variable
    console.log('La variable authenticated ha sido eliminada.');
  }, 50000);
      this.getHierros();
    },
    methods: {
      getHierros() {
        this.cargando = true;
        axios.get('http://127.0.0.1:8000/api/v1/hierros').then(res => {
          this.hierros = res.data.data;
          this.cargando = false;
        });
      },
      eliminar(id) {
        confirmar(
          'http://127.0.0.1:8000/api/v1/hierros/',
          id,
          'Eliminar Registro',
          'Realmente desea eliminar este hierro?',
          this.getHierros
        );
        this.cargando = false;
      }
    }
  };
  </script>
  
  <style scoped>
  .text-truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  </style>