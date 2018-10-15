<!-- 玩具车列表 -->
<template>
  <main>
    <audio src="/codeplay/static/resource/class/1007失败.mp3" autoplay></audio>
    <section>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="#F4F4F4" @select="handleSelect">
        <el-menu-item index="0">全部</el-menu-item>
        <el-menu-item index="1">Mini车</el-menu-item>
        <el-menu-item index="2">履带车</el-menu-item>
      </el-menu>
      <section class="container" v-show="isdemo">
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :span="4" v-for='(list,index) in lists' :key="index">
            <div class="grid-content bg-purple">
              <div class="car-appearance"><img src="./../assets/img/car.png" alt=""></div>
              <div class="car-content">
                <p>{{list.title}}</p>
                <div class="ellipsisOne" :title="list.p_desc">{{list.p_desc}}</div>
              </div>
              <el-row>
                <el-col :span="12">
                  <div class="grid-content header-left" @click="editProject(list.id)">编辑</div>
                </el-col>
                <el-col :span="12">
                  <div class="grid-content header-middle" @click="deleteProject(list.id)">删除</div>
                </el-col>
                <!-- <el-col :span="8">
                  <div class="grid-content header-right"></div>
                </el-col> -->
              </el-row>
            </div>
          </el-col>
          <span style="display:inline;width:210px;height:0;border:none;"></span>
          <span style="display:inline;width:210px;height:0;border:none;"></span>
          <span style="display:inline;width:210px;height:0;border:none;"></span>
          <span style="display:inline;width:210px;height:0;border:none;"></span>
        </el-row>
        <el-pagination background layout="pager" :page-size="pagesize" :current-page="currentpage" :total="total" 
        @current-change="handleCurrentChange">
        </el-pagination>
      </section>
    </section>
    <!-- 新增项目 -->
      <transition name="el-fade-in-linear">
       <el-dialog :visible.sync="$store.state.dialogAddtoycar" width="500px" :show-close="false" :lock-scroll="false">
         <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="项目名称">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="项目类型">
              <el-select v-model="form.projecttype" placeholder="请选择项目类型">
                <el-option label="Mini车" value="1"></el-option>
                <el-option label="履带车" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="项目描述">
              <el-input type="textarea" v-model="form.p_desc"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addProject($store.commit('toggleAddtoycar'))">立即创建</el-button>
              <el-button @click="$store.commit('toggleAddtoycar')">取消</el-button>
            </el-form-item>
         </el-form>
       </el-dialog>
      </transition>
  </main>
</template>

