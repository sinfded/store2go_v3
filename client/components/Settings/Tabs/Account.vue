<template>
  <v-sheet width="100%" height="100%" color="transparent">
    <v-row no-gutters justify="space-between" align="center">
      <span
        class="font-weight-bold text-h6"
        :class="[$vuetify.theme.dark ? '' : 'grey--text text--darken-2']"
        >Account</span
      >
      <div>
        <v-btn @click="disabled = !disabled" icon :height="36" :width="36">
          <v-icon>mdi-pencil-outline</v-icon>
        </v-btn>

        <v-btn icon :height="36" :width="36">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </div>
    </v-row>
    <v-sheet
      width="100%"
      height="100%"
      color="transparent"
      class="overflow-auto"
    >
      <div class="mt-3">
        <v-row no-gutters>
          <v-col cols="12" sm="8">
            <span class="text-subtitle-2">General Information</span>
            <v-form class="mt-3">
              <v-row no-gutters>
                <v-col cols="12" class="mb-4">
                  <v-text-field
                    v-model="userData.uid"
                    label="User ID"
                    color="primary"
                    dense
                    outlined
                    hide-details
                    disabled
                    class="rounded-lg"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" class="mb-4">
                  <v-text-field
                    v-model="userData.displayName"
                    label="Full name"
                    color="primary"
                    dense
                    outlined
                    hide-details
                    :disabled="disabled"
                    class="rounded-lg"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="7" class="pr-2">
                  <v-text-field
                    v-model="userData.email"
                    label="Email"
                    color="primary"
                    dense
                    outlined
                    hide-details
                    :disabled="disabled"
                    class="rounded-lg"
                  >
                  </v-text-field>
                </v-col>

                <v-col cols="5" class="pl-2">
                  <v-text-field
                    v-model="userData.username"
                    label="Username"
                    color="primary"
                    dense
                    outlined
                    hide-details
                    :disabled="disabled"
                    class="rounded-lg"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
          <v-col
            cols="12"
            sm="4"
            class="d-flex flex-column justify-center align-center"
          >
            <span class="text-subtitle-2 align-self-start mb-3"
              >Profile Picture</span
            >
            <v-sheet
              width="152"
              height="152"
              rounded="circle"
              class="d-flex justify-center align-center"
              style="position: relative"
              :color="disabled ? 'grey' : 'primary'"
            >
              <v-avatar color="grey" size="146" class="mx-auto">
                <v-img
                  :src="profilePic"
                  max-height="146"
                  max-width="146"
                ></v-img>
              </v-avatar>
              <v-btn
                fab
                absolute
                color="primary"
                :height="40"
                :width="40"
                style="bottom: -5px; right: 20px"
                @click="showUploader"
              >
                <v-icon size="22">mdi-brush</v-icon>
              </v-btn>
              <v-file-input
                v-model="images"
                ref="uploadInput"
                v-show="false"
                accep
                @change="selectImage"
              />
            </v-sheet>
          </v-col>
        </v-row>
      </div>
      <div class="mt-4">
        <span class="text-subtitle-2">Business Information</span>
        <v-form>
          <v-row no-gutters>
            <v-col cols="7" class="pr-2 mb-4 mt-3">
              <v-text-field
                v-model="storeData.name"
                label="Store name"
                color="primary"
                dense
                outlined
                hide-details
                :disabled="disabled"
                class="rounded-lg"
              >
              </v-text-field>
            </v-col>
            <v-col cols="5" class="pl-2 mb-4 mt-3">
              <v-text-field
                v-model="storeData.tin"
                label="TIN"
                color="primary"
                dense
                outlined
                hide-details
                :disabled="disabled"
                class="rounded-lg"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" class="mb-4">
              <v-textarea
                v-model="storeData.address"
                label="Full Address"
                color="primary"
                dense
                outlined
                hide-details
                :disabled="disabled"
                no-resize
                rows="3"
                class="rounded-lg"
              >
              </v-textarea>
            </v-col>
          </v-row>
        </v-form>
      </div>
    </v-sheet>
  </v-sheet>
</template>

<script lang="ts">
import { AceBaseUser } from 'acebase-client'
import { Component, Vue } from 'nuxt-property-decorator'

@Component({})
export default class AccountTab extends Vue {
  userData: any = {}
  storeData: NotWellDefinedObject = {
    name: '',
    address: '',
    tin: '',
  }
  disabled = true
  showPass = false
  images: NotWellDefinedObject[] = []
  profilePic = ''

  showUploader() {
    const uploadInput = (this.$refs.uploadInput as any).$refs
      .input as HTMLInputElement
    uploadInput.click()
  }

  async selectImage(file: File) {
    const { imageUrl } = await this.$settings.uploadProfilePic(
      file,
      this.userData.uid
    )
    this.profilePic = imageUrl
  }

  created() {
    this.userData = this.$auth.currentUser
    this.profilePic = `http://localhost:8000/${
      this.$auth.currentUser?.settings.profilePic as string
    }`
  }
}
</script>
