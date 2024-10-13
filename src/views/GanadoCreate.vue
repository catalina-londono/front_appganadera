<template>
  <div class="row mt-5">
    <div class="col-md-6 offset-md-3">
      <div class="card">
        <div class="card-header bg-dark text-white text-center">
          Registrar Ganados
        </div>
        <div class="card-body">
          <form v-on:submit="guardar">
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
              <img v-else height="100" src="https://cdn0.iconfinder.com/data/icons/isometric-farm-animals/320/cow-01-256.png" id="contenidoimg" class="img-thumbnail" alt=""> 
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
      sexo: '',
      raza: '',
      proposito: '',
      tipo: '',
      foto: '', // Cambia a cadena vacía para que sea más fácil validar
      finca_id: '',
      hierro_id: '',
      url: 'http://127.0.0.1:8000/api/v1/ganados',
      cargando: false,
    };
  },
  methods: {
    guardar(event) {
      event.preventDefault();

      if (this.sexo.trim() === '') {
        mostrarAlerta('Ingrese el sexo del ganado', 'warning', 'sexo');
      } else if (this.raza.trim() === '') {
        mostrarAlerta('Ingrese la raza', 'warning', 'raza');
      } else if (this.proposito.trim() === '') {
        mostrarAlerta('Ingrese el proposito', 'warning', 'proposito');
      } else if (this.tipo.trim() === '') {
        mostrarAlerta('Ingrese el tipo', 'warning', 'tipo');
      } else if (this.foto.trim() === '') {
        mostrarAlerta('Ingrese la foto', 'warning', 'foto');
      } else if (this.finca_id.trim() === '') {
        mostrarAlerta('Ingrese el finca_id', 'warning', 'finca_id');
      } else if (this.hierro_id.trim() === '') {
        mostrarAlerta('Ingrese el hierro_id', 'warning', 'hierro_id');
      } else {
        const parametros = {
          sexo: this.sexo.trim(),
          raza: this.raza.trim(),
          proposito: this.proposito.trim(),
          tipo: this.tipo.trim(),
          foto: this.foto.trim(),
          finca_id: this.finca_id.trim(),
          hierro_id: this.hierro_id.trim(),
        };

        enviarSolicitud('POST', parametros, this.url, 'Ganado registrado con éxito!!!');
      }
    },
    previsualizarfoto(event) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);

      reader.onload = () => {
        this.foto = reader.result; // Asignar la URL de la imagen a la propiedad foto
      };
    }
  }
};
</script>
