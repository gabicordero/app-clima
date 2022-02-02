window.addEventListener('load', () => {
    let lon;
    let lat;

    let temperaturaValor = document.getElementById('temperatura-valor');
    let temperaturaDescripcion = document.getElementById('temperatura-descripcion');
    let ubicacion = document.getElementById('ubicacion');
    let iconoAnimado = document.getElementById('icono-animado');
    let vientoVelocidad = document.getElementById('viento-velocidad');

    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(posicion => {
          console.log(posicion.coords.latitude)
          lon = posicion.coords.longitude
          lat = posicion.coords.latitude

          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=2136f2265f9967dda39cf52e73df8263&lang=es&units=metric`
          console.log(url)

          fetch(url)
            .then( response => {return response.json()})
            .then( data => {
                let temp = Math.round(data.main.temp)
                temperaturaValor.textContent = `${temp} °C`

                let desc = data.weather[0].description
                temperaturaDescripcion.textContent = desc.toUpperCase()

                ubicacion.textContent = data.name

                vientoVelocidad.textContent = `${data.wind.speed} m/s`
                
                //para iconos estaticos
                /* console.log(data.weather[0].icon)
                let iconCode = data.weather[0].icon
                const urlIcon = `https://openweathermap.org/img/wn/${iconCode}.png`
                console.log(urlIcon) */

                //para iconos animados
                console.log(data.weather[0].main)
                switch(data.weather[0].main) {
                    case 'Clear':
                    iconoAnimado.src = "animated/day.svg"
                    console.log('LIMPIO')
                    break;
                    case 'Cloud':
                    iconoAnimado.src = "animated/cloudy-day-1.svg"
                    console.log('NUBES')
                    break;
                    case 'Thunderstorm':
                    iconoAnimado.src = "animated/thunder.svg"
                    console.log('TORMENTA')
                    break;
                    case 'Drizzle':
                    iconoAnimado.src = "animated/rainy-2.svg"
                    console.log('LLOVIZNA')
                    break;
                    case 'Rain':
                    iconoAnimado.src = "animated/rainy-7.svg"
                    console.log('LLUVIA')
                    break;
                    case 'Snow':
                    iconoAnimado.src = "animated/snowy-6.svg"
                    console.log('NIEVE')
                    break;
                    default:
                    iconoAnimado.src = "animated/weather.svg"
                }



            })
            .catch( error => {
                console.log(error)
            })
      });
          
    }
})