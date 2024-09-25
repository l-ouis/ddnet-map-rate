# ddnet map rate

Pretty simple nodejs + react + python flask app to compile ddnet map ratings with a decent UI. Mainly for fun and practice, please don't expect durability!

No complex authentication set up -- users send requests with a simple name and token (which is given to trusted users manually).

![image](https://github.com/user-attachments/assets/008e5f3d-172f-4cb4-b698-730716181791)


## how to run:

if you want to generate map data yourself, download the ddnet maps master (ddnet.org/download) and put it in root folder, then 
run the python script in the frontend folder and have copies in frontend/data and server/ (will be fixed sometime)

`cd server` -> `python main.py`
`cd frontend` -> `npm install` -> `npm start`

## todo:
- Add leaderboard
- fix python map getter script
- Better typing across the board
- testing for both front+backend
- use production libraries for backend
- 
