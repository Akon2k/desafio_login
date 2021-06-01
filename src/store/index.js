import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from "../../firebase";

firebase.initializeApp(firebaseConfig);

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    logeado: false,
    Usuario: null,
  },

  mutations: {
    setUsuario(state, Usuario) {
      state.Usuario = { ...Usuario };
      state.logeado = true;
    },

    cerrarSesion(state) {
      state.Usuario = null;
      state.logeado = false;
    },
  },

  getters: {
    logeado: (state) => state.logeado,
  },

  actions: {
    async autenticarUsuario(context, payload) {
      try {
        const { mail, contraseña } = payload;
        const auth = firebase.auth();
        const userCredential = await auth.signInWithEmailAndPassword(
          mail,
          contraseña
        );
        context.commit("setUsuario", userCredential);
        return true;
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`Error en autenticación: ${errorCode}, ${errorMessage}`);
        return false;
      }
    },

    async cerrarSesion(context) {
      try {
        const auth = firebase.auth();
        await auth.signOut();
        context.commit("cerrarSesion");
        return true;
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`Error cerrando sesión: ${errorCode}, ${errorMessage}`);
        return false;
      }
    },
  },
});
