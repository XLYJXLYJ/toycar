import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Header from '@/components/Header'
import Toycar from '@/page/Toycar'
import Carinfo from '@/page/Carinfo'
import DesignSkill from '@/page/DesignSkill'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'Index',
        redirect: '/Toycar',
        component: Index,
        children: [{
            path: '/Toycar',
            name: 'Toycar',
            components: {
                'header': Header,
                'main': Toycar
            }
        }, {
            path: '/Carinfo/:id',
            name: 'Carinfo',
            components: {
                'header': Header,
                'main': Carinfo
            }
        }, {
            path: '/DesignSkill/:id/:carId',
            name: 'DesignSkill',
            components: {
                'header': Header,
                'main': DesignSkill
            }
        }]


    }]
})