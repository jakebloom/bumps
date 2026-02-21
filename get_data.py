import requests
import json

BASE = "https://aviationweather.gov/api/data/pirep"

def get_data():
  results = []
  for lat in range(-90, 90, 20):
    for long in range(-180, 180, 20):
      bbox = f"{lat},{long},{lat+20},{long+20}"
      res = requests.get(BASE, {'bbox': bbox, "format": "json", "age": 2})
      if res.status_code == 200:
        results.extend(res.json())
        print(f"Got for {bbox}")
      else:
        print(f"Unable to get for {bbox}")

  with open("./data.json", "w") as f:
    f.truncate()
    f.write(json.dumps(results))

if __name__ == '__main__':
  get_data()