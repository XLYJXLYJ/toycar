<!-- 公共头部 -->
<template>
  <header>
    <section>
      <el-row>
        <el-col :span="6">
          <div class="grid-content header-left">
            <router-link :to="{name:'Toycar'}" v-if="$route.name==='Toycar'">返回编程玩</router-link>
            <div v-else @click="back"><img src="./../assets/img/back.png" alt=""></div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content header-middle" v-if="$route.name==='Toycar'">玩具车项目</div>
          <div class="grid-content header-middle" v-if="$route.name==='Carinfo'">玩具车</div>
          <div class="grid-content header-middle" v-if="$route.name==='DesignSkill'">编辑车</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content header-right">
            <el-button type="primary" v-if="$route.name==='Toycar'" @click="$store.commit('toggleAddtoycar')">新建项目</el-button>
            <el-button type="primary" v-if="$route.name==='Carinfo'" @click="saveCar">保存</el-button>
            <el-button type="primary" v-if="$route.name==='DesignSkill'" @click="saveSkill">保存</el-button>
          </div>
        </el-col>
      </el-row>
    </section>   
  </header>
</template>
<script>
import {mapState,mapMutations} from 'vuex';
export default {
  data () {
    return {
      
    }
  },
  mounted () {
    var self = this;
    if(this.$route.name === 'Toycar') {
      self.toycarHeader = true;
      self.carinfoHeader = false;
      self.designskillHeader = false;
    }else if(this.$route.name === 'Carinfo') {
      self.toycarHeader = false;
      self.carinfoHeader = true;
      self.designskillHeader = false;
    }else if(this.$route.name === 'DesignSkill') {
      self.toycarHeader = false;
      self.carinfoHeader = false;
      self.designskillHeader = true;
    }
  },
  methods: {
    back () {
      this.$router.go(-1);
    },
    saveCar(){
      this.$store.commit('toggleIsSaveCar')
    },
    saveSkill(){
      this.$store.commit('toggleIsSaveSkill')
    }
  }
  // watch : {
  //   "$route" : (to,from) =>{
  //     if(to.name === 'Toycar') {
  //       console.log(this.toycarHeader);
  //       this.toycarHeader = true;
  //       this.carinfoHeader = false;
  //       this.designskillHeader = false;
  //     }else if(to.name === 'Carinfo') {
  //       console.log(this.toycarHeader);
  //       this.toycarHeader = false;
  //       this.carinfoHeader = true;
  //       this.designskillHeader = false;
  //     }else if(to.name === 'DesignSkill') {
  //       console.log(this.toycarHeader);
  //       this.toycarHeader = false;
  //       this.carinfoHeader = false;
  //       this.designskillHeader = true;
  //     }
  //   }
  // }
  
}
</script>

<style lang="scss" scoped>
  header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 80px;
    width: 100%;
    z-index: 2;
    background-color: #fff;
    box-shadow: 0px 5px 5px #eee;
    section{
      margin: 0 auto;
      max-width: 1130px;
      .el-row {
        height: 80px;
        margin-bottom: 20px;
        &:last-child {
          margin-bottom: 0;
        }
        .grid-content{
          height: 80px;
          line-height: 80px;
          color: #0078D7;
          font-size: 22px;
        }
        .header-left{
          text-align: left;
          div{
            // padding-left: 30px;
            img{
              margin-top: 17px;
              cursor: pointer;
              
            }
          }
          a{
            padding-left: 20px;
            color: #0078D7;
          }
        }
        .header-midddle{
          font-size: 26px;
          text-align: center;
        }
        .header-right{
          text-align: right;
          // padding-right: 20px;
        }
      }
      
    }
    
  }
</style>


