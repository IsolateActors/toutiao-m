<template>
  <div class="user-profile">
      <input type="file" hidden ref="file" accept="image/*" @change="onFileChange"/>
      <van-nav-bar
        title="个人消息"
        left-arrow
        @click-left="$router.back()"
        />

        <van-cell title="头像" is-link center @click="$refs.file.click()">
            <van-image
                width="30"
                height="30"
                round
                fit="cover"
                :src="user.photo"
            />
        </van-cell>
        <van-cell title="昵称" is-link :value="user.name" @click="isEditNameShow = true"/>
        <van-cell title="性别" is-link :value="user.gender === 0 ?'男':'女'" @click="isEditGenderShow = true"/>
        <van-cell title="生日" is-link :value="user.birthday" @click="isEditBirthdayShow = true"/>

        <van-popup v-model="isEditNameShow" position="bottom" :style="{ height: '100%' }">
            <!-- <update-name :name='user.name' @close='isEditNameShow = false'
            @update-name='user.name = $event'
            ></update-name> -->
            <update-name v-if="isEditNameShow" @close='isEditNameShow = false'
            v-model="user.name"
            ></update-name>
        </van-popup>

        <!-- 修改性别 -->
        <van-popup
        v-model="isEditGenderShow"
        position="bottom"
        >
        <update-gender
            v-model="user.gender"
            @close="isEditGenderShow = false"
        />
        </van-popup>

        <!-- 修改生日 -->
        <van-popup
        v-model="isEditBirthdayShow"
        position="bottom"
        >
        <update-birthday v-if="isEditBirthdayShow" v-model="user.birthday" @close='isEditBirthdayShow = false'></update-birthday>
        </van-popup>

        <!-- 修改头像 -->
        <van-popup
        v-model="isEditPhotoShow"
        position="bottom"
        style="height:100%"
        class="update-photo-popup"
        >
        <update-photo v-if="isEditPhotoShow" :file='previewImage' @close='isEditPhotoShow = false' @update-photo='user.photo = $event'></update-photo>
        </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '../../api/user'
import UpdateName from '../../components/user-profile/update-name.vue'
import UpdateGender from '../../components/user-profile/update-gender'
import UpdateBirthday from '../../components/user-profile/update-birthday'
import UpdatePhoto from '../../components/user-profile/update-photo'
export default {
  data () {
    return {
      user: {},
      isEditNameShow: false,
      isEditGenderShow: false,
      isEditBirthdayShow: false,
      isEditPhotoShow: false,

      previewImage: null
    }
  },
  methods: {
    async loadUserProfile () {
      const { data } = await getUserProfile()
      this.user = data.data
    },
    onFileChange () {
    //   const blol = window.URL.createObjectURL(this.$refs.file.files[0])

      console.log([this.$refs.file.files[0]])
      //   console.log(blol)

      const file = this.$refs.file.files[0]
      this.previewImage = file
      this.isEditPhotoShow = true

      this.$refs.file.value = ''
    }
  },
  created () {
    this.loadUserProfile()
  },
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
  }
}
</script>

<style lang="scss" scoped>
    .user-profile{
        ::v-deep .van-popup{
            background-color: #f5f7f9;
        }

        .update-photo-popup {
            background-color: #000 !important;
            }
    }

</style>
