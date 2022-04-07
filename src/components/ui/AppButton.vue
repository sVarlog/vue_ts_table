<template>
    <button :disabled="disabled" @click="$emit('onClick')">{{$props.text}}</button>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
    name: 'AppButton',
    
    props: {
        text: {
            default: 'Save',
            type: String
        },
        onClick: {
            type: Function
        },
        disabled: {
            type: Boolean,
            default: false
        }
    }
});
</script>

<style lang="scss" scoped>
@import '@/assets/variables.scss';
button{
    padding: 10px 20px;
    border: 2px solid $borderColor;
    cursor: pointer;
    font-weight: bold;
    background: $buttonBgColod;
    border-radius: $borderRadius;
    transition: .25s;
    &:disabled{
        opacity: .5;
    }
}
</style>