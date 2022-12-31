
<script>
export default {
   props: { apiCityTwoWeeksForecast: Object },
}
</script>

<template>
   <div class="rounded-lg p-6 border-2 border-gray-200 min-h-fit h-[calc(100vh_-_60px)] overflow-auto hover:overflow-scroll">
      <h1 class="text-[20px] mb-4 font-semibold text-blue-900">Prochains jours</h1>
        
      <div class="pb-2">
         <p class="text-slate-600" >Demain</p>
         <p class="text-blue-900 font-semibold">{{(apiCityTwoWeeksForecast[1].tmax + apiCityTwoWeeksForecast[1].tmin)/2}}°C</p>
      </div>
      
      <div class="pb-2">
         <p class="text-slate-600" >Après-demain</p>
        <p class="text-blue-900 font-semibold">{{(apiCityTwoWeeksForecast[2].tmax + apiCityTwoWeeksForecast[2].tmin)/2}}°C</p>
      </div>

      <div class="pb-2">
        <p class="capitalize text-slate-600" >{{new Date(apiCityTwoWeeksForecast[3].datetime).toLocaleDateString('fr-FR', { weekday: 'long' }) + ' ' + new Date(apiCityTwoWeeksForecast[3].datetime).getDate()}}</p>
        <p class="text-blue-900 font-semibold">{{(apiCityTwoWeeksForecast[3].tmax + apiCityTwoWeeksForecast[3].tmin)/2}}°C</p>
      </div>
      
      <div class="pb-2">
        <p class="capitalize text-slate-600" >{{new Date(apiCityTwoWeeksForecast[4].datetime).toLocaleDateString('fr-FR', { weekday: 'long' }) + ' ' + new Date(apiCityTwoWeeksForecast[4].datetime).getDate()}}</p>
        <p class="text-blue-900 font-semibold">{{(apiCityTwoWeeksForecast[4].tmax + apiCityTwoWeeksForecast[4].tmin)/2}}°C</p>
      </div>
      
      <div class="pb-2">
        <p class="capitalize text-slate-600" >{{new Date(apiCityTwoWeeksForecast[5].datetime).toLocaleDateString('fr-FR', { weekday: 'long' }) + ' ' + new Date(apiCityTwoWeeksForecast[5].datetime).getDate()}}</p>
        <p class="text-blue-900 font-semibold">{{(apiCityTwoWeeksForecast[5].tmax + apiCityTwoWeeksForecast[5].tmin)/2}}°C</p>
      </div>
      
      <div class="pb-2">
        <p class="capitalize text-slate-600" >{{new Date(apiCityTwoWeeksForecast[6].datetime).toLocaleDateString('fr-FR', { weekday: 'long' }) + ' ' + new Date(apiCityTwoWeeksForecast[6].datetime).getDate()}}</p>
        <p class="text-blue-900 font-semibold">{{(apiCityTwoWeeksForecast[6].tmax + apiCityTwoWeeksForecast[6].tmin)/2}}°C</p>
      </div>
      
      <div class="pb-2">
        <p class="capitalize text-slate-600" >{{new Date(apiCityTwoWeeksForecast[7].datetime).toLocaleDateString('fr-FR', { weekday: 'long' }) + ' ' + new Date(apiCityTwoWeeksForecast[7].datetime).getDate()}}</p>
        <p class="text-blue-900 font-semibold">{{(apiCityTwoWeeksForecast[7].tmax + apiCityTwoWeeksForecast[7].tmin)/2}}°C</p>
      </div>
      
      <div class="pb-2">
        <p class="capitalize text-slate-600" >{{new Date(apiCityTwoWeeksForecast[8].datetime).toLocaleDateString('fr-FR', { weekday: 'long' }) + ' ' + new Date(apiCityTwoWeeksForecast[8].datetime).getDate()}}</p>
        <p class="text-blue-900 font-semibold">{{(apiCityTwoWeeksForecast[8].tmax + apiCityTwoWeeksForecast[8].tmin)/2}}°C</p>
      </div>
      
      <div class="pb-2">
        <p class="capitalize text-slate-600" >{{new Date(apiCityTwoWeeksForecast[9].datetime).toLocaleDateString('fr-FR', { weekday: 'long' }) + ' ' + new Date(apiCityTwoWeeksForecast[9].datetime).getDate()}}</p>
        <p class="text-blue-900 font-semibold">{{(apiCityTwoWeeksForecast[9].tmax + apiCityTwoWeeksForecast[9].tmin)/2}}°C</p>
      </div>
      
      <div class="pb-2">
        <p class="capitalize text-slate-600" >{{new Date(apiCityTwoWeeksForecast[10].datetime).toLocaleDateString('fr-FR', { weekday: 'long' }) + ' ' + new Date(apiCityTwoWeeksForecast[10].datetime).getDate()}}</p>
        <p class="text-blue-900 font-semibold">{{(apiCityTwoWeeksForecast[10].tmax + apiCityTwoWeeksForecast[10].tmin)/2}}°C</p>
      </div>
      
      <div class="pb-2">
        <p class="capitalize text-slate-600" >{{new Date(apiCityTwoWeeksForecast[11].datetime).toLocaleDateString('fr-FR', { weekday: 'long' }) + ' ' + new Date(apiCityTwoWeeksForecast[11].datetime).getDate()}}</p>
        <p class="text-blue-900 font-semibold">{{(apiCityTwoWeeksForecast[11].tmax + apiCityTwoWeeksForecast[11].tmin)/2}}°C</p>
      </div>
      
      <div class="pb-2">
        <p class="capitalize text-slate-600" >{{new Date(apiCityTwoWeeksForecast[12].datetime).toLocaleDateString('fr-FR', { weekday: 'long' }) + ' ' + new Date(apiCityTwoWeeksForecast[12].datetime).getDate()}}</p>
        <p class="text-blue-900 font-semibold">{{(apiCityTwoWeeksForecast[12].tmax + apiCityTwoWeeksForecast[12].tmin)/2}}°C</p>
      </div>
      
      <div class="pb-2">
        <p class="capitalize text-slate-600" >{{new Date(apiCityTwoWeeksForecast[13].datetime).toLocaleDateString('fr-FR', { weekday: 'long' }) + ' ' + new Date(apiCityTwoWeeksForecast[13].datetime).getDate()}}</p>
        <p class="text-blue-900 font-semibold">{{(apiCityTwoWeeksForecast[13].tmax + apiCityTwoWeeksForecast[13].tmin)/2}}°C</p>
      </div>        
   </div>
</template>