<script>
import {mapState,mapMutations} from 'vuex';
import func from '../public/func';
import api from '../public/api';
import '../assets/js/xml2json.min.js';
export default {
  data () {
    return {
      total:0,
      pagesize:15,
      currentpage:1,
      activeIndex:'0',
      projecttype:0,
      lists:[],
      isdemo:'',
      form:{
        title:'',
        p_desc:'',
        type:'',

      }
    }
  },
  created:function(){
    let url=window.location.href;
    // var theRequest = new Object();  
    if (window.location.href.indexOf("?") != -1) {  
        var str = url.split("?=");
        this.$store.state.toycarid=str[1];
        sessionStorage.userid=str[1];
        if(sessionStorage.userid!=='undefined'){
            this.isdemo=true
          }else{
            this.isdemo=false
        }
        // for(var i = 0; i < strs.length; i ++) {  
        //     theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);  
        // }  
    }
},
  methods: {
    addProject(cb) {
      let Vue = this;
      func.ajaxPost(
        api.project,
        {
          userid:sessionStorage.userid,
          title:this.form.title,
          p_desc:this.form.p_desc,
          projecttype:this.form.projecttype,
        },
        function (data) {
            console.log(data);
            if(data.status == 200) {
                console.log(data);
                if(data.data) {
                  Vue.Message("新增成功", "success");
                  setTimeout(() => {
                    window.location.reload();
                  }, 1000);
                  
                }
            }
        })
    },
    getProjectList(pagenum = 1,pagesize = 15) {
      var self = this;
      // console.log(index);
      func.ajaxPost(
        api.projectlist,
        {
          userid:sessionStorage.userid,
          projecttype:parseInt(self.activeIndex),
          pagenum:pagenum,
          pagesize:pagesize,

        },
        function (data) {
            console.log(111)
             console.log(data.status)
            if(data.status == 200) {
                if(data.msg=='这回真的没有了~') {
                    self.isdemo=false
                    self.Message("你还没有玩车车项目", "success");
                }else{
                  self.total = data.data.total;
                  self.pagesize = data.data.pagesize;
                  self.currentpage = data.data.pagenum;
                  self.lists = data.data.data;
                }
            }
        }
      )
    },
    deleteProject(index) {
      var self = this;
      // console.log(index);
      func.ajaxPost(
        api.project,
        {
          id:index,
          state:5
        },
        function (data) {
        if(data.status == 200) {
          self.Message("删除成功", "success");
              setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
        }
      )
    },
    editProject(id) {
      this.$router.push({
        path:`/Carinfo/${id}`
      })
    },
    handleSelect(key, keyPath) {
      this.activeIndex = key;
      console.log(key);
      this.getProjectList();
    },
    handleCurrentChange(val) {
      console.log('当前页'+val);
      this.getProjectList(val);
    }
    
  },
  mounted () {
    var self = this;
    func.ajaxPost(
      api.projectlist,
      {
        userid:sessionStorage.userid,
        projecttype:0
      },
      function (data) {
          if(data.status == 200) {
              if(data.data.data.msg=='这回真的没有了~') {
                  self.isdemo=false
                  self.Message("你还没有玩车车项目", "success");
              }else{
                self.total = data.data.total;
                self.pagesize = data.data.pagesize;
                self.currentpage = data.data.pagenum;
                self.lists = data.data.data;
              }
          }
      }
    )
    
  },
  
  
}
</script>

<style lang="scss" scoped>
  main {
    width:100%;
    section {
      max-width: 1130px;
      margin: 0 auto;
      .el-menu{
        border-bottom: none;
        height: 64px;
        .el-menu-item {
          height: 30px;
          line-height: 30px;
          margin-top: 20px;
          border-radius: 14px;
          border:none;
          
          &:hover,&:active {
            color: #fff;
            background-color: #0078D7!important;
          }
          &:active {
            color: #fff;
            background-color: #0078D7!important;
          }
          
        }
      }
      .container{
        .el-row--flex {
          flex-wrap:wrap;
          .el-col{
            width: 210px;
            height: 276px;
            background-color: #fff;
            margin-bottom: 20px;
            .car-appearance{
              width: 100%;
              height: 156px;
              img{
                width: 100%;
                height: 100%;
              }
            }
            .car-content{
              height: 66px;
              padding-left: 20px;
              text-align: left;
              p{
                line-height: 30px;
                color: #333;
                font-size: 14px;
              }
              div{
                font-size: 12px;
                color: #BBB;
                line-height: 20px;
              }
            }
            .el-row {
              height: 50px;
              border-top:1px solid #eee;
              &:last-child {
                margin-bottom: 0;
              }
              .el-col{
                width: 50%;
                height: 50px;
              }
              .grid-content{
                height: 50px;
                line-height: 50px;
                color: #999;
                font-size: 12px;
                text-align: center;
                cursor: pointer;
                a{
                  width: 100%;
                  height: 100%;
                  color: #999;
                }
              }
              
            }
          }
        }
        .el-pagination{
          padding-bottom: 40px;
          margin-top: 20px;
        }
      }
    }
    
  }
</style>
<style scoped>
  .el-select{
      width: 380px!important;
    }
    .is-active{
      color: #fff!important;
      background-color: #0078D7!important;
    }
</style>



