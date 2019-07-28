<template>

    <div class="modal-card">
      <div class="modal-card-body">
        <header class="card-header">
          <p class="card-header-title">
            Contacto
          </p>
        </header>
        <div class="card-content">
          <b-notification
              v-if="capchaErr"
              @close="capchaErr=false"
              type="is-danger"
              aria-close-label="Close notification"
              role="alert"
              >
              <p v-for="(item, index) in error" :key="index">
                {{ item[0] }} 
              </p>
          </b-notification>
          <form v-on:submit.prevent="onSubmit">
            <b-field label="Name">
              <b-input 
                v-model="form.name"
                value="contact.name"
                placeholder="Nombre"
              />
            </b-field>

            <b-field label="Correo">
              <b-input type="email"
                  v-model="form.email"
                  value="contact.email"
                  placeholder="Correo"
                  maxlength="30"
                />
            </b-field>

            <b-field label="Mensaje">
              <b-input
                v-model="form.message"
                value="contact.email"
                placeholder="Mensaje"
                maxlength="200" 
                minlength="5" 
                type="textarea"
              />
            </b-field>

            <vue-recaptcha 
              sitekey="6Lcp668UAAAAAFaYhOk_oKzyEOlG7iGZfm4rwQbo" 
              :loadRecaptchaScript="true"
              ref="recaptcha"
              @verify="onVerify"
              @expired="onExpired">
            </vue-recaptcha>
            <button class="button" type="button" @click="$parent.close()">Cerrar</button>
            <button class="button is-success">Guardar</button>
          </form>
        </div>
      </div>
    </div>
   
</template>

<script>
  import VueRecaptcha from 'vue-recaptcha'
import { constants } from 'crypto';
  export default {
    props: ['contact'],
    components: {
      'vue-recaptcha': VueRecaptcha
    },
    data() {
      return {
        capchaErr: false,
        message: '',
        error: [],
        form: {
          email: 'asasas@asa',
          message: 'hahhahas'
         },
        token: false,
      }
    },
    mounted () {
      if(this._props.contact.length !== 0){
        this.form = this._props.contact[0]
      } 
    },
    methods: {
       onSubmit: function () {
        if(this.token){
          if(this._props.contact.length === 0){
            axios.post('/contacts', this.form)
              .then(resp => {
                this.$parent.close()
                this.$emit('updateTable')
              })
              .catch(err => {
                this.capchaErr = true
                this.error = err.response.data.errors
  
              })
          }else {
            axios.put(`/contacts/${this.form.id}`, this.form)
              .then(resp => {
                this.$parent.close()
                this.$emit('updateTable')
              })
              .catch(err => {
                console.log('err', err)
              })
          }
        }else {
          this.capchaErr = true
          this.error = { recaptcha: ['ReCaptcha requerido.'] }
        }
      },
      onVerify: function(token) {
        this.token = token
        this.capchaErr = false
      },
      onExpired: function () {
        this.error = { recaptcha: ['Ha expirado tu ReCaptcha'] }
      },
    }
  }
</script>
