from flask import Flask, request
import time
import helper
import datetime

from random import *
from flask import jsonify

app = Flask(__name__)


@app.route('/hello_world')
def hello_world():
    return 'Hello World!'


# Real Time için gidecek verilerin % hesaplamalarını yapar
def hesap(a, b=2):
    ret = []
    for i in range(0, b):
        if i == b - 1:
            ret.append(a)
        else:
            f = randint(0, a)
            a = a - f
            ret.append(f)
    return ret


# New vs Returning visitors için oluşturulacak verilerin yanlış sonuç vermesini engeller
def control(c, d):
    v = []
    while (True):
        i = 0
        p = c + d
        if (c < d) & (p != 500000):
            c = randint(200000, 500000)
            i = i + 1
        else:
            if i != 0:
                d = c - d
                v.append(c)
                v.append(d)
            else:
                v.append(c)
                v.append(d)
            break
    return v


# Revenues için verileri oluşturur
def revenues():
    r = []
    for i in range(0, 12):
        q = randint(5000, 40000)
        r.append(q)
    return r


# peak times için verileri oluşturur
def peakt():
    p = []
    for i in range(0, 12):
        q = randint(5000, 40000)
        p.append(q)
    return p


@app.route('/get_overview_revenue', methods=['GET'])
# Revenues için verileri gönderir
def revenue():
    r = revenues()
    data = [
        {
            "color": "#393f63",
            "markerSize": 0,
            "type": "splineArea",
            "yValueFormatString": "$###,###.##",
            "dataPoints": [
                {"x": 'new Date("1 Jan 2018")', "y": r[0]},
                {"x": 'new Date("1 Feb 2018")', "y": r[1]},
                {"x": 'new Date("1 Mar 2018")', "y": r[2]},
                {"x": 'new Date("1 Apr 2018")', "y": r[3]},
                {"x": 'new Date("1 May 2018")', "y": r[4]},
                {"x": 'new Date("1 Jun 2018")', "y": r[5]},
                {"x": 'new Date("1 Jul 2018")', "y": r[6]},
                {"x": 'new Date("1 Aug 2018")', "y": r[7]},
                {"x": 'new Date("1 Sep 2018")', "y": r[8]},
                {"x": 'new Date("1 Oct 2018")', "y": r[9]},
                {"x": 'new Date("1 Nov 2018")', "y": r[10]},
                {"x": 'new Date("1 Dec 2018")', "y": r[11]}
            ]
        }
    ]
    res = jsonify(data)
    res.headers.add('Access-Control-Allow-Origin', '*')
    return res


@app.route('/get_overview_peak', methods=['GET'])
# peak times için verileri gönderir
def peak():
    p = peakt()
    data = [
        {
            "color": "#393f63",
            "lineThickness": 3,
            "markerSize": 0,
            "type": "spline",
            "dataPoints": [
                {"x": 'new Date("1 Jan 2018")', "y": p[0]},
                {"x": 'new Date("1 Feb 2018")', "y": p[1]},
                {"x": 'new Date("1 Mar 2018")', "y": p[2]},
                {"x": 'new Date("1 Apr 2018")', "y": p[3]},
                {"x": 'new Date("1 May 2018")', "y": p[4]},
                {"x": 'new Date("1 Jun 2018")', "y": p[5]},
                {"x": 'new Date("1 Jul 2018")', "y": p[6]},
                {"x": 'new Date("1 Aug 2018")', "y": p[7]},
                {"x": 'new Date("1 Sep 2018")', "y": p[8]},
                {"x": 'new Date("1 Oct 2018")', "y": p[9]},
                {"x": 'new Date("1 Nov 2018")', "y": p[10]},
                {"x": 'new Date("1 Dec 2018")', "y": p[11]}
            ]
        }
    ]
    res = jsonify(data)
    res.headers.add('Access-Control-Allow-Origin', '*')
    return res


