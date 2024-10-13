<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-lg-12">
        <div class="table-responsive">
          <br />
          <table class="table table-bordered table-striped table-hover">
            <thead class="table-dark">
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>SEXO</th>
                <th>RAZA</th>
                <th>PROPÓSITO</th>
                <th>TIPO</th>
                <th>FOTO</th>
                <th>FINCA_ID</th>
                <th>HIERRO_ID</th>
                <th>REGISTRO</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody class="table-group-divider" id="contenido">
              <tr v-if="cargando">
                <td colspan="11">
                  <h3 class="text-center">Cargando...</h3>
                </td>
              </tr>
              <tr v-else v-for="(gan, i) in ganados" :key="gan.id">
                <td v-text="(i+1)"></td>
                <td v-text="gan.id"></td>
                <td>
                  {{ gan.sexo === 1 ? 'Macho' : 'Hembra' }}
                </td>
                <td v-text="gan.raza"></td>
                <td>
                  {{ gan.proposito === 1 ? 'Carne' : gan.proposito === 2 ? 'Leche' : gan.proposito === 3 ? 'Doble Propósito' : 'Desconocido' }}
                </td>
                <td>
                  {{ gan.tipo === 1 ? 'Novillo' : gan.tipo === 2 ? 'Novillo de Levante' : gan.tipo === 3 ? 'Ternero' : 'Desconocido' }}
                </td>
                <td>
              <img v-if="gan.foto" style="width: 150px !important;" :src="gan.foto" class="img-thumbnail" alt="">
              <img v-else style="width: 150px !important;" src="https://cdn0.iconfinder.com/data/icons/isometric-farm-animals/320/cow-01-256.png">
            </td>
                <td v-text="gan.finca_id"></td>
                <td v-text="gan.hierro_id"></td>
                <td v-text="new Date(gan.created_at).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                })"></td>
                <td class="text-center align-middle">
                  <div class="d-flex justify-content-center align-items-center">
                    <router-link :to="{ path: 'viewG/'+ gan.id }" class="btn btn-info btn-sm rounded-circle mx-1">
                      <i class="fa-solid fa-eye"></i>
                    </router-link>
                    <router-link :to="{ path: 'editG/' + gan.id }" class="btn btn-warning btn-sm rounded-circle mx-1">
                      <i class="fa-solid fa-edit"></i>
                    </router-link>
                    <button class="btn btn-danger btn-sm rounded-circle mx-1" v-on:click="eliminar(gan.id)">
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
      ganados: null,
      cargando: false
    };
  },
  mounted() {
    setTimeout(() => {
    localStorage.setItem('authenticated', 'false'); // Elimina la variable
    console.log('La variable authenticated ha sido eliminada.');
  }, 50000);
    this.getGanados();
  },
  methods: {
    getGanados() {
      this.cargando = true;
      axios.get('http://127.0.0.1:8000/api/v1/ganados').then(res => {
        this.ganados = res.data.data;
        this.cargando = false;
      });
    },
    eliminar(id) {
      confirmar(
        'http://127.0.0.1:8000/api/v1/ganados/',
        id,
        'Eliminar Registro',
        'Realmente desea eliminar este ganado?',
        this.getGanados
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
