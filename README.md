# ddnet map rate

Pretty simple nodejs + react + python flask app to compile ddnet map ratings with a decent UI. Mainly for fun and practice, please don't expect durability!

No complex authentication set up -- users send requests with a simple name and token (which is given to trusted users manually).

## how to run:

download the ddnet maps master (ddnet.org/download) and put it in root folder, then 
run the python script in the frontend folder and have copies in frontend/data and server/ (will be fixed sometime)

`cd server` -> `python main.py`
`cd frontend` -> `npm install` -> `npm start`

## todo:
- Add leaderboard
- fix python map getter script
- Better typing across the board
- testing for both front+backend
