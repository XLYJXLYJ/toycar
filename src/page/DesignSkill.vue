<!-- 设计技能 -->
<template>
  <main>
    <section>
        <section class="carProperty">
            <header>编辑属性</header>
            <section>
                <el-form ref="form" :model="form" label-width="70px">
                    <el-form-item label="车名">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="生命值">
                        <i class="el-icon-info" v-popover:popover1></i>
                        <el-popover
                            ref="popover1"
                            placement="top-start"
                            title="标题"
                            width="200"
                            trigger="hover"
                            content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
                        </el-popover>
                        <el-input v-model="form.maxhp"></el-input>
                    </el-form-item>
                    <el-form-item label="防御力">
                        <i class="el-icon-info" v-popover:popover2></i>
                        <el-popover
                            ref="popover2"
                            placement="top-start"
                            title="标题"
                            width="200"
                            trigger="hover"
                            content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
                        </el-popover>
                        <el-input v-model="form.dp"></el-input>
                    </el-form-item>
                    <el-form-item label="最大速度">
                        <i class="el-icon-info" v-popover:popover3></i>
                        <el-popover
                            ref="popover3"
                            placement="top-start"
                            title="标题"
                            width="200"
                            trigger="hover"
                            content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
                        </el-popover>
                        <el-input v-model="form.maxspeed"></el-input>
                    </el-form-item>
                </el-form>
            </section>
        </section>
       <section class="carousel">
           <div class="addSkillBox"><el-button type="primary" @click="addSkill()">新增技能</el-button></div>
           <div class="sub-carousel">
               <div class="skill" v-for="(skill,index) in skillList" :key="index" @click="selectSkill(index)">
                   <img src="static/img/car.png" alt="">
                   <!-- <i class="el-icon-success"></i> -->
                   <i class="el-icon-error" @click="delSkill(index)"></i>
               </div>
           </div>
       </section>
      <section class="container clear">
        <section class="skill-info">
            <div class="skill-appearance fl"><img src="static/img/car.png" alt=""></div>
            <div class="skill-content fl">
                <p>{{tag.name}}</p>
                <el-tag>定义回复时间
                    <el-input v-model="tag.cd"></el-input>
                </el-tag>
                <el-tag>定义准备时间
                    <el-input v-model="tag.preparetime"></el-input>
                </el-tag>
                <el-tag>定义准备音效
                    <el-input v-model="tag.preparesound"></el-input>
                </el-tag>
                <el-tag>定义发动音效
                    <el-input v-model="tag.activatesound"></el-input>
                </el-tag>
                <el-tag>
                    技能描述
                    <el-input v-model="tag.desc"></el-input>
                </el-tag>
            </div>
            <div class="addBufBox"><el-button type="primary" @click="addBuf()">新增buffer</el-button></div>
        </section>
        <section class="skill-set">
            <el-table
                :data="tableData"
                style="width: 100%">
                <!-- <el-table-column type="index" width="50"></el-table-column> -->
                <el-table-column prop="date" label="状态名称" min-width="75">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row._name"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="状态描述" min-width="75">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row._des"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="状态标记" min-width="75">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row._layertag"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="?" min-width="75">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row._layertagtype"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="?" min-width="75">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row._sidetype"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="持续时间" min-width="75">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row._lasttime"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="最大生命值" min-width="75">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row._maxhp"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="生命值" min-width="75">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row._hp"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="CD" min-width="75">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row._cd"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="攻击力" min-width="75">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row._ap"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="防御力" min-width="75">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row._dp"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="速度" min-width="75">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row._speed"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="清除自身负面状态" min-width="75">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row._hitminus"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="击晕" min-width="75">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row._stunk"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="操作" min-width="75">
                    <template slot-scope="scope">
                        <!-- <el-button
                        size="mini"
                        @click="handleAdd(scope.$index, scope.row)">新增</el-button> -->
                        <el-button
                        size="mini"
                        type="danger"
                        @click="delBuf(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
                
            </el-table>
        </section>
        
      </section>
    </section>
  </main>
</template>

