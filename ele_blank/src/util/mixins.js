export const ratingsMixin = {
  data(){
    return {
      selectType: 1, // 0推荐,1吐槽,2全部
      onlyContent: true
    }
  },
  methods: {
    // 子组件调用方法
    toggleOnlyContent(){
      this.onlyContent = !this.onlyContent
      // 刷新scroll -- 评论列表高度不够，拖动显示不了完整评论
      this.$nextTick(()=>{
        this.scroll.refresh()
      })
    },
    setSelectType(selectType){
      this.selectType = selectType
      // 刷新scroll -- 评论列表高度不够，拖动显示不了完整评论
      this.$nextTick(()=>{
        this.scroll.refresh()
      })
    }
  },
  computed: {
    filterRatings(){
      /*1. 相关数据
       food.ratings
       selectType: // 0推荐,1吐槽,2全部
       onlyContent: true/false
       2. 逻辑
       1.类型： selectType===2 || selectType=rating.rateType
       2.内容： onlyContent -- rating.text.length
       !onlyContent || rating.text.length>0
       */

      const ratings = this.ratings || this.food.ratings
      if(!ratings){ // 还没有数据，返回[]
        return []
      }
      const {selectType, onlyContent} = this
      return ratings.filter(rating => {
        return (selectType===2 || selectType===rating.rateType) && (!onlyContent || rating.text.length>0)
      })
    }
  }
}
