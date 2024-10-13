<template>
  <div class="row mt-5">
    <div class="col-md-10 offset-md-1">
      <div class="card">
        <div class="card-header bg-dark text-white text-center">
          Editar Ganado
        </div>
        <div class="card-body">
          <form v-on:submit="actualizar">
            <div class="input-group mb-3">
              <span class="input-group-text"><i class="fa-solid fa-heading"></i></span>
              <input type="text" v-model="sexo" id="sexo" placeholder="Ingrese el sexo del ganado" maxlength="100" class="form-control">
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text"><i class="fa-solid fa-heading"></i></span>
              <input type="text" v-model="raza" id="raza" placeholder="Ingrese la raza del ganado" maxlength="100" class="form-control">                
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text"><i class="fa-solid fa-heading"></i></span>
              <input type="text" v-model="proposito" id="proposito" placeholder="Ingrese el proposito del ganado" maxlength="100" class="form-control">                
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text"><i class="fa-solid fa-heading"></i></span>
              <input type="text" v-model="tipo" id="tipo" placeholder="Ingrese el tipo del ganado" maxlength="100" class="form-control">                
            </div>
            <div class="d-grid col-6 mx-auto mb-3">
              <img v-if="foto" height="100" :src="foto" id="fotoimg" class="img-thumbnail" alt="">
              <img v-else height="100" src="https://cdn0.iconfinder.com/data/icons/isometric-farm-animals/320/cow-01-256.png" id="fotoimg" class="img-thumbnail" alt=""> 
            </div>
            <div>
              <span class="input-group-text"><i class="fa-solid fa-photo-film"></i></span>
              <input v-on:change="previsualizarfoto" type="file" accept="image/png, image/gif, image/jpeg" class="form-control">
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text"><i class="fa-solid fa-heading"></i></span>
              <input type="text" v-model="finca_id" id="finca_id" placeholder="Ingrese la finca donde se ubica el ganado" maxlength="100" class="form-control">                
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text"><i class="fa-solid fa-heading"></i></span>
              <input type="text" v-model="hierro_id" id="hierro_id" placeholder="Ingrese el hierro con el que fue marcado el ganado" maxlength="100" class="form-control">                
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
      axios.get(this.url).then(res => {
        this.sexo = res.data.data.sexo;
        this.raza = res.data.data.raza;
        this.proposito = res.data.data.proposito;
        this.tipo = res.data.data.tipo;
        this.finca_id = res.data.data.finca_id;
        this.hierro_id = res.data.data.hierro_id;
        this.foto = res.data.data.foto;
      }).catch(error => {
        console.error("Error al obtener los ganados:", error);
      });
    },
    actualizar(event){
      event.preventDefault();
      var mifoto = document.getElementById('fotoimg');
      this.foto = mifoto.src;

      if (this.sexo === '') {
          mostrarAlerta('Ingrese el sexo del ganado', 'warning', 'sexo');
      } else if (this.raza.trim() === '') {
          mostrarAlerta('Ingrese la raza', 'warning', 'raza');
      } else if (this.proposito === '') {
          mostrarAlerta('Ingrese el propósito', 'warning', 'proposito');
      } else if (this.tipo === '') {
          mostrarAlerta('Ingrese el tipo', 'warning', 'tipo');
      } else if (this.finca_id === '') {
          mostrarAlerta('Ingrese el finca_id', 'warning', 'finca_id');
      } else if (this.hierro_id === '') {
          mostrarAlerta('Ingrese el hierro_id', 'warning', 'hierro_id');
      } else {
          const parametros = {
            sexo: this.sexo,
            raza: this.raza.trim(),
            proposito: this.proposito,
            tipo: this.tipo,
            finca_id: this.finca_id,
            hierro_id: this.hierro_id,
            foto: this.foto
          };

          confirmarActualizacion(this.url, this.id, 'Confirmar Actualización', '¿Está seguro que desea actualizar este ganado?', parametros, () => {
            this.getGanados();
          });
      }
    },
    previsualizarfoto(event) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        var mifoto = document.getElementById('fotoimg');
        mifoto.src = reader.result;
        this.foto = reader.result;
      };
    }
  }
};
</script>
