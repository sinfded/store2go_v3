<template>
  <v-container fluid class="fill-height primary">
    <v-row class="fill-height" justify="center" align="center" no-gutters>
      <v-col cols="12" sm="6" md="3">
        <v-card height="50%" min-width="350" rounded="xl" class="pa-3">
          <v-card-title>
            <v-sheet
              width="100%"
              class="d-flex flex-column justify-center align-center mb-3 mt-4"
            >
              <span
                class="primary--text d-flex text-center text-h4 font-weight-bold"
                >Welcome</span
              >
              <span class="text-subtitle-2 mt-n1 grey--text text--darken-1"
                >Sign in to continue</span
              >
            </v-sheet>
          </v-card-title>
          <v-card-text>
            <v-form
              @submit.prevent="signIn"
              ref="loginForm"
              v-model="valid"
              lazy-validation
            >
              <v-text-field
                v-model="username"
                :rules="usernameRules"
                label="Username"
                color="primary"
                dense
                outlined
                required
                autofocus
                class="rounded-lg"
              >
              </v-text-field>
              <v-text-field
                v-model="password"
                :rules="passwordRules"
                label="Password"
                color="primary"
                dense
                outlined
                required
                type="password"
                class="rounded-lg"
              >
              </v-text-field>
              <v-btn
                color="primary"
                dark
                block
                large
                class="text-capitalize rounded-lg mt-2"
                type="submit"
              >
                Sign In
              </v-btn>
            </v-form>
            <!-- <v-sheet width="100%" class="d-flex justify-center mt-8">
                <span class="grey--text text--darken-3"
                  >Don't have an account?</span
                ><span class="font-weight-medium">Sign up</span>
              </v-sheet> -->
            <v-row justify="center" class="my-4">
              <span>OR</span>
            </v-row>
            <v-row justify="center" class="my-4 px-3">
              <v-btn
                to="signup"
                block
                large
                depressed
                class="text-capitalize rounded-lg mb-4"
                >Sign Up
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
export default class Index extends Vue {
  usernameRules = [(v: string) => !!v || 'Username is required']
  passwordRules = [(v: string) => !!v || 'Password is required']
  storeIdRules = [(v: string) => !!v || 'Store ID is required']
  valid = true

  username = ''
  password = ''

  signIn() {
    this.$auth.signIn(this.username, this.password)
  }
}
</script>
