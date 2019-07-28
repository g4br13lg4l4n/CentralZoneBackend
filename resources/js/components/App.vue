<template>
    <section class="section">
      <div class="container">
        <div class="columns is-vcentered is-centered">
          <div class="column is-8">
            
            <button class="button field is-info" 
              @click="modalCreate = true"
              :disabled="checkedRows.length > 0">
              <b-icon icon="upload"></b-icon>
              <span>Agregar</span>
            </button>

            <button class="button field is-success" 
              @click="update()"
              :disabled="checkedRows.length !== 1">
              <span>Actualizar</span>
            </button>

            <button class="button field is-danger" 
              @click="_delete()"
              :disabled="!checkedRows.length">
              <span>Eliminar</span>
            </button>

            <b-tabs>
              <b-tab-item label="Table">
                  <b-table
                    :data="contacts"
                    :columns="columns"
                    :checked-rows.sync="checkedRows"
                    checkable>
                  </b-table>
              </b-tab-item>
            </b-tabs>

            <b-modal :active.sync="modalCreate" has-modal-card>
              <Form v-bind:contact="checkedRows" v-on:updateTable="updateTable"/>
            </b-modal>

          </div>
        </div>
      </div>
    </section>
</template>

<script>
import Form from './Form' 
import { constants } from 'crypto';
  export default {
    components: { 
      Form
    },
    data() {
      return {
        modalCreate: false,
        contacts: [],
        checkedRows: [],
        columns: [{
                    field: 'name',
                    label: 'Nombre',
                  },
                  {
                    field: 'email',
                    label: 'Correo',
                  },
                  {
                    field: 'message',
                    label: 'Mensaje'
                  }]
      }
    },
    beforeMount() {
      this.getContacts()
    },
    methods: {
      updateTable: function () {
        this.getContacts()
      },
      update: function () {
        this.modalCreate = true
      },
      _delete: function () {
        if(this.checkedRows.length >= 1) {
          this.checkedRows.map(i => {
            axios.delete(`contacts/${i.id}`)
            .then(resp => {
              this.getContacts()
              this.checkedRows = []
            })
            .catch(err => {
              cosnole.log(err)
            })
          })
        }
      },
      getContacts: function () {
        axios.get('contacts')
        .then(resp => {
          this.contacts = resp.data.data
          this.checkedRows = []
        })
        .catch( err => {
          console.log(err)
        })
      }
    }
  }
</script>
