<script>
import Forecast from '@/components/forecast/Forecast.vue';
import openMeteoIconsData from '@/assets/files/openMeteoIcons.json';
import VueCookies from 'vue-cookies'


export default {
    props: {userFavorites: Array},
    components: { Forecast },
    data() {
        return {
            tokenMeteoConcept: '407b0fd13617c45a849bc78c86de68aeb7da6e9bf3f37b02ca8285a342693ed3',
        // tokenMeteoConcept: '8087af7d033289a3ff910ef7cecbd6a9b161717bea684cdf559381f6e350c2bb',
        // tokenMeteoConcept: 'acbf71b18a8111408b94fae8fa064c23b9db1a1201fad18012d7ad0a2a9e1962',
        loading: false,
        // Set Paris by default
        googlePlace: {
            address_components: {
                0: {
                    long_name: 'Paris'
                },
            }
          },
        city: 'Paris',
        apiCityName: 'Paris',
        apiCityInsee: '75056',
        apiCityLat: '48.85341',
        apiCityLong: '2.3488',
        apiCityNowForecast: {},
        apiCityNextHoursForecast: {
              'data': {
                  'forecast': [
                    {
                        'datetime': '....................',
                        'temp2m': '....................'
                    },
                    {
                        'datetime': '....................',
                        'temp2m': '....................'
                    },
                    {
                        'datetime': '....................',
                        'temp2m': '....................'
                    },
                    {
                        'datetime': '....................',
                        'temp2m': '....................'
                    },
                ]
            }
        },
        apiCityTwoWeeksForecast: {},
        openMeteoIcons: openMeteoIconsData,
        weatherIconNow: {
            icon: '',
            name: ''
            },
        isFavorite: JSON.stringify(this.userFavorites).includes(this.apiCityName) ? 'favorite' : 'favorite_border',
        listFavorites: []
      }
    },
    methods: {
        async getInsee() {
            var getInsee = 'https://api.meteo-concept.com/api/location/cities?token=' + this.tokenMeteoConcept + '&search=' + this.city;
            await axios.get(getInsee)
            .then(response => {
                this.loading = false
                this.apiCityName = response.data.cities[0].name
                this.apiCityInsee = response.data.cities[0].insee
                this.apiCityLat = response.data.cities[0].latitude
                this.apiCityLong = response.data.cities[0].longitude
            })
            .catch(error => {
                this.loading = false
                this.apiCityName = 'Réessayez demain ! 😬'
                this.apiCityInsee = '----'
                console.log(error)
            })
        },
        async getNowForecast() {
            var getNowForecast = 'https://api.open-meteo.com/v1/forecast?latitude=' + this.apiCityLat + '&longitude=' + this.apiCityLong + '&hourly=temperature_2m,weathercode&current_weather=true&timezone=Europe%2FBerlin';

            await axios.get(getNowForecast)
            .then(response => {
                this.loading = false

                this.apiCityNowForecast = response.data.current_weather;
                this.weatherIconNow.icon = "src/assets/icons/" + this.openMeteoIcons[this.apiCityNowForecast.weathercode].icon;
                this.weatherIconNow.name = this.openMeteoIcons[this.apiCityNowForecast.weathercode].name;
            })
            .catch(error => {
                this.loading = false
                console.log(error)
            })
        },
        async getNextHoursForecast(apiCityInsee) {
            var getNextHoursForecast = 'https://api.meteo-concept.com/api/forecast/nextHours?token=' + this.tokenMeteoConcept + '&insee=' + apiCityInsee;
            await axios.get(getNextHoursForecast)
            .then(response => {
                this.loading = false
                this.apiCityNextHoursForecast = response
            })
            .catch(error => {
                this.loading = false
                console.log(error)
            })
        },
        async getTwoWeeksForecast(apiCityInsee) {
            var getTwoWeeksForecast = 'https://api.meteo-concept.com/api/forecast/daily?token=' + this.tokenMeteoConcept + '&insee=' + apiCityInsee;
            await axios.get(getTwoWeeksForecast)
            .then(response => {
                this.loading = false
                this.apiCityTwoWeeksForecast = response.data.forecast
                this.$emit('apiCityTwoWeeksForecast', this.apiCityTwoWeeksForecast);
            })
            .catch(error => {
                this.loading = false
                console.log(error)
            })
        },
        async loadData() {
            this.$emit('loadApiCityTwoWeeksForecast', this.apiCityTwoWeeksForecast)
        },
        async getGoogleMapsCity() {
            const options = {
                types: ['(cities)'],
                componentRestrictions: {country: "fr"}
            };

            const autocomplete = new google.maps.places.Autocomplete(this.$refs.origin, options);

            autocomplete.addListener("place_changed", () => {
                this.city = autocomplete.getPlace().address_components[0].long_name;
            });
        },
        async favorite() {
            if (this.isFavorite == 'favorite_border') {
                this.listFavorites.push({ 'name': this.apiCityName, 'insee': this.apiCityInsee })
                this.isFavorite = 'favorite'
            } else {
                var value = { 'name': this.apiCityName, 'insee': this.apiCityInsee };
                var newFavorites = []
                for (var i = 0; i < this.listFavorites.length; i++){
                    if (this.listFavorites[i].name != this.apiCityName) {
                        newFavorites.push({ 'name': this.listFavorites[i].name, 'insee': this.listFavorites[i].insee })
                    }
                }
                this.listFavorites = newFavorites;
                console.log(this.listFavorites);

                this.isFavorite = 'favorite_border'
            }
        }
    },
    async mounted() {

        if (JSON.stringify(this.listFavorites).includes(this.apiCityName)) {
            this.isFavorite = 'favorite'
        } else {
            this.isFavorite = 'favorite_border'
        }

        this.loading = true
        await this.getInsee();
        await this.getNowForecast();
        await this.getNextHoursForecast(this.apiCityInsee);
        await this.getTwoWeeksForecast(this.apiCityInsee);
        await this.loadData();
        await this.getGoogleMapsCity();
    },
    watch: {
        city: async function (newVal, oldVal) {
            if (JSON.stringify(this.listFavorites).includes(this.city)) {
                this.isFavorite = 'favorite'
            } else {
                this.isFavorite = 'favorite_border'
            }

            this.loading = true
            await this.getInsee();
            await this.getNowForecast();
            await this.getNextHoursForecast(this.apiCityInsee);
            await this.getTwoWeeksForecast(this.apiCityInsee);
            await this.loadData();
            await this.getGoogleMapsCity();
        },
      },
}



