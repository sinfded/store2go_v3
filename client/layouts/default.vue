<template>
  <v-app dark>
    <NotificationToast />
    <Nuxt />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
// import { Command } from '@tauri-apps/api/shell'
// import { listen } from '@tauri-apps/api/event'

@Component({})
export default class Default extends Vue {
  // created() {
  //   const runServer = new Command('run-server', ['./server.sh'])
  //   runServer.spawn().then((child) => {
  //     listen('WINDOW_DESTROYED', (e) => {
  //       child.kill()
  //     })
  //   })
  // }
}
</script>
