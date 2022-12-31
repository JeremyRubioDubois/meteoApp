<script>
import { def } from '@vue/shared';
import SideBar from './components/sidebar/SideBar.vue';
import Main from './components/main/Main.vue';
import Forecast from './components/forecast/Forecast.vue';
import VueCookies from 'vue-cookies';



export default {
  name: 'App',
  components: { SideBar, Main, Forecast },
  data() {
    return {
      apiCityTwoWeeksForecast: {
        0: {
          'datetime': '...',
          'tmax': '0',
          'tmin': '0',
        },
        1: {
          'datetime': '...',
          'tmax': '0',
          'tmin': '0',
        },
        2: {
          'datetime': '...',
          'tmax': '0',
          'tmin': '0',
        },
        3: {
          'datetime': '...',
          'tmax': '0',
          'tmin': '0',
        },
        4: {
          'datetime': '...',
          'tmax': '0',
          'tmin': '0',
        },
        5: {
          'datetime': '...',
          'tmax': '0',
          'tmin': '0',
        },
        6: {
          'datetime': '...',
          'tmax': '0',
          'tmin': '0',
        },
        7: {
          'datetime': '...',
          'tmax': '0',
          'tmin': '0',
        },
        8: {
          'datetime': '...',
          'tmax': '0',
          'tmin': '0',
        },
        9: {
          'datetime': '...',
          'tmax': '0',
          'tmin': '0',
        },
        10: {
          'datetime': '...',
          'tmax': '0',
          'tmin': '0',
        },
        11: {
          'datetime': '...',
          'tmax': '0',
          'tmin': '0',
        },
        12: {
          'datetime': '...',
          'tmax': '0',
          'tmin': '0',
        },
        13: {
          'datetime': '...',
          'tmax': '0',
          'tmin': '0',
        },
        14: {
          'datetime': '...',
          'tmax': '0',
          'tmin': '0',
        },
      },
      userFavorites: JSON.stringify( VueCookies.get('userFavorites') == null ? [] : VueCookies.get('userFavorites'))
    }
  },
  methods: {
    async LoadData(data) {
      this.apiCityTwoWeeksForecast = data;
    },
    async checkFavorites() {
      if (this.userFavorites == null) {
      } else {
      }
    }
  }, 
  async mounted() {
    await this.checkFavorites();
  },

}

</script>

<template>
  <main>

    <div class="grid grid-cols-5 gap-4 p-4 mt-4">
      <div class="col-span-1 container form-section font-sans">
        <SideBar :userFavorites="this.userFavorites"></SideBar>
      </div>
      <div class="col-span-3 container form-section font-sans">
        <Main :userFavorites="this.userFavorites" @loadApiCityTwoWeeksForecast="LoadData($event)"></Main>
      </div>
      <div class="col-span-1 container form-section font-sans">
        <Forecast :apiCityTwoWeeksForecast="this.apiCityTwoWeeksForecast" />
      </div>
    </div>
  </main>
</template>