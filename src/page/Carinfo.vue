<!-- 玩具车信息 -->
<template>
  <main>
    <section>
        <section class="carInfo">
            <header>玩具车信息</header>
            <section>
                <div class="fl car-appearance"><img src="static/img/car.png" alt=""></div>
                <div class="fl carInfo-right">
                    <el-input v-model="carName" placeholder="项目名"></el-input>
                    <el-input v-model="carAuthor" placeholder="作者"></el-input>
                    <el-input type="textarea" v-model="carDescribe" placeholder="项目描述"></el-input>
                </div>
            </section>
        </section>
        <section class="carList">
            <section class="carSkill">
                <header>
                    <span>机器车</span>
                    <el-button type="primary" @click="addCar">新建车</el-button>
                </header>
                <section>
                    <el-row type="flex" class="row-bg" justify="space-between">
                        <el-col :span="8" v-for="(car,index) in carList" :key="index">
                            <img src="static/img/car.png" alt="">
                            <i class="el-icon-success"></i>
                            <div class="car-oprate">
                                <span @click="editCar(id,index)">编辑</span>
                                <span class="fr" @click="delCar(index)">删除</span>
                            </div>
                        </el-col>
                        <span style="display:inline;width:190px;height:0;border:none;"></span>
                        <span style="display:inline;width:190px;height:0;border:none;"></span>
                        <span style="display:inline;width:190px;height:0;border:none;"></span>
                        <span style="display:inline;width:190px;height:0;border:none;"></span>
                    </el-row>
                    
                </section>
            </section>
        </section>
    </section>
    
  </main>
</template>

