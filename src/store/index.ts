import { GET_TOTAL_SUM, GET_PRODUCT_LIST, SET_CHECKED_ITEM_ACTION, SET_CHECKED_ITEM_MUTATION, GET_CHECK_ALL, SET_CHECK_ALL_ITEMS_ACTION, SET_CHECK_ALL_ITEMS_MUTATION, ADD_PRODUCT_ITEM_ACTION, ADD_PRODUCT_ITEM_MUTATION, DELETE_PRODUCT_ITEM_ACTION, DELETE_PRODUCT_ITEM_MUTATION, CHECK_ITEM_LOCAL_STORAGE_ACTION, SET_PRODUCTS_LOCAL_STORAGE_MUTATION } from './types';
import {Product} from '@/types/product';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
		productList: [] as Product[],
    },
	getters: {
		[GET_TOTAL_SUM]: (state): number => {
            return state.productList.reduce((total, item) => (item.quality * item.price) + total, 0);
        },
		[GET_PRODUCT_LIST]: (state): Product[] => {
			return state.productList as Product[];
		},
		[GET_CHECK_ALL]: (state): boolean => {
			return state.productList.length > 0 && state.productList.filter((item) => item.checked).length === state.productList.length;
		}
	},
    mutations: {
		[SET_CHECKED_ITEM_MUTATION]: (state, payload: string | number): void => {
			const itemIndex: number = state.productList.findIndex((item) => item.id === payload);
			if (itemIndex !== -1) state.productList[itemIndex].checked = !state.productList[itemIndex].checked;
			localStorage.setItem('productList', JSON.stringify(state.productList));
		},
		[SET_CHECK_ALL_ITEMS_MUTATION]: (state, {getters}): void => {
			const bool = !getters[GET_CHECK_ALL];
			for (let i = 0; i < state.productList.length; i++) {
				state.productList[i].checked = bool;
			}
			localStorage.setItem('productList', JSON.stringify(state.productList));
		},
		[ADD_PRODUCT_ITEM_MUTATION]: (state, payload: Product): void => {
			payload.id = new Date().getMilliseconds() + Math.random();
			payload.checked = false;
			payload.date = new Date();
			state.productList.push(payload);
			localStorage.setItem('productList', JSON.stringify(state.productList));
		},
		[DELETE_PRODUCT_ITEM_MUTATION]: (state): void => {
			state.productList = state.productList.filter((item) => !item.checked);
			localStorage.setItem('productList', JSON.stringify(state.productList));
		},
		[SET_PRODUCTS_LOCAL_STORAGE_MUTATION]: (state): void => {
			state.productList = JSON.parse(localStorage.getItem('productList') as string) || [];
		}
    },
    actions: {
		[SET_CHECKED_ITEM_ACTION]: ({commit}, payload: Product): void => {
			commit(SET_CHECKED_ITEM_MUTATION, payload.id);
		},
		[SET_CHECK_ALL_ITEMS_ACTION]: ({commit, getters}): void => {
			commit(SET_CHECK_ALL_ITEMS_MUTATION, {getters});
		},
		[ADD_PRODUCT_ITEM_ACTION]: ({commit}, payload: Product): void => {
			commit(ADD_PRODUCT_ITEM_MUTATION, payload);
		},
		[DELETE_PRODUCT_ITEM_ACTION]: ({commit}): void => {
			commit(DELETE_PRODUCT_ITEM_MUTATION);
		},
		[CHECK_ITEM_LOCAL_STORAGE_ACTION]: ({commit}): void => {
			commit(SET_PRODUCTS_LOCAL_STORAGE_MUTATION);
		}
    },
    modules: {
    }
})