<script>
import func from '../public/func';
import api from '../public/api';
import axios from "axios";
import '../assets/js/xml2json.min.js';
import {mapState,mapMutations} from 'vuex';
export default {
  data () {
      return {
          id:'',
          carIndex:'',
          json:{},
          form:{
              name:'',
              maxhp:'',
              dp:'',
              maxspeed:'',
          },
          skillList:[],
          tag:{
              name:'',
              cd:'',
              preparetime:'',
              preparesound:'',
              activatesound:'',
              desc:'',
          },
          tableData:[],
          skillIndex:0,

      }
  },
//   beforeRouteEnter (to,from,next) {
//     console.log("准备进入路由模板");
//     console.log(to.name);
//     next((vm) => {
//         console.log("进入了DesignSkill路由");
//         vm.toycarHeader = false;
//         vm.carinfoHeader = false;
//         vm.designskillHeader = true;
//     });
//   },
  methods: {
    handleEdit(index, row) {
        console.log(index, row);
    },
    handleDelete(index, row) {
        console.log(index, row);
    },
    selectSkill (index) {
        let self = this;
        console.log(self.json);
        self.json.car.skill[self.skillIndex]._name = this.tag.name;
         self.json.car.skill[self.skillIndex]._desc = this.tag.desc;
         self.json.car.skill[self.skillIndex]._cd = this.tag.cd;
         self.json.car.skill[self.skillIndex]._activatesound = this.tag.activatesound;
         self.json.car.skill[self.skillIndex]._preparesound = this.tag.preparesound;
         self.json.car.skill[self.skillIndex]._preparetime = this.tag.preparetime;
        console.log(self.json.car.skill[self.skillIndex]);
        self.skillIndex = index;
        this.tag.name = self.skillList[index]._name;
        this.tag.desc = self.skillList[index]._desc;
        this.tag.cd = self.skillList[index]._cd;
        this.tag.activatesound = self.skillList[index]._activatesound;
        this.tag.preparesound = self.skillList[index]._preparesound;
        this.tag.preparetime = self.skillList[index]._preparetime;
        console.log(this.tag);
        if(self.skillList[index].buf.length) {
            self.tableData = self.skillList[index].buf;
        }else{
            let temp_arr = [];
            // console.log("=========");
            temp_arr.push(self.skillList[index].buf);
            self.tableData = temp_arr;
        }
        console.log(self.tableData);
        
        // console.log(self.tableData);
        // console.log(self.json.car.skill[index]);
        // alert(self.skillIndex );



    },
    addSkill () {
        let self = this;
        if(self.skillList.length < 6) {
            let newSkill ='<skill name="skill0" desc="this is a skill" cd="15" preparetime="1" preparesound="" activatesound=""><buf name="buf" des="this is a buf" layertag="1" layertagtype="0" sidetype="0" lasttime="0" maxhp="10" hp="10" cd="2" ap="5" dp="10" speed="3" hitminus="0.5" stunk="true"/></skill>';
            let x2js = new X2JS();
            let json = JSON.parse(JSON.stringify(x2js.xml_str2json(newSkill)));
            // self.skillList.push(json.skill);
            self.json.car.skill.push(json.skill);
            console.log(self.skillList);
            console.log(self.json);
            var str = x2js.json2xml_str(self.json);
            console.log(str);
        }
    },
    delSkill (index) {
        let self = this;
        self.skillList.splice(index,1);
    },
    addBuf () {
        let self = this;
        let newSkill ='<buf name="buf" des="this is a buf" layertag="1" layertagtype="0" sidetype="0" lasttime="0" maxhp="10" hp="10" cd="2" ap="5" dp="10" speed="3" hitminus="0.5" stunk="true"/>';
        let x2js = new X2JS();
        let json = JSON.parse(JSON.stringify(x2js.xml_str2json(newSkill)));
        console.log(json.buf);
        var str = x2js.json2xml_str(json);
        console.log(str);
        // if(self.json.car.skill[0].length) {
        //     self.skillList = self.json.car.skill;
        // }else{
            if(self.tableData.length > 1) {
                self.json.car.skill[self.skillIndex].buf.push(json.buf)
            }else{
                let temp_arr = [];
                temp_arr.push(self.json.car.skill[self.skillIndex].buf);
                self.json.car.skill[self.skillIndex].buf = temp_arr;
                self.json.car.skill[self.skillIndex].buf.push(json.buf)
            }
            self.tableData.push(json.buf);       
            console.log(self.json);
            var str = x2js.json2xml_str(self.json);
            console.log(str);
            
            
        // }
        // console.log(self.tableData);
    },
    delBuf (index,row) {
        let self = this;
        self.tableData.splice(index,1);
    },
    saveCar () {
        let self = this;
        self.json.car._name = self.form.name;
        self.json.car._maxhp = self.form.maxhp;
        self.json.car._dp = self.form.dp;
        self.json.car._maxspeed = self.form.maxspeed;
        console.log(self.json);
        self.json.car.skill[this.skillIndex]._activatesound = this.tag.activatesound;
        self.json.car.skill[this.skillIndex]._cd = this.tag.cd;
        self.json.car.skill[this.skillIndex]._desc = this.tag.desc;
        self.json.car.skill[this.skillIndex]._preparesound = this.tag.preparesound;
        self.json.car.skill[this.skillIndex]._preparetime = this.tag.preparetime;
        let x2js = new X2JS();
        var str = x2js.json2xml_str(self.json);
        console.log(str);
        
        func.ajaxPost(
        api.project,
        {
            id:this.$route.params.id,
            state:9,
            carIndex:this.$route.params.carId,
            content:str,
        },
        function (data) {
            console.log(data);
            if(data.status == 200) {
                if(data.data) {
                    self.Message("保存成功", "success");
                
                }
            }
        })
    }
  },
  computed: {
    isSave(){
      return this.$store.state.isSaveSkill;
    }
  },
  mounted () {
      let self = this;
      
      func.ajaxPost(
      api.project,
      {
        id:this.$route.params.id,
        state:8,
        carIndex:this.$route.params.carId
      },
      function (data) {
          if(data.status == 200) {
              if(data.data) {
                let file = data.data.data.car;
                let x2js = new X2JS();
                let json = JSON.parse(JSON.stringify(x2js.xml_str2json(file)));
                self.json = json;
                // console.log("====");
                // console.log(json.car.skill);
                console.log(self.json);
                self.form.name = self.json.car._name;
                self.form.maxhp = self.json.car._maxhp;
                self.form.dp = self.json.car._dp;
                self.form.maxspeed = self.json.car._maxspeed;
                if(self.json.car.skill.length) {
                    self.skillList = self.json.car.skill;
                }else{
                    let temp_arr = [];
                    temp_arr.push(self.json.car.skill);
                    self.skillList = temp_arr;
                    self.json.car.skill = temp_arr;
                }
                // console.log(self.skillList);
                self.tag.name = self.skillList[0]._name;
                self.tag.cd = self.skillList[0]._cd;
                self.tag.preparetime = self.skillList[0]._preparetime;
                self.tag.preparesound = self.skillList[0]._preparesound;
                self.tag.activatesound = self.skillList[0]._activatesound;
                self.tag.desc = self.skillList[0]._desc;
                if(self.skillList[0].buf.length) {
                    self.tableData = self.skillList[0].buf;
                }else{
                    let temp_arr = [];
                    // console.log("=========");
                    temp_arr.push(self.skillList[0].buf);
                    self.tableData = temp_arr;
                }
                // console.log(self.tableData);
                // console.log(self.tableData[0]);
                // console.log(self.tableData[0]["_ap"]);
                // console.log(json.car.skill.buf);
                var bufobj = json.car.skill.buf;
                var bufArr = [];
                bufArr.push(bufobj);
                bufArr.push(bufobj);
                // console.log(bufArr);
                // json.car.skill.buf = bufArr;
                console.log(self.json);
                var str = x2js.json2xml_str(self.json);
                console.log(str);
                // var buffer = new Blob([str]);
                // let formData = new FormData();
                // formData.append('content',buffer);
                // formData.append('carIndex',1);
                // formData.append('id',11575);
                // formData.append('state',9);
                // formData.append('userid',1);
                // let config = {
                //     headers:{
                //         'Content-type' : 'multipart/form-data'
                //     }
                // }
                // axios.post(api.project,formData,config)
                //     .then(function (data) {
                //         console.log(data)
                //     })
                
                // func.ajaxPost(
                // api.project,
                // {
                //     id:11583,
                //     state:9,
                //     carIndex:0,
                //     content:str,
                // },
                // function (data) {
                //     console.log(data);
                // })
               
              }
          }
      })
  },
  watch: {
    isSave (newVal,oldVal) {
      if(newVal === true) {
        this.$store.commit('toggleIsSaveSkill');
        this.saveCar();
      }
    }
  }
  
}
</script>

