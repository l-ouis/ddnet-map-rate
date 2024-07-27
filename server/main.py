from flask import Flask, request
from flask_cors import CORS, cross_origin
import json
from apscheduler.schedulers.background import BackgroundScheduler

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Since this is a pretty simple project to just have people send in their map ratings, 'security' is just a few whitelisted tokens.

ratings = {}
verified_ratings = {}
# From highest to lowest trust level - just random strings
whitelisted_tokens = ['135a', 'iamatester1', 'ooga', 'letmein!']
CATEGORIES = ['novice', 'moderate', 'brutal', 'insane', 'solo', 'dummy', 'oldschool', 'race', 'ddmax.easy', 'ddmax.next', 'ddmax.nut', 'ddmax.pro', 'fun']

with open('map_data.json', 'r') as file:
    map_data = json.load(file)


def save_ratings():
    with open('ratings.json', 'w') as file:
        json.dump(ratings, file)
    with open('verified_ratings.json', 'w') as file:
        json.dump(verified_ratings, file)
def print_ratings():
    print("Current ratings: ", ratings)
    print("Verified ratings: ", verified_ratings)

scheduler = BackgroundScheduler()
scheduler.add_job(save_ratings, 'interval', hours=1)
scheduler.add_job(print_ratings, 'interval', seconds=30)
scheduler.start()

@app.route('/add-rating', methods=['GET'])
def add_rating():
    name = request.args.get('name')
    token = request.args.get('token')
    map_name = request.args.get('map')
    cat = request.args.get('ratingCategory')
    rating = request.args.get('rating')
    if rating.isdigit() and cat in CATEGORIES and map_name in map_data:
        if token in whitelisted_tokens:
            if name not in verified_ratings:
                verified_ratings[name] = {}
            verified_ratings[name][map_name] = {"r": rating, "c": cat}
        else:
            if name not in ratings:
                ratings[name] = {}
            ratings[name][map_name] = {"r": rating, "c": cat}
        print(f"Rating added successfully: {name} {token} {map_name} {cat} {rating}" )
        return {"result": "success"}
    else:
        return {"result": "error"}

@app.route('/get-ratings', methods=['GET'])
def get_ratings():
    name = request.args.get('name')
    token = request.args.get('token')
    print(name, token)
    if token in whitelisted_tokens:
        if name in verified_ratings:
            return {"result": "success", "data": verified_ratings[name]}
        else:
            return {"result": "success", "data": {}}
    elif name in ratings:
        return {"result": "success", "data": ratings[name]}
    else:
        return {"result": "success", "data": {}}

if __name__ == '__main__':
    app.run(debug=True)
