import requests

def get_valid_eclipses(dates, coords):
    valid_eclipses = []
    for date in dates:
        api = f"https://aa.usno.navy.mil/api/eclipses/solar/date?date={date}&coords={coords}&height=0"
        response = requests.get(api)
        if response.status_code == 200:
            eclipse_data = response.json()
            if "error" not in eclipse_data:
                try:
                    valid_eclipses.append({
                        "date": date,
                        "duration": eclipse_data["properties"]["duration"],
                        "begining": eclipse_data["properties"]["local_data"][0]["time"],
                        "maximum": eclipse_data["properties"]["local_data"][1]["time"],
                        "end": eclipse_data["properties"]["local_data"][2]["time"],
                    })
                except:
                    return {"Error": "Something went wrong."}
    return valid_eclipses
