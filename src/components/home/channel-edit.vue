<template>
    <div class="channel-edit">
        <van-nav-bar
            title="频道编辑"
            />
        <van-cell center :border='false'>
            <template #title>
                <span class="channel-title">我的频道</span>
                <span class="channel-tip">点击进入频道</span>
            </template>
            <van-button style="min-width:'50px'" @click="isEdit = !isEdit" size='mini' round plain type="danger"> {{isEdit?'完成':'编辑'}} </van-button>
        </van-cell>

        <van-grid :gutter="10">
            <van-grid-item @click="switchChannel(index)" v-for="(channelItem,index) in userChannels" :key="index" class="gird-item"
            :class="{'active': index === active}"
            :text="channelItem.name">
              <template #icon>
                <van-icon @click="deleteChannel(channelItem,index)" v-if="isEdit&&index !== 0" name="close" />
              </template>
            </van-grid-item>
        </van-grid>

        <van-cell center :border='false'>
            <template #title>
                <span class="channel-title">频道推荐</span>
                <span class="channel-tip">点击添加频道</span>
            </template>
        </van-cell>

        <van-grid :gutter="10">
            <van-grid-item v-for="(recommendChannelitem,indexAll) in recommendChannels" :key="indexAll+'all'" class="gird-item" :text="recommendChannelitem.name" @click="onAdd(recommendChannelitem)"/>
        </van-grid>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { setItem } from '../../utils/storage'
import { getAllChannels, addUserChannels, deleteUserChannels } from '../../api/channel'
export default {
  props: {
    userChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannels: [],
      isEdit: false
    }
  },
  computed: {
    recommendChannels () {
      return this.allChannels.filter(channel => {
        return !this.userChannels.find(userChannel => {
          return userChannel.id === channel.id
        })
      })
    },
    ...mapState(['user'])
  },
  methods: {
    async loadAllChannels () {
      const { data } = await getAllChannels()
      console.log(data)
      this.allChannels = data.data.channels
    },
    async onAdd (channel) {
      this.userChannels.push(channel)
      if (this.user) {
        await addUserChannels({
          channels: [
            {
              id: channel.id,
              seq: this.userChannels.length
            }
          ]
        })
      } else {
        setItem('user-channels', this.userChannels)
      }
    },
    async deleteChannel (channel, index) {
      if (index <= this.active) {
        this.$emit('update-active', this.active - 1)
      }
      this.userChannels.splice(index, 1)

      if (this.user) {
        console.log('删除频道')
        await deleteUserChannels(channel.id)
      } else {
        setItem('user-channels', this.userChannels)
      }
    },
    switchChannel (index) {
      if (this.isEdit) {
        return
      }
      console.log('切换频道')
      this.$emit('update-active', index)
      this.$emit('close', index)
    }

  },
  created () {
    this.loadAllChannels()
  }
}
</script>

<style lang="scss" scoped>
 .channel-edit{
     ::v-deep .van-nav-bar{
         background-color: #fff !important;
     }
     ::v-deep .van-nav-bar__title{
         color: #323233;
     }
     ::v-deep .van-button--mini{
         min-width: 50px;
     }

     .channel-title{
        font-size: 16px;
        color: #333333;
     }
     .channel-tip{
         font-size: 11px;
         padding-left: 10px;
         color: #ccc;
     }

     .gird-item{
         width: 80px;
         height: 43px;

         ::v-deep .van-grid-item__content{
             background-color: #f4f5f6;
             .van-grid-item__text{
                 font-size: 14px;
                 color: #222;
                 margin-top: 0;
             }
         }
     }

     ::v-deep .van-grid-item__icon-wrapper{
       position: static;

       .van-icon-close{
         position: absolute;
         right: -5px;
         top: -5px;
         font-size: 15px;
         color: #ccc;
        }
     }

     .active{
       ::v-deep .van-grid-item__text{
         color: red !important;
       }

     }
 }
</style>
