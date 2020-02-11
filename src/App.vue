<template>
<div class="app">
  <v-header :sellers="seller"></v-header>
  <tab></tab>
  <v-content>
  </v-content>
</div>
</template>

<script>
import header from '@/components/header/Header'
import tab from '@/components/Tab'
import content from '@/components/Content'
export default {
  components: {
    'v-header': header,
    tab,
    'v-content': content
  },
  data () {
    return {
      seller: {}
    }
  },
  async created () {
    // this.$axios.get('http://localhost:3000/seller').then(({ data }) => {
    //   if (data.error === 0) {
    //     this.seller = data.data
    //     console.log(this.seller)
    //   }
    // }).catch((e) => {
    //   console.log(e)
    // })

    try {
      const { data, statusText, status } = await this.$axios.get('seller')
      // console.log(res)
      if (status === 200) {
        this.seller = data.data
        // console.log(this.seller)
      } else {
        console.log(statusText)
      }
    } catch (e) {
      console.log(e)
    }
  }

}
</script>

<style>

</style>
