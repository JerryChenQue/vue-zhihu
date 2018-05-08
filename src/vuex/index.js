import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store( {
    state : {
        sidebarShow : false,
        loading:false,
        back:false
    },
    mutations : {
        changeSidebarShow( state, flag ) {
            state.sidebarShow = flag;
        },
        changeLoadingShow( state, flag ) {
            state.loading = flag;
        },
        changeGetBack( state, flag ) {
            state.back = flag;
        }
    },
    actions: {
        changeSidebarShow1( context, flag ) {
            context.commit('changeSidebarShow', flag);
        },
        changeGetBack1( context, flag ) {
            context.commit('changeGetBack', flag);
        }
    }
});

export default store;