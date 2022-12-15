<template>
  <v-container fluid class="fill-height primary">
    <v-row class="fill-height" justify="center" align="center" no-gutters>
      <v-col cols="12" class="d-flex justify-center">
        <v-card
          height="50%"
          width="70%"
          min-width="350"
          rounded="xl"
          class="pa-3"
        >
          <v-card-title>
            <v-sheet
              width="100%"
              class="d-flex flex-column justify-center align-center mb-3 mt-4"
            >
              <span
                class="primary--text d-flex text-center text-h4 font-weight-bold"
                >Create Account</span
              >
              <span class="text-subtitle-2 mt-n1 grey--text text--darken-1"
                >Fill up the required fields.</span
              >
            </v-sheet>
          </v-card-title>
          <v-card-text>
            <v-form
              @submit.prevent="signUp"
              ref="loginForm"
              v-model="valid"
              lazy-validation
            >
              <v-row no-gutters>
                <v-col cols="6" class="pr-2">
                  <v-text-field
                    v-model="userData.firstName"
                    :rules="required"
                    label="First name"
                    color="primary"
                    dense
                    outlined
                    required
                    autocomplete="off"
                    class="rounded-lg"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="6" class="pl-2">
                  <v-text-field
                    v-model="userData.lastName"
                    :rules="required"
                    label="Last name"
                    color="primary"
                    dense
                    outlined
                    required
                    autocomplete="off"
                    class="rounded-lg"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="5" class="pr-2">
                  <v-text-field
                    v-model="userData.username"
                    :rules="usernameRules"
                    label="Username"
                    color="primary"
                    dense
                    outlined
                    required
                    autocomplete="off"
                    class="rounded-lg"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="7" class="pl-2">
                  <v-text-field
                    v-model="userData.email"
                    :rules="emailRules"
                    label="Email"
                    color="primary"
                    dense
                    outlined
                    required
                    autocomplete="off"
                    class="rounded-lg"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="6" class="pr-2">
                  <v-text-field
                    v-model="userData.password"
                    :rules="passwordRules"
                    label="Password"
                    color="primary"
                    dense
                    outlined
                    required
                    autocomplete="off"
                    type="password"
                    class="rounded-lg"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="6" class="pl-2">
                  <v-text-field
                    v-model="confirmPassword"
                    :rules="confirmPassRules"
                    label="Confirm password"
                    color="primary"
                    dense
                    outlined
                    required
                    autocomplete="off"
                    type="password"
                    class="rounded-lg"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-btn
                color="primary"
                dark
                block
                large
                class="text-capitalize rounded-lg mt-2"
                type="submit"
              >
                Sign Up
              </v-btn>
            </v-form>
            <v-row justify="center" class="my-4">
              <span>OR</span>
            </v-row>
            <v-row justify="center" class="my-4 px-3">
              <v-btn
                to="/"
                block
                large
                depressed
                class="text-capitalize rounded-lg mb-4"
                >Sign In
              </v-btn>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({})
export default class SignUp extends Vue {
  usernameRules = [(v: string) => !!v || 'Username is required']
  emailRules = [(v: string) => !!v || 'Email is required']
  passwordRules = [(v: string) => !!v || 'Password is required']
  confirmPassRules = [
    ...this.passwordRules,
    (v: string) =>
      v !== this.userData.password ? "Password don't match." : '',
  ]
  storeIdRules = [(v: string) => !!v || 'Store ID is required']
  required = [(v: string) => !!v || `This is required`]
  valid = true

  username = ''
  password = ''
  confirmPassword = ''

  userData: any = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    get displayName() {
      return `${this.firstName} ${this.lastName}`
    },
  }

  signUp() {
    this.$auth.signUp(this.userData)
  }

  mounted() {
    // let userData = {
    //   username: 'test11',
    //   email: 'test@test.com',
    //   displayName: 'Test User',
    //   password: 'testuser11',
    // }
    console.log(this.userData)
  }
}
</script>
