<script setup lang="ts">
import { ref } from "vue";

import Uniqe from './logo/uniqe.svg?raw';
import Twitter from './logo/twitter.svg?raw';
import Reddit from './logo/reddit.svg?raw';

import { fetchUniqeProofNFTs } from "./graphql/index";
import type { Network } from "./graphql/index";

const { address } = defineProps<{
  address: string;
}>();

const uniqeUrl = import.meta.env.VITE_UNIQE_URL as string;

function openUniqeAddress() {
  window.open(`${uniqeUrl}${address}`, '_blank')?.focus();
}

const networks = ref([] as Network[]);

async function fetchNetworks() {
  networks.value = await fetchUniqeProofNFTs(address);
}

function getImageFromValidator(val: string): string {
  switch (val) {
    case 'Twitter':
      return Twitter;
    case 'Reddit':
      return Reddit;
    case 'Uniqe':
      return Uniqe;
    default:
      return "#";
  }
}

function openNetwork(url: string) {
  window.open(url, '_blank')?.focus();
}

fetchNetworks();
</script>

<template>
  <div class="widget">
    <div v-for="network in networks" class="icon" @click="openNetwork(network.url)">
      <div class="tooltip-anchor"><div class="bubble">View on {{ network.validator }}</div></div>
      <img :src="getImageFromValidator(network.validator)" />
    </div>
    <div class="divider"></div>
    <div class="wallet" @click="openUniqeAddress">
      <div class="wallet-icon">
        <div class="tooltip-anchor"><div class="bubble">View on Uniqe</div></div>
        <img :src="Uniqe" />
      </div>
      <div class="wallet-address">0x{{ address.slice(2, 10).toUpperCase() }}</div>
    </div>
  </div>
</template>

<style scoped lang="sass">
$not_selected: #FAFAFA
$selected: #4C3EF4

$selected_filter: invert(100%) sepia(0%) saturate(7479%) hue-rotate(108deg) brightness(99%) contrast(99%)
$not_selected_filter: invert(27%) sepia(79%) saturate(6425%) hue-rotate(244deg) brightness(97%) contrast(98%)

$spacing: 10px

.widget
  font-family: "Noto Sans", sans-serif

  width: max-content
  height: max-content

  display: flex
  flex-direction: row
  column-gap: 10px

.divider
  border-left: 1px solid $not_selected
  margin-top: $spacing
  margin-bottom: $spacing
  height: auto


.wallet
  cursor: pointer
  display: inline-flex
  border-radius: calc($spacing * 2)

  background-color: $not_selected

  // On hover
  &:hover
    box-shadow: 0 5px 10px rgba(0,0,0,0.25), 0 5px 8px rgba(0,0,0,0.24)
    background-color: $selected

    .wallet-icon
      img
        filter: $selected_filter

    .tooltip-anchor
      opacity: 1

    .wallet-address
      color: $not_selected

  .wallet-icon
    padding: 10px

    border-radius: calc($spacing * 2) 0 0 calc($spacing * 2)

    transition: all 0.3s cubic-bezier(.25,.8,.25,1)

    img
      display: flex
      justify-content: center
      transition: all 0.3s cubic-bezier(.25,.8,.25,1)
      filter: $not_selected_filter

  .wallet-address
    display: inline-flex
    justify-content: center
    align-items: center

    cursor: pointer

    color: $selected

    padding: 10px
    padding-left: 0px

    transition: all 0.3s cubic-bezier(.25,.8,.25,1)

    border-radius: 0 calc($spacing * 2) calc($spacing * 2) 0

.tooltip-anchor
  position: relative
  width: 0px
  height: 0px

  transition: all 0.3s cubic-bezier(.25,.8,.25,1)
  opacity: 0

  // Pas trop sur de ca, c'est pour placer la bubule en fonction du padding
  // mais ca fonctionne quand on change la taille du texte de la tooltip donc ca passe
  top: calc($spacing * -2)
  left: calc($spacing + ($spacing / 4 ))

  .bubble
    width: max-content
    text-align: center
    position: relative

    // on met la bubule au dessus de l'icone, et on la centre
    transform: translateX(-50%) translateY(-100%)

    padding: 5px
    border-radius: 5px

    background-color: $selected
    color: white

    &::after
      content: " "
      position: absolute
      top: 100%
      left: 50%
      margin-left: -5px
      border-width: 5px
      border-style: solid
      border-color: $selected transparent transparent transparent

.icon
  cursor: pointer
  padding: 10px

  border-radius: 100%

  transition: all 0.3s cubic-bezier(.25,.8,.25,1)
  background-color: $not_selected


  img
    display: flex
    justify-content: center
    transition: all 0.3s cubic-bezier(.25,.8,.25,1)
    filter: $not_selected_filter

  // On hover
  &:hover
    box-shadow: 0 5px 10px rgba(0,0,0,0.25), 0 5px 8px rgba(0,0,0,0.24)
    background-color: $selected

    .tooltip-anchor
      opacity: 1

    img
      filter: $selected_filter

//.wallet
</style>
