const API_URL = 'https://aviationweather.gov/api/data/pirep?bbox=-180,-180,180,180&format=json&age=1'

const COLORS = {
  'NEG': "#0074ae",
  'LGT': "#fef500",
  'LGT-MOD': "#ff7800",
  'MOD': "#ff7800",
  'MOD-SEV': "#d50202",
  'SEV': "#d50202",
  'EXTM': "#8e0057"
}


async function plotTurbulence(map) {
  const data = await fetch('./data.json')
  const resData = await data.json()
  const pirep = resData.filter(r => r.pirepType.includes('PIREP') && r.tbInt1)
  pirep.forEach(rep => {
    L.circleMarker([rep.lat, rep.lon], {
      radius: 5,
      fillColor: COLORS[rep.tbInt1],
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8,
    }).addTo(map);
  });
}