<style lang="scss" scoped>
  main {
    width:100%;
    background-color:#F4F4F4;
    min-width: 1130px;
    padding-top: 30px;
    section {
      width: 1130px;
      margin: 0 auto;
      .carProperty{
        width: 100%;
        height: 150px;
        background-color: #fff;
        margin: 30px 30px 30px 0;
        display: inline-block;
        header{
            height: 50px;
            line-height: 50px;
            padding-left: 30px;
            color: #2A85F8;
            font-size: 16px;
            border-bottom: 1px solid #eee;
            text-align: left;
        }
        .el-form {
            margin-top: 24px;
            .el-form-item{
                width: 275px;
                display: inline-block;
                .el-form-item__content .el-input {
                    width: 160px;
                    height: 42px;
                    margin-left: 20px;
                }
            }
            
        }
      }
      .carousel{
          width: 100%;
          background-color: #fff;
          border-radius: 5px;
          position: relative;
          .addSkillBox{
            text-align: left;
            padding-top: 12px;
            padding-left: 10px;
          }
          .sub-carousel {
              height: 115px;
            //   overflow-x: scroll;
              .skill{
                  width: 100px;
                  height: 100px;
                  padding-right: 14px;
                  display: inline-block;
                  position: relative;
                  margin: 0 auto;
                  margin-top: 10px;
                  img{
                      width: 100%;
                      height: 100%;
                  }
                  i{
                      position: absolute;
                      top: 0;
                      right: 14px;
                  }
              }
          }
      }
      .container{
          margin-top: 20px;
          .skill-info{
              width: 100%;
              height: 150px;
              background-color: #fff;
              margin-bottom: 30px;
              .skill-appearance{
                  width: 130px;
                  height: 130px;
                  border-radius: 5px;
                  margin: 10px 25px 0 10px;
                  img{
                      width: 100%;
                      height: 100%;
                  }
              }
              .skill-content{
                  color: #999;
                  p{
                      width: 100px;
                      padding: 0 12px;
                      height: 48px;
                      line-height: 48px;
                      background-color: #F4F4F4;
                      border-radius: 5px;
                      margin: 10px 0;
                  }
                  .el-tag{
                      width: 162px;
                      height: 72px;
                      text-align: left;
                      line-height: 36px;
                      background-color: #F4F4F4;
                      color: #999;
                      .el-input{
                          display: block;
                      }
                      
                  }
              }
              .addBufBox{
                    text-align: left;
                    background: #fff;
                    padding-top: 12px;
                    padding-left: 10px;
                    clear: both;
              }
          }
          .skill-set{
              width: 100%;
              background-color: #fff;
            //   padding: 12px;
              margin-bottom: 30px;
                padding-top: 22px;
              
              
              
          }
      }
    }
  }