<script>
import {mapState,mapMutations} from 'vuex';
import func from "../public/func";
import api from "../public/api";
import "../assets/js/xml2json.min.js";
export default {
  data() {
    return {
      id: this.$route.params.id,
      json: {},
      headerJson:{},
      carName: "",
      carAuthor: "",
      carDescribe: "",
      carHealthPoint: "",
      carDefensivePower: "",
      carMaxSpeed: "",
      carList: []
    };
  },
  //   beforeRouteEnter (to,from,next) {
  //     console.log("准备进入路由模板");
  //     console.log(to.name);
  //     next((vm) => {
  //         let hub = new Vue();
  //         hub.$emit('change','2');
  //         console.log("进入了Carinfo路由");
  //         vm.toycarHeader = false;
  //         vm.carinfoHeader = true;
  //         vm.designskillHeader = false;
  //     });
  //   },
  methods: {
    addCar() {
      let self = this;
      //   console.log(this.carList.length);
      let carLength = this.carList.length;
      if (carLength < 6) {
        func.ajaxPost(
          api.project,
          {
            id: this.$route.params.id,
            // id:11586,
            state: 7
          },
          function(res) {
            // console.log(res);
            if (res.status === 200) {
              if (res.data.data) {
                let newCar = res.data.data;
                // console.log(newCar);
                // console.log(typeof newCar);
                let x2js = new X2JS();
                let json = JSON.parse(
                  JSON.stringify(x2js.xml_str2json(newCar))
                );
                // console.log(json);
                self.carList.push(json);
                self.Message("新增成功", "success");
              }
            }
          }
        );
      }
    },
    editCar(id,carId) {
      this.$router.push({
        path:`/DesignSkill/${id}/${carId}`
      })
    },
    delCar(id) {
      let self = this;
      func.ajaxPost(
        api.project,
        {
          id: this.$route.params.id,
          carId: id,
          state: 10
        },
        function(res) {
          if (res.status == 200) {
            if (res.data.data) {
              self.carList.splice(id, 1);
              self.Message("删除成功", "success");
            }
          }
        }
      );
    },
    saveProject() {
      // func.ajaxPost(
      //   "/api/res/resourcelist",
      //   {
      //     onenav:1,
      //   },
      //   function(res) {
      //     if (res.status == 200) {
      //       if (res.data.data) {
      //         // console.log(res.data.data);
      //       }
      //     }
      //   }
      // );
      let Vue = this;
      var x2js = new X2JS();
      this.headerJson.project._name = this.carName;
      this.headerJson.project._desc = this.carDescribe;
      var str = x2js.json2xml_str(this.headerJson);
      var str = str.replace("/","");
      console.log(str);
      func.ajaxPost(
        api.project,
        {
          id: this.id,
          title: this.carName,
          p_desc: this.carDescribe,
          projectInfo:str,
          state: 11
        },
        function(res) {
          if (res.status == 200) {
            if (res.data.data) {
              // console.log(res.data.data);
              Vue.Message("保存成功", "success");
            }
          }
        }
      );
    },
  },
  computed: {
    count(){
      return this.$store.state.isSaveCar;
    }
  },
  mounted() {
    var self = this;
    func.ajaxPost(
      api.getproject,
      {
        id: this.$route.params.id
        // id:11583
      },
      function(data) {
        if (data.status == 200) {
          if (data.data) {
            var file = data.data;
            var startIndex = file.indexOf("<car");
            var data_arr = [];
            data_arr.push(file.substring(0, startIndex));
            data_arr.push("</project>");
            var data_header = data_arr.join("");
            var x2js = new X2JS();
            var json = JSON.parse(JSON.stringify(x2js.xml_str2json(file)));
            self.json = json;
            var header_json = JSON.parse(JSON.stringify(x2js.xml_str2json(data_header)));
            self.headerJson = header_json;
            console.log(header_json);
            // console.log(typeof json);
            // console.log(json.project);
            self.carName = self.json.project._name;
            self.carAuthor = self.json.project._auth;
            self.carDescribe = self.json.project._desc;
            if (self.json.project.car.length) {
              self.carList = self.json.project.car;
            } else {
              var temp_arr = [];
              temp_arr.push(self.json.project.car);
              self.carList = temp_arr;
            }
            // console.log(self.carList);

            // console.log(typeof(json));
            // console.log(json.project._name);
            // var a,b,c;
            // for(a in json) {
            //     console.log(json[a]);
            //     for (b in json[a]) {
            //         if(b == '_name') {
            //             console.log(json[a][b]);
            //         }

            //     }

            // }
          }
        }
      }
    );
  },
  watch: {
    count (newVal,oldVal) {
      if(newVal === true) {
        this.$store.commit('toggleIsSaveCar');
        this.saveProject();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
main {
  width: 100%;
  min-width: 1130px;
  background-color: #f4f4f4;
  padding-top: 30px;
  section {
    width: 1130px;
    margin: 0 auto;
    text-align: left;
    .carInfo {
      width: 100%;
      height: 255px;
      background-color: #fff;
      margin-bottom: 30px;
      margin-top: 30px;
      header {
        height: 55px;
        line-height: 55px;
        padding-left: 30px;
        color: #2a85f8;
        font-size: 16px;
        border-bottom: 1px solid #eee;
      }
      section {
        padding: 24px 30px;
        .car-appearance {
          width: 150px;
          height: 150px;
          margin-right: 22px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .carInfo-right {
          width: 870px;
        }
        .el-input {
          margin-bottom: 12px;
          width: 400px;
          display: block;
        }
        .el-textarea {
          width: 870px;
        }
      }
    }
    .carList {
      width: 1130px;
      .carProperty {
        width: 745px;
        height: 352px;
        background-color: #fff;
        margin-bottom: 30px;
        margin-right: 30px;
        margin-left: 0;
        display: inline-block;
        header {
          height: 55px;
          line-height: 55px;
          padding-left: 30px;
          color: #2a85f8;
          font-size: 16px;
          border-bottom: 1px solid #eee;
        }
        .el-form {
          margin-top: 24px;
          .el-form-item .el-form-item__content .el-input {
            width: 585px;
            height: 42px;
            margin-left: 20px;
          }
        }
      }
      .carSkill {
        width: 100%;
        // height: 352px;
        background-color: #fff;
        // margin-bottom: 30px;
        header {
          height: 55px;
          line-height: 55px;
          padding-left: 30px;
          color: #2a85f8;
          font-size: 16px;
          border-bottom: 1px solid #eee;
          .el-button {
            float: right;
            margin-top: 8px;
            margin-right: 18px;
          }
        }
        section {
          width: 100%;
          // height: 300px;
          // overflow-y: scroll;
          .el-row--flex {
            flex-wrap: wrap;
            padding: 24px 18px 24px 30px;
            .el-col {
              width: 190px;
              height: 190px;
              background-color: #fff;
              margin-bottom: 30px;
              cursor: pointer;
              position: relative;
              font-size: 0;
              img {
                width: 190px;
                height: 150px;
              }
              i {
                position: absolute;
                top: 0;
                right: 0;
                color: #2a85f8;
                font-size: 20px;
              }
              .car-oprate {
                line-height: 40px;
                color: #333;
                font-size: 14px;
                padding: 0 30px;
                background-color: #f4f4f4;
                a {
                  color: #333;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>