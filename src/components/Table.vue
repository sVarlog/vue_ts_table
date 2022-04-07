<template>
    <div class="wrap">
        <h1>Vue Invoice Calc</h1>
        <div class="addRow">
            <input v-model="name" type="text" placeholder="Product name" class="input name" />
            <input v-model="price" type="number" placeholder="Price" class="input price" />
            <input v-model="quality" type="number" placeholder="Qty" class="input quality" />
            <AppButton 
                text="Add"
                :disabled="name.length === 0"
                @onClick="addItem"
            />
        </div>
        <ProductList />
        <div class="bottomRow">
            <AppButton 
                text="Delete"
                :disabled="getProductList.filter(item => item.checked).length === 0"
                @onClick="deleteItem"
            />
            <div class="totalBlock">
                <p>Total:</p>
                <p>$ {{getTotalSum}}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Product} from '@/types/product';
import AppButton from '@/components/ui/AppButton.vue';
import ProductList from '@/components/ProductList.vue';
import { mapActions, mapGetters } from 'vuex';
import { ADD_PRODUCT_ITEM_ACTION, DELETE_PRODUCT_ITEM_ACTION, GET_PRODUCT_LIST, GET_TOTAL_SUM } from '@/store/types';

export default Vue.extend({
    name: 'Table',

    components: {
        AppButton,
        ProductList
    },
    
    data: () => ({
        name: '' as Product['name'],
        price: 1 as Product['price'],
        quality: 1 as Product['quality'],
    }),

    computed: {
        ...mapGetters({
            getTotalSum: GET_TOTAL_SUM,
            getProductList: GET_PRODUCT_LIST
        })
    },

    methods: {
        ...mapActions({
            addItemAction: ADD_PRODUCT_ITEM_ACTION,
            deleteItemAction: DELETE_PRODUCT_ITEM_ACTION
        }),
        reset(): void {
            this.name = '';
            this.price = 1;
            this.quality = 1;
        },
        addItem(): void {
            this.addItemAction({name: this.name, price: this.price, quality: this.quality});
            this.reset();
        },
        deleteItem(): void {
            this.deleteItemAction();
        }
    },

    watch: {
        price(): void {
            if (this.price <= 1) {
                this.price = 1;
            } else if (this.price > 10000) {
                this.price = 10000;
            }
        },
        quality(): void {
            if (this.quality <= 1) {
                this.quality = 1;
            } else if (this.quality > 100) {
                this.quality = 100;
            }
        }
    }
});
</script>

<style lang="scss" scoped>
@import '@/assets/variables.scss';

.wrap{
    border: 2px solid $borderColor;
    background: #fff;
    width: 100%;
    max-width: 750px;
    padding: 20px;
    h1{
        margin-bottom: 20px;
        text-align: center;
    }
    .addRow{
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        .input{
            padding: 5px 15px;
            border: 2px solid $borderColor;
            -moz-appearance: textfield;
            border-radius: $borderRadius;
            outline: none;
            transition: .25s;
            &:focus{
                border-color: darken($borderColor, 50%);
            }
            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
            &.name{
                width: 40%;
            }
            &.price{
                width: 20%;
            }
            &.quality{
                width: 20%;
            }
        }
    }
    .bottomRow{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 20px;
        .totalBlock{
            display: flex;
            align-items: center;
            p{
                font-weight: bold;
                &:last-child{
                    margin-left: 20px;
                    margin-right: 50px;
                }
            }
        }
    }
}
</style>