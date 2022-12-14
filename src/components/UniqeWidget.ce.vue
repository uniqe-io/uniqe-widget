<script setup lang="ts">
import { ref } from "vue";

import Uniqe from './logo/uniqe.vue';
import Twitter from './logo/twitter.vue';
import Reddit from './logo/reddit.vue';
import Lens from './logo/lens.vue';
import Github from './logo/github.vue';

import { fetchNetworks, resolveAnyToName, resolveAnyToAddress } from "./graphql/index";
import type { Network } from "./graphql/index";

const { address } = defineProps<{
  address: string;
}>();

const uniqeUrl = import.meta.env.VITE_UNIQE_URL as string;

const resolveToShortened = (address: string) => {
  if (new RegExp("^0x[A-f0-9]{40}$").test(address)) {
      return address.slice(0, 6) + "..." + address.slice(-4)
  }

  return address;
};

const resolvedAddress = ref(resolveToShortened(address));

function openUniqeAddress() {
  window.open(`${uniqeUrl}${address}`, '_blank')?.focus();
}

const networks = ref([] as Network[]);

function getComponentFromValidator(val: string): string {
  switch (val) {
    case 'Twitter':
      return Twitter;
    case 'Reddit':
      return Reddit;
    case 'Github':
      return Github;
    case "Lens":
      return Lens;
    default:
      return "";
  }
}

function openNetwork(url: string) {
  window.open(url, '_blank')?.focus();
}

async function fetchData() {
  let addr = await resolveAnyToAddress(address);
  networks.value = await fetchNetworks(addr);
  resolvedAddress.value = await resolveAnyToName(address);
}

fetchData();
</script>

<template>
  <div class="widget">
    <div v-for="network in networks" class="icon" @click="openNetwork(network.url)">
      <div class="tooltip-anchor"><div class="bubble">View on {{ network.validator }}</div></div>
      <div class="img-container">
        <component :is="getComponentFromValidator(network.validator)" />
      </div>
    </div>
    <div class="divider"></div>
    <div class="wallet" @click="openUniqeAddress">
      <div class="wallet-icon">
        <div class="tooltip-anchor"><div class="bubble">View on Uniqe</div></div>
        <div class="img-container">
          <Uniqe />
        </div>
      </div>
      <div class="wallet-address">{{ resolvedAddress }}</div>
    </div>
  </div>
</template>

<style scoped lang="sass">
$not_selected: #FAFAFA
$selected: #4C3EF4

$selected_icon: $not_selected
$not_selected_icon: $selected

$spacing: 10px
$totaly-sane-value: 10000px

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
  border-radius: $totaly-sane-value

  background-color: $not_selected

  .tooltip-anchor
    pointer-events: none

  // On hover
  &:hover
    box-shadow: 0 5px 10px rgba(0,0,0,0.25), 0 5px 8px rgba(0,0,0,0.24)
    background-color: $selected

    .wallet-icon
      .img-container
        svg
          color: $selected_icon

    .tooltip-anchor
      opacity: 1

    .wallet-address
      color: $selected_icon

  .wallet-icon
    padding: 10px

    transition: all 0.3s cubic-bezier(.25,.8,.25,1)

    .img-container
      display: flex
      justify-content: center
      transition: all 0.3s cubic-bezier(.25,.8,.25,1)
      svg
        color: $not_selected_icon

  .wallet-address
    display: inline-flex
    justify-content: center
    align-items: center

    cursor: pointer

    color: $selected

    padding: 10px
    padding-left: 0px

    transition: all 0.3s cubic-bezier(.25,.8,.25,1)

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


  .img-container
    display: flex
    justify-content: center
    transition: all 0.3s cubic-bezier(.25,.8,.25,1)

    svg
      color: $not_selected_icon

  .tooltip-anchor
    pointer-events: none

  // On hover
  &:hover
    box-shadow: 0 5px 10px rgba(0,0,0,0.25), 0 5px 8px rgba(0,0,0,0.24)
    background-color: $selected

    .tooltip-anchor
      opacity: 1

    .img-container
      svg
        color: $selected_icon

</style>
