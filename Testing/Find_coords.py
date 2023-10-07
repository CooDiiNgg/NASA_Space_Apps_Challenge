import requests

def find_coords(country_name):

    base_url = 'https://nominatim.openstreetmap.org/search'
    params = {
        'q': country_name,
        'format': 'json',
    }

    response = requests.get(base_url, params=params)

    if response.status_code == 200:
        data = response.json()

        if len(data) > 0:
            latitude = data[0]['lat']
            longitude = data[0]['lon']
            return {'latitude': latitude, 'longitude': longitude}
        else:
            return {'Error': 'No results found.'}
    else:
        return {'Error': 'Something went wrong.'}