@app.route('/get_overview', methods=['GET'])
# New ve returning visitors için verileri gönderir
def visit():
    m = []
    newvisit = randint(200000, 500000)
    retvisit = newvisit - 500000
    if retvisit <= 0:
        retvisit = -1 * retvisit
    v = control(newvisit, retvisit)  # Gelen verileri kontrol eder

    dataVisitors = {
        "totalVisitors": sum(v),
        "New vs Returning Visitors":
            [
                {
                    "cursor": "pointer",
                    "explodeOnClick": "false",
                    "innerRadius": "75%",
                    "legendMarkerType": "square",
                    "name": "New vs Returning Visitors",
                    "radius": "100%",
                    "showInLegend": "true",
                    "startAngle": "90",
                    "type": "doughnut",
                    "dataPoints": [
                        {"name": "New Visitors", "y": v[0]},
                        {"name": "Returning Visitors", "y": v[1]}
                    ]
                }
            ]
    }
    res = jsonify(dataVisitors)
    res.headers.add('Access-Control-Allow-Origin', '*')
    return res


dashboard_data = {
    "activeUsers": 0,
    "emotions": [
        {
            "name": "Happy",
            "users": 30
        },
        {
            "name": "Disgust",
            "users": 5
        },
        {
            "name": "Suprised",
            "users": 19
        },
        {
            "name": "Confused",
            "users": 15
        },
        {
            "name": "Angry",
            "users": 10
        }
    ],
    "device": [
        {
            "name": "views",
            "users": 0
        },
        {
            "name": "nonviews",
            "users": 0
        }
    ],
    "pageViewsPerSecondLowerLimit": 0,
    "pageViewsPerSecondUpperLimit": 3,

    "gender": [
        {"name": "Male", "users": 0},
        {"name": "Female", "users": 0},

    ],

    "agerange": [
        {"name": "0-17", "users": 0},
        {"name": "18-35", "users": 0},
        {"name": "35-55", "users": 0},
        {"name": "55-65", "users": 0},
        {"name": "65+", "users": 0},
    ],
    "agemale": [
        {"name": "0-17", "users": 0},
        {"name": "18-35", "users": 0},
        {"name": "35-55", "users": 0},
        {"name": "55-65", "users": 0},
        {"name": "65+", "users": 0}
    ],
    "agefemale": [
        {"name": "0-17", "users": 0},
        {"name": "18-35", "users": 0},
        {"name": "35-55", "users": 0},
        {"name": "55-65", "users": 0},
        {"name": "65+", "users": 0}
    ],

    "age_update_time": "NaN",
    "gaze_update_time": "NaN"
}

gaze_info = ""
age_gender_data = ""


@app.route('/send_age_gender_data', methods=['GET', 'POST'])
# Real Time için veriler gönderir
def accept_age_gender_data():
    global age_gender_data
    if request.method == 'POST':
        age_gender_data = request.get_json(cache=False)
        dashboard_data["age_update_time"] = datetime.datetime.now().strftime("Last Age/Gender Sync @ %d-%m-%y %H:%M:%S")
    else:
        print("GET")
    response = jsonify(age_gender_data)
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response


@app.route('/get_data2', methods=['GET', 'POST'])
def feed_dashboard():
    global dashboard_data, age_gender_data, gaze_info
    t = time.time()
    # if available, add recent age/gender info
    if age_gender_data != "":
        helper.add_age_gender_info(dashboard_data, age_gender_data)

    # if available, add recent gaze info
    if gaze_info != "":
        helper.add_gaze_info(dashboard_data, gaze_info)

    response = jsonify(dashboard_data)
    response.headers.add('Access-Control-Allow-Origin', '*')
    print("Work time before response: {}".format(time.time() - t))
    return response


@app.route('/send_gaze_info', methods=['GET', 'POST'])
def accept_gaze_info():
    global gaze_info
    if request.method == 'POST':
        gaze_info = request.get_json(cache=False)
        dashboard_data["gaze_update_time"] = datetime.datetime.now().strftime("Last Gaze Sync @ %d-%m-%y %H:%M:%S")
    else:
        print("GET")
    print(gaze_info)
    response = jsonify(gaze_info)
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)