</style>
<style lang="scss">
    .el-tag {
        .el-input {
            display: block;
            .el-input__inner{
            height: 34px!important;
            }
        } 
    }
    .el-table__header{
        border-radius:15px;
        thead th{
            padding: 0;
            background-color: #409EFF;
            text-align:center;
            border-right: 1px solid #FFF;
            .cell{
                color: #fff;
                font-size: 13px;
                padding:0;
            }
        }
    }
    .el-table__body{
        tbody {
            tr:nth-child(odd) {
                background-color: #EDF6FF;
                &:hover{
                    background-color: #EDF6FF;
                }
                td &:hover{
                    background-color: #EDF6FF;
                }
                .cell{
                    padding:0;
                    .el-input input {
                        border:none;
                        background-color: #EDF6FF;
                        &:hover{
                            background-color: #fff;
                        }
                        
                    }
                }
            }
            tr:nth-child(even) {
                background-color: #E3EFFF;
                &:hover{
                    background-color: #E3EFFF;
                }
                td &:hover{
                    background-color: #E3EFFF;
                    
                }
                .cell{
                    padding:0;
                    .el-input input {
                        border:none;
                        background-color: #E3EFFF;
                        &:hover{
                            background-color: #fff;
                        }
                    }
                }
            }
            
        }
        
    }
</style>



