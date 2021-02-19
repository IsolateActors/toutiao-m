<template>
    <div class="user-chat">
        <van-nav-bar
            class="app-nav-bar"
            title="小智同学"
            left-arrow
            @click-left="onClose"
            />
            <!-- /导航栏 -->

            <!-- 消息列表 -->
            <van-cell-group class="message-list" ref="message-list">
            <van-cell :title="item.msg" v-for="(item,index) in messages" :key="index"/>
            </van-cell-group>
            <!-- /消息列表 -->

            <!-- 发送消息 -->
            <van-cell-group class="send-message-wrap">
            <van-field
                v-model="message"
                placeholder="请输入消息"
                :border="false"
                @blur="onSend"
            />
            <van-button type="primary" size="small" @click="onSend">发送</van-button>
            </van-cell-group>
            <!-- /发送消息 -->
    </div>
</template>

<script>
import socketio from 'socket.io-client'
import { getItem, setItem } from '../../utils/storage'
export default {
  data () {
    return {
      message: '',
      socket: null,
      messages: getItem('chat-message') || []
    }
  },
  watch: {
    messages () {
      setItem('chat-message', this.messages)

      this.$nextTick(() => {
        this.scrollToBottom()
      })
    }
  },

  created () {
    const socket = socketio('http://ttapi.research.itcast.cn/')

    this.socket = socket

    socket.on('connect', () => {
      console.log('连接成功了')
    })

    socket.on('disconnect', () => {
      console.log('断开连接了')
    })

    socket.on('message', data => {
      this.messages.push(data)
    })
  },
  mounted () {
    this.scrollToBottom()
  },
  methods: {
    onSend () {
      const data = {
        msg: this.message,
        timestamp: Date.now()
      }
      console.log(data)
      this.socket.emit('message', data)
      this.messages.push(data)
      console.log(this.messages)
      this.message = ''
    },

    scrollToBottom () {
      const list = this.$refs['message-list']
      this.$nextTick(() => {
        list.scrollTop = list.scrollHeight
      })
    },

    onClose () {
      this.$router.back()
      this.socket.emit('disconnect')
    }
  }

}
</script>

<style lang="scss" scoped>
    .user-chat{
        .message-list{
            position: fixed;
            left: 0;
            right: 0;
            top: 46px;
            bottom: 44px;
            overflow-y: auto;
        }

        .send-message-wrap{
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            padding: 0 14px;
            display: flex;
            align-items: center;
        }

        ::v-deep .van-button{
            min-width: 50px;
        }
    }
</style>
