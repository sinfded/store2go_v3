<template>
  <v-app dark>
    <NotificationToast />
    <v-row no-gutters>
      <v-navigation-drawer
        color="primary "
        dark
        v-model="drawer"
        absolute
        :permanent="sideBar"
        :mini-variant="mini"
      >
        <v-sheet
          v-if="$vuetify.breakpoint.smAndUp"
          width="56"
          height="64"
          color="transparent"
          class="d-flex justify-center align-center"
        >
          <v-icon size="40">mdi-fire-circle</v-icon>
        </v-sheet>
        <v-sheet
          v-else
          width="100%"
          height="56"
          class="d-flex justify-center align-center px-2"
          color="transparent"
        >
          <v-sheet
            width="100%"
            height="40"
            class="d-flex justify-center align-center"
            color="primary lighten-1 rounded"
          >
            <v-icon size="32" class="mr-2">mdi-fire-circle</v-icon>
            <span class="text-h4 font-weight-bold">LOGO</span>
          </v-sheet>
        </v-sheet>

        <SideBar />
        <template v-slot:append>
          <v-list nav dense>
            <v-list-item @click="$vuetify.theme.dark = !$vuetify.theme.dark">
              <v-list-item-icon>
                <v-icon v-if="$vuetify.theme.dark == false"
                  >mdi-brightness-2</v-icon
                >
                <v-icon v-else>mdi-brightness-7</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title
                  >{{
                    $vuetify.theme.dark == true ? 'Light' : 'Dark'
                  }}
                  Mode</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
            <v-list-item link to="settings">
              <v-list-item-icon>
                <v-icon>mdi-cog</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Settings</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </template>
      </v-navigation-drawer>
      <v-main
        :class="[sideBar ? 'ml-14' : 'ml-0']"
        style="width: calc(100vw - 56px)"
      >
        <AppBar class="mt-2 mx-4" v-on:clickNavIcon="onClickNavIcon" />
        <v-container fluid class="pa-4 ma-0" style="height: calc(100vh - 64px)">
          <Nuxt />
        </v-container>
      </v-main>
    </v-row>
  </v-app>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'

@Component({})
export default class Main extends Vue {
  drawer = true

  get sideBar() {
    let sidebar_stat = false
    if (this.$vuetify.breakpoint.smAndDown) sidebar_stat = false
    else sidebar_stat = true
    return sidebar_stat
  }

  get mini() {
    let expand = false
    if (this.$vuetify.breakpoint.smAndDown) expand = false
    else expand = true
    return expand
  }

  onClickNavIcon() {
    this.drawer = !this.drawer
  }
}
</script>
