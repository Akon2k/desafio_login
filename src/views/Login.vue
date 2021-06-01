<template>
  <div class="container mt-5" style="width: 400px">
    <h1>Log-In</h1>
    <b-form @submit="onSubmit">
      <b-form-group label="Correo" style="text-align: initial">
        <b-form-input
          id="inp_mail"
          v-model="form.mail"
          type="mail"
          placeholder="Ingrese correo electrónico"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group class="mt-4" label="Contraseña" style="text-align: initial">
        <b-form-input
          type="password"
          id="inp_pass"
          v-model="form.contraseña"
          required
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" :disabled="loading" variant="primary"
        >Iniciar sesión</b-button
      >
    </b-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      form: {
        mail: "",
        contraseña: "",
      },
      loading: false,
    };
  },
  methods: {
    ...mapActions(["autenticarUsuario"]),
    async onSubmit(event) {
      event.preventDefault();
      this.loading = true;
      const success = await this.autenticarUsuario({
        mail: this.form.mail,
        contraseña: this.form.contraseña,
      });
      this.loading = false;
      if (success) {
        this.$router.push({ name: "Home" });
      }
    },
  },
};
</script>
