<template>
  <div class="my-container">
    <van-cell-group class="my-info">
      <van-cell class="base-info" :border='false' center >
        <!-- 使用 title 插槽来自定义标题 -->
        <template #icon>
          <van-image
            class="avatar"
            round
            fit="cover"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          />
        </template>
        <template #title>
          <div class="name">昵称</div>
        </template>

        <template #right-icon>
          <van-button class="update-btn" round plain type="info" size='small'>编辑资料</van-button>
        </template>
      </van-cell>

      <van-grid class="data-info" :border="false" :column-num="4">
        <van-grid-item class="data-info-item">
          <div class="text-wrap">
            <div class="count">123</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-wrap">
            <div class="count">123</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-wrap">
            <div class="count">123</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-wrap">
            <div class="count">123</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>

    <div class="not-login">
      <!-- <div>
        <img src="./手机.png" alt="">
        <div class="text">登录 / 注册</div>
      </div> -->

      <van-grid class="nav-grid" :border="false" :column-num="2">
        <van-grid-item class="nav-grid-item" text='收藏'>
          <template #icon>
            <van-icon name="star-o" color="#eb5253" size="22" />
          </template>
        </van-grid-item>

        <van-grid-item class="nav-grid-item" text='历史'>
          <template #icon>
            <van-icon name="browsing-history-o" color="#ff9d1d" size="22" />
          </template>
        </van-grid-item>

      </van-grid>
    </div>

    <van-cell title="消息通知" is-link to='/' />
    <van-cell title="小智同学" is-link to='/' />
    <van-cell title="退出登录" is-link />
  </div>
</template>

<script>
export default {

}
</script>

<style lang="sass">

</style>

<style lang="scss" scoped>
.my-container{
  .my-info{
    background: url('./banner.png') no-repeat;
    background-size: cover;

    .base-info{
      box-sizing: border-box;
      height: 115px;
      padding-top: 38px;
      padding-bottom: 11px;
      background-color: unset;

      .avatar{
        box-sizing: border-box;
        width: 66px;
        height: 66px;
        border: 1px solid #fff;
        margin-right: 11px;
      }

      .name{
        font-size: 15px;
        color: #fff;
      }

      .update-btn{
        height: 16px;
        font-size: 10px;
        color: #666666;
      }
    }

    .data-info{
      .data-info-item{
        height: 65px;
        color: #fff;
        .text-wrap{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .count{
            font-size: 18px;
          }
          .text{
            font-size: 11px;
          }
        }
      }
    }

    ::v-deep .van-grid-item__content {
      background-color: unset;
    }

  }

  ::v-deep .nav-grid{
      .nav-grid-item{
        height: 70px;

         .van-grid-item__text{
          font-size: 14px;
          color: #333333;
        }
      }
    }

}
</style>
