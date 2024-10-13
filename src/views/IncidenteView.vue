<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-lg-9 offset-lg-2">
        <div class="table-responsive">
          <br />
          <table class="table table-bordered table-striped table-hover">
            <thead class="table-dark">
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>TIPO</th>
                <th>DESCRIPCION</th>
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
              <tr v-else v-for="(inc, i) in incidentes" :key="inc.id">
                <td v-text="(i+1)"></td>
                <td v-text="inc.id"></td>
                <td>
                {{ inc.tipo === 1 ? 'Pérdida' : inc.tipo === 2 ? 'Traslado' : inc.tipo === 3 ? 'Muerte' : inc.tipo === 4 ? 'Venta' : 'Desconocido' }}
                </td>
                <td v-text="inc.descripcion"></td>
                <td v-text="new Date(inc.created_at).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                })"></td>
                <td class="text-center align-middle">
                  <div class="d-flex justify-content-center align-items-center">
                    <router-link :to="{ path: 'viewI/'+ inc.id }" class="btn btn-info btn-sm rounded-circle mx-1">
                      <i class="fa-solid fa-eye"></i>
                    </router-link>
                    <router-link :to="{ path: 'editI/' + inc.id }" class="btn btn-warning btn-sm rounded-circle mx-1">
                      <i class="fa-solid fa-edit"></i>
                    </router-link>
                    <button class="btn btn-danger btn-sm rounded-circle mx-1" v-on:click="eliminar(inc.id)">
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
      incidentes: null,
      cargando: false
    };
  },
  mounted() {
    setTimeout(() => {
    localStorage.setItem('authenticated', 'false'); // Elimina la variable
    console.log('La variable authenticated ha sido eliminada.');
  }, 50000);
    this.getIncidentes();
  },
  methods: {
    getIncidentes() {
      this.cargando = true;
      axios.get('http://127.0.0.1:8000/api/v1/incidentes').then(res => {
        this.incidentes = res.data.data;
        this.cargando = false;
      });
    },
    eliminar(id) {
      confirmar(
        'http://127.0.0.1:8000/api/v1/incidentes/',
        id,
        'Eliminar Registro',
        'Realmente desea eliminar este incidente?',
        this.getincidentes
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
