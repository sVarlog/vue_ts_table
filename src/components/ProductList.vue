<template>
    <div class="listWrap">
        <transition-group name="list" tag="ul">
            <li class="header row" key="header">
                <div class="col check" @click="changeAllChecked">
                    <div class="customCheckBox" :class="{active: getCheckAll}">
                        <img v-if="getCheckAll" :src="require('@/assets/accept.svg')" alt="">
                    </div>
                </div>
                <div class="col name">
                    <p>Product Name</p>
                </div>
                <div class="col date">
                    <p>Date</p>
                </div>
                <div class="col price">
                    <p>Price</p>
                </div>
                <div class="col quality">
                    <p>Qta</p>
                </div>
                <div class="col total">
                    <p>Sum</p>
                </div>
            </li>
            <li v-for="product in getProductList" :key="product.id" class="row">
                <div class="col check" @click="checkItem(product)">
                    <div class="customCheckBox">
                        <img v-if="product.checked" :src="require('@/assets/accept.svg')" alt="">
                    </div>
                </div>
                <div class="col name">
                    <p>{{product.name}}</p>
                </div>
                <div class="col date">
                    <p>{{getAddingDate(product.date)}}</p>
                </div>
                <div class="col price">
                    <p>{{product.price}}</p>
                </div>
                <div class="col quality">
                    <p>{{product.quality}}</p>
                </div>
                <div class="col total">
                    <p>{{product.price * product.quality}}</p>
                </div>
            </li>
        </transition-group>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { GET_CHECK_ALL, GET_PRODUCT_LIST, SET_CHECKED_ITEM_ACTION, SET_CHECK_ALL_ITEMS_ACTION } from '@/store/types';
import { Product } from '@/types/product';
import { mapActions, mapGetters } from 'vuex';

export default Vue.extend({
    name: 'ProductList',

    computed: {
        ...mapGetters({
            getProductList: GET_PRODUCT_LIST,
            getCheckAll: GET_CHECK_ALL
        }),
    },

    methods: {
        ...mapActions({
            setCheckItem: SET_CHECKED_ITEM_ACTION,
            changeAllChecked: SET_CHECK_ALL_ITEMS_ACTION
        }),
        checkItem(item: Product): void {
            this.setCheckItem(item);
        },
        getAddingDate(date: Date): string {
            const newDate: Date = new Date(date);
            const hours = newDate.getHours();
            const minutes = newDate.getMinutes();
            return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
        }
    }
});
</script>

<style lang="scss" scoped>
@import '@/assets/variables.scss';
.listWrap{
    border: 2px solid $borderColor;
    border-radius: $borderRadius / 2;
    .row{
        display: flex;
        width: 100%;
        justify-content: space-between;
        &:nth-child(1n){
            background: #FFFFFF;
        }
        &:nth-child(2n){
            background: #EEEEEE;
        }
        &.header{
            background: #CCCCCC;
            .col{
                cursor: pointer;
            }
        }
        .col{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 5px;
            border-right: 2px solid $borderColor;
            &:nth-child(1){
                width: 10%;
                cursor: pointer;
            }
            &:nth-child(2){
                width: 35%;
            }
            &:nth-child(3){
                width: 10%;
            }
            &:nth-child(4){
                width: 15%;
            }
            &:nth-child(5){
                width: 15%;
            }
            &:nth-child(6){
                width: 15%;
            }
            &:last-child{
                border: 0;
            }
            p{
                padding: 0;
                margin: 0;
                font-weight: bold;
            }
            .customCheckBox{
                width: 15px;
                min-width: 15px;
                height: 15px;
                min-height: 15px;
                border: 1px solid $borderColor;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }
}
</style>