</script>

<template>
    <input id="autocomplete" type="text" placeholder="Recherchez une ville  ..." ref="origin" class="bg-slate-100 border-2 border-slate-100 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-900"/>
    
    <div v-if="listFavorites.length > 0" class="flex items-center mt-4 overflow-scroll">
           <i class="cursor-pointer text-[30px] material-icons outlined text-red-100 inline-block p-2">favorite</i>
        <ul id="userFavoritesList" class="my-2 inline-block">
            <li class="cursor-pointer inline rounded text-center text-red-700 p-2 bg-red-50 mr-2" v-for="item in this.listFavorites" @click="this.city = item.name;">{{item.name}}</li>
        </ul>
    </div>
    
    <div class="mt-4 rounded-lg px-6 py-3 bg-slate-100">
        <template v-if="loading">
            <div class="grid grid-cols-3 gap-4">
                <div class="col-span-2">
                    <h1 class="text-[30px] font-semibold text-blue-900" >...</h1>
                    <p class="text-[12px] text-blue-900 opacity-75">...</p>
                    <p class="text-[20px] mt-10 text-red-600">...</p>
                    <p class="text-[60px] font-semibold text-blue-900" >...</p>
                </div>
                <div class="col-span-1 flex place-content-between flex-col items-end">
                </div>
            </div>
        </template>

        <template v-else>
            <div class="grid grid-cols-3 gap-4">
                <div class="col-span-2">
                    <h1 class="text-[30px] font-semibold text-blue-900" >{{apiCityName}}</h1>
                    <p class="text-[12px] text-blue-900 opacity-75">Vents à {{apiCityNowForecast.windspeed}} km/h</p>
                    <p class="text-[20px] mt-10 text-red-600">{{weatherIconNow.name}}</p>
                    <p class="text-[60px] font-semibold text-blue-900" >{{apiCityNowForecast.temperature}} °C</p>
                </div>
                <div class="col-span-1 flex place-content-between flex-col items-end">
                    
                    <div>
                        <i @click="this.favorite()" class="cursor-pointer text-[30px] material-icons outlined text-red-600">{{this.isFavorite}}</i>
                    </div>

                    <div>
                        <img class="w-[125px]" :src='weatherIconNow.icon'/>
                    </div>
                </div>
            </div>
        </template>

    </div>
    
    <div class="mt-4 rounded-lg p-6 border-2 border-gray-200">
        <h1 class="text-[20px] mb-4 font-semibold text-blue-900">Prochaines heures</h1>

        <div class="grid grid-cols-4 gap-4">
            <div class="p-4 text-center bg-slate-100">
                
                <p class="text-slate-600">{{apiCityNextHoursForecast.data.forecast[0].datetime.substring(11, 13)}} h</p>
                <p class="text-blue-900 font-semibold">{{apiCityNextHoursForecast.data.forecast[0].temp2m}} °C</p>
            </div>
            <div class="p-4 text-center bg-slate-100">
                <p class="text-slate-600">{{apiCityNextHoursForecast.data.forecast[1].datetime.substring(11, 13)}} h</p>
                <p class="text-blue-900 font-semibold">{{apiCityNextHoursForecast.data.forecast[1].temp2m}} °C</p>
            </div>
            <div class="p-4 text-center bg-slate-100">
                <p class="text-slate-600">{{apiCityNextHoursForecast.data.forecast[2].datetime.substring(11, 13)}} h</p>
                <p class="text-blue-900 font-semibold">{{apiCityNextHoursForecast.data.forecast[2].temp2m}} °C</p>
            </div>
            <div class="p-4 text-center bg-slate-100">
                <p class="text-slate-600">{{apiCityNextHoursForecast.data.forecast[3].datetime.substring(11, 13)}} h</p>
                <p class="text-blue-900 font-semibold">{{apiCityNextHoursForecast.data.forecast[3].temp2m}} °C</p>
            </div>

        </div>        
    </div>
</template>