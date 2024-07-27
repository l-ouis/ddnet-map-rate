import os
import pickle
import json

map_path = "../ddnet-maps"
maps = []
map_data = {}
map_categories = {}

id = 1
for root, dirs, files in os.walk(map_path):
    for file in files:
        if file.endswith('.map'):
            map_name = os.path.splitext(file)[0]
            maps.append(map_name)
            parent_folder = os.path.dirname(root)
            category = os.path.basename(parent_folder)
            map_data[map_name] = {"cat": category}
            map_data[map_name]["id"] = id
            id += 1
            if category in map_categories:
                map_categories[category].append(map_name)
            else:
                map_categories[category] = []
                map_categories[category].append(map_name)


map_img_names = [
    ''.join(char if char.isalnum() or char in '_' else '_' for char in map_name)
    for map_name in maps
]

map_img_names = [f"https://ddnet.org/ranks/maps/{name}.png" for name in map_img_names]

for map_name in maps:
    img_url = ''.join(char if char.isalnum() or char in '_' else '_' for char in map_name)
    img_url = "https://ddnet.org/ranks/maps/" + img_url + ".png"
    map_data[map_name]["img"] = img_url

with open('data/map_data.json', 'w') as json_file:
    json.dump(map_data, json_file, indent=4)

with open('data/map_categories.json', 'w') as json_file:
    json.dump(map_categories, json_file, indent=4)

print(map_categories.keys())
