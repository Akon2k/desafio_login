<template>
  <div class="container mt-5">
    <div style="text-align: end">
      <b-button @click="onLogout" type="button" :disabled="loading"
        >Cerrar sesión</b-button
      >
    </div>
    <div class="mt-5">
      <h1>Usted a ingresado :)</h1>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    ...mapActions(["cerrarSesion"]),
    async onLogout() {
      this.loading = true;
      const success = await this.cerrarSesion();
      this.loading = false;
      if (success) this.$router.push({ name: "Login" });
    },
  },
};
</script>
