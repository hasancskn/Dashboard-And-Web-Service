def add_age_gender_info(dashboard_data, age_gender_data):
    age = [0] * 5
    male = 0
    female = 0
    active_user = 0
    cur_data = age_gender_data['data']
    for row in cur_data:
        if row["age_range"] == '0-17':
            age[0] += 1
        elif row['age_range'] == '18-35':
            age[1] += 1
        elif row['age_range'] == '35-55':
            age[2] += 1
        elif row['age_range'] == '55-65':
            age[3] += 1
        elif row['age_range'] == '65+':
            age[4] += 1

        if row['gender'] == 'E':
            male += 1
        else:
            female += 1

    active_user = male + female

    # add gender info to dashboard data
    dashboard_data["gender"] = [
        {"name": "Male", "users": male},
        {"name": "Female", "users": female},

    ]

    # add age range info to dashboard data
    dashboard_data["agerange"] = [
        {"name": "0-17", "users": age[0]},
        {"name": "18-35", "users": age[1]},
        {"name": "35-55", "users": age[2]},
        {"name": "55-65", "users": age[3]},
        {"name": "65+", "users": age[4]},
    ]

    dashboard_data["activeUsers"] = active_user
    add_ages_persons_info(dashboard_data, age_gender_data)
    #print(dashboard_data)

def add_ages_persons_info(dashboard_data, age_gender_data):
    age_male = [0] * 5
    age_female = [0] * 5
    cur_data = age_gender_data['data']
    for rw in cur_data:
        if rw["age_range"] == '0-17':
            if rw['gender'] == 'E':
                age_male[0] += 1
            else:
                age_female[0] += 1

        elif rw['age_range'] == '18-35':
            if rw['gender'] == 'E':
                age_male[1] += 1
            else:
                age_female[1] += 1
        elif rw['age_range'] == '35-55':
            if rw['gender'] == 'E':
                age_male[2] += 1
            else:
                age_female[2] += 1
        elif rw['age_range'] == '55-65':
            if rw['gender'] == 'E':
                age_male[3] += 1
            else:
                age_female[3] += 1
        elif rw['age_range'] == '65+':
            if rw['gender'] == 'E':
                age_male[4] += 1
            else:
                age_female[4] += 1

    dashboard_data["agemale"] = [
            {"label": "0-17",  "y": age_male[0]},
            {"label": "18-35", "y":  age_male[1]},
            {"label": "35-55", "y": age_male[2]},
            {"label": "55-65", "y": age_male[3]},
            {"label": "65+", "y": age_male[4]},
            ]

    dashboard_data["agefemale"] = [
        {"label": "0-17", "y": age_female[0]},
        {"label": "18-35", "y": age_female[1]},
        {"label": "35-55", "y": age_female[2]},
        {"label": "55-65", "y": age_female[3]},
        {"label": "65+", "y": age_female[4]},
    ]


"""
data = {"look_count": str(self.looked), "not_look_count": str(self.not_looked),
"total_elapsed_time": str(self.total_elapsed_time)}
"""


def add_gaze_info(dashboard_data, gaze_data):
    dashboard_data["device"] = [
        {
            "name": "views",
            "users": gaze_data['not_look_count']
        },
        {
            "name": "nonviews",
            "users": gaze_data['look_count']
        }
    ]

    dashboard_data["gaze_users"] = gaze_data['not_look_count'] + gaze_data['look_count']


