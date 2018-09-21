import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        //新建项目弹窗状态
        dialogAddtoycar: false,
        //保存车子
        isSaveCar: false,
        //保存技能
        isSaveSkill: false,
    },
    mutations: {
        //改变项目弹窗状态
        toggleAddtoycar(state) {
            state.dialogAddtoycar = !state.dialogAddtoycar
        },
        //改变保存车子状态
        toggleIsSaveCar(state) {
            state.isSaveCar = !state.isSaveCar;
        },
        //改变保存车子技能状态
        toggleIsSaveSkill(state) {
            state.isSaveSkill = !state.isSaveSkill
        }
    }
})