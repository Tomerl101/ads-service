# GETTING STARTED 🚀

## Run application (mongodb + ad service)

```bash
 docker-compose up --build
```

Shutdown application:

```bash
docker-compose down
```

### If you get an error when using docker compose

1. inside .env change `MONGO_PATH=mongodb://host.docker.internal:27017/adsTest1` to `MONGO_PATH=mongodb://localhost:27017/adsTest1`
2. comment adsService from docker-compose.yml file
3. run `docker-compose up --build`
4. open new terminal and run `npm run start:debug`

### Dummy document to insert db and test with

```json
({
  "id": "coolAd1",
  "description": "coolAds1Description",
  "imageUrl": "blabla",
  "location": { "type": "Point", "coordinates": [-73.9928, 40.7193] },
  "radius": 100,
  "operatingSystems": ["Windows 10", "macOS Mojave", "macOs", "Linux"],
  "browsers": ["Chrome", "Firefox", "Edge"],
  "tags": ["travel", "asia", "israel"]
},
{
  "id": "coolAd2",
  "description": "coolAds2Description",
  "imageUrl": "blabla",
  "location": { "type": "Point", "coordinates": [-73.9928, 40.7193] },
  "radius": 100,
  "operatingSystems": ["Windows 10", "macOS Mojave", "macOs", "Linux"],
  "browsers": ["Chrome", "Firefox", "Edge"],
  "tags": ["travel", "asia", "jordan"]
},
{
  "id": "coolAd3",
  "description": "coolAds3Description",
  "imageUrl": "blabla",
  "location": { "type": "Point", "coordinates": [-73.9928, 40.7193] },
  "radius": 100,
  "operatingSystems": ["Windows 10", "macOS Mojave", "macOs", "Linux"],
  "browsers": ["Chrome", "Firefox", "Edge"],
  "tags": ["travel", "europe", "franch"]
},
{
  "id": "coolAd4",
  "description": "coolAds3Description",
  "imageUrl": "blabla",
  "location": { "type": "Point", "coordinates": [-73.9928, 40.7193] },
  "radius": 100,
  "operatingSystems": ["Windows 10", "macOS Mojave", "macOs", "Linux"],
  "browsers": ["Chrome", "Firefox", "Edge"],
  "tags": ["lifestyle", "cooking"]
},
{
  "id": "coolAd5",
  "description": "coolAds3Description",
  "imageUrl": "blabla",
  "location": { "type": "Point", "coordinates": [-73.9928, 40.7193] },
  "radius": 100,
  "operatingSystems": ["Windows 10", "macXYZ Mojave", "macOs", "Linux"],
  "browsers": ["ChromeXYZ", "Firefox", "Edge"],
  "tags": ["lifestyle", "cooking"]
}
```

try to send request with the following query params:

http://localhost:5000/ads?lat=40.7193&long=-73.9928&tag=travel&tag=israel
