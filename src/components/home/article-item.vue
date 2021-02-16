<template>
    <van-cell class="article-item" :to="{name:'article', params:{articleId: article.art_id}}">
        <template v-slot:title>
            <div class="title van-multi-ellipsis--l3">
                {{article.title}}
            </div>
        </template>
        <template v-slot:label>
            <div v-if="article.cover.type === 3" class="cover-wrap">
                <div v-for="(img,index) in article.cover.images" :key='index' class="cover-wrap-item">
                    <van-image
                    class="cover-item"
                        fit="cover"
                        :src="img?img:'https://img01.yzcdn.cn/vant/cat.jpeg'"
                        />
                </div>
            </div>

            <div class="label-wrap">
                <span>{{article.aut_name}}</span>
                <span>{{article.comm_count}}评论</span>
                <span>{{article.pubdate | relativeTime}}</span>
            </div>
        </template>

        <van-image
            v-if="article.cover.type === 1"
            fit="cover"
            class="right-cover"
            :src="article.cover.images[0]?article.cover.images[0]:'https://img01.yzcdn.cn/vant/cat.jpeg'"
            />
    </van-cell>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
    .article-item{
        ::v-deep .van-cell__title{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            // width: 200px;
            // height: 80px;
        }
        .title{
            font-size: 16px;
            color: #3a3a3a;
        }

        ::v-deep .van-cell__value{
            flex: none;
            width: 116px;
            height: 73px;
            margin-left: 12px;
        }
        .right-cover{
            width: 116px;
            height: 73px;
        }

        .cover-wrap{
            padding: 15px 0;
            display: flex;
            .cover-wrap-item{
                flex: 1;
                height: 73px;

                &:not(:last-child){
                    padding-right: 4px;
                }
                .cover-item{
                    width: 100%;
                    height: 73px;
                }
            }
        }

        .label-wrap{
            font-size: 11px;
            color: #b4b4b4;
            span{
                margin-right: 12px;
            }
        }
    }
</style>
