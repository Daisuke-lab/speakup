import requests

def insert_countries():
    url = "https://restcountries.com/v3.1/all"
    res = requests.get(url)
    countries = res.json()
    for country in countries:
        label = country["name"]["common"]
        code = country["cca"]
        language = country["languages"].get(country["languages"].keys()[0])