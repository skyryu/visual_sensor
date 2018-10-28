'''
Handlers to provide reponses for home page frontend ajax calls
'''

from datetime import datetime

from flask_login import login_required, login_user, logout_user, current_user
from flask import jsonify, request
#from flask_sqlalchemy import or_, and_

from . import home
from .home_models import SensorData

'''
@app.route('/_add_numbers')
def add_numbers():
    a = request.args.get('a', 0, type=int)
    b = request.args.get('b', 0, type=int)
    return jsonify(result=a + b)
'''



@home.route('/get_sensor_data')
@login_required
def get_sensor_data():
    '''
    today = datetime.today()
    today_morning = datetime(today.year, today.month, today.day)

    start = request.args.get('start', today_morning, type=datetime)
    end = request.args.get('end', datetime.utcnow(), type=datetime)

    sensor_name = request.args.get('sensor', 'all', type=str)
    component_name = request.args.get('component', 'all', type=str)
    data_type = request.args.get('type', 'all', type=str)

    return jsonify(SensorData.query\
        .filter(or_(SensorData.sensor_name==sensor_name, sensor_name=='all'))\
        .filter(or_(SensorData.component_name==component_name, component_name=='all'))\
        .filter(or_(SensorData.data_type==data_type, data_type=='all'))\
        .filter(and_(SensorData.time_stamp>=start, SensorData.time_stamp<end))\
        .all()
    )
    '''
    pass