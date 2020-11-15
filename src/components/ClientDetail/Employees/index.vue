<template>
  <div class="d-flex flex-column align-center">
    <p v-if="isErr">Error</p>
    <v-card v-else>
      <v-card-title>
        <v-text-field
          v-model="search"
          prepend-icon="mdi-magnify"
          label="Поиск"
          single-line
          hide-details
          clearable
        />
      </v-card-title>

      <v-data-table
        :headers="tableHeaders"
        :items="employees"
        item-key="id"
        :search="search"
        :loading="isLoad"
      >
        <template v-slot:no-data>Нет работников</template>
        <template v-slot:no-results>Нет таких работников</template>

        <template v-slot:item.id="{ item }">
          <v-btn color="red" dark @click="removeEmployee(item)">
            <v-icon dark> mdi-delete </v-icon>
          </v-btn>
        </template>
      </v-data-table>

      <template>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <div class="text-center pt-2">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Добавить работника
              </v-btn>
            </div>
          </template>
          <CreateEmployeeForm
            @create-employee="addNewEmployee"
            @close="dialog = false"
          />
        </v-dialog>
      </template>
    </v-card>
  </div>
</template>

<script>
import { GET_CLIENT_EMPLOYEES, REMOVE_EMPLOYEE } from "@/api";
import Axios from "axios";

import CreateEmployeeForm from "./CreateEmployeeForm";

export default {
  name: "client-details-employees",

  components: {
    CreateEmployeeForm,
  },

  data() {
    return {
      search: "",
      isLoad: true,
      isErr: false,
      dialog: false,
      employees: [],
      tableHeaders: [
        {
          text: "ФИО",
          value: "fio",
        },
        {
          text: "Должность",
          value: "rank",
        },
        {
          text: "email",
          value: "email",
        },
        {
          text: "Телефон",
          value: "phone",
        },
        {
          text: "",
          value: "id",
          sortable: false,
        },
      ],
    };
  },

  methods: {
    async getEmployees() {
      try {
        const { data: employees } = await Axios.get(GET_CLIENT_EMPLOYEES, {
          params: {
            id: this.$route.params.clientID,
          },
        });

        this.employees = employees;
      } catch {
        this.isErr = true;
      } finally {
        this.isLoad = false;
      }
    },

    async removeEmployee(item) {
      try {
        const { status } = await Axios.post(REMOVE_EMPLOYEE, {
          employeeId: item.id,
        });

        if (status === 200) {
          const itemIndex = this.employees.indexOf(item);

          this.employees.splice(itemIndex, 1);
        } else {
          throw new Error();
        }
      } catch {
        alert("Не удалось удалить реквизит");
      }
    },

    addNewEmployee() {
      this.getEmployees();
    },
  },

  created() {
    this.getEmployees();
  },
};
</script>
