import requests
from datetime import datetime

def find_valid_dates(years):
    valid_dates = []
    current_year = int(datetime.now().strftime("%Y"))
    for year in range(current_year + 1, current_year + years, 1):
        url = f"https://aa.usno.navy.mil/api/eclipses/solar/year?year={year}"
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            if not "error" in data:
                for eclipse in data["eclipses_in_year"]:
                    if eclipse["day"] != 0 and eclipse["month"] != 0 and eclipse["year"] != 0:
                        valid_dates.append(f"{eclipse['year']}-{eclipse['month']}-{eclipse['day']}")
        else:
            return {"Error": "Something went wrong."}
    return valid_dates
