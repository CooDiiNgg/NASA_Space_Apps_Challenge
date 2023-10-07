from flask import Flask, render_template, request, redirect, url_for, session, flash
import Find_coords
import Find_valid_dates
import Check_dates
import requests

#some constants
years = 5
api = "https://aa.usno.navy.mil/api/eclipses/solar/date" # with parameters date, coords, and hight


app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def get_country():
    if request.method == 'GET':
        return render_template('test.html')
    else:
        country = request.form['country']
        return redirect(url_for('place_data', country_name=country))

@app.route('/test', methods=['GET', 'POST'])
def place_data():
    if request.method == 'GET':
        country = request.args.get('country_name')
        coords = Find_coords.find_coords(country)
        coords = coords['latitude'] + ',' + coords['longitude']
        dates = Find_valid_dates.find_valid_dates(years)
        valid_eclipses = Check_dates.get_valid_eclipses(dates, coords)
        return render_template("valid_eclipses.html", valid_eclipses=valid_eclipses, country=country)


port = 9898

if __name__ == '__main__':
    app.run(debug=False, port=port)


