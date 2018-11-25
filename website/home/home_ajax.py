'''
Handlers to provide reponses for home page frontend ajax calls
'''

from datetime import datetime

from flask_login import login_required, login_user, logout_user, current_user
from flask import jsonify, request
from flask import json
from sqlalchemy import or_, and_

from . import home
from .home_models import SensorData
from website import app

class SDEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, SensorData):
            return {'now':obj.time_stamp.strftime('%Y%m%d %H:%M:%S'), 
                    'comp_name':obj.component_name,
                    'value':obj.value
                   }
        return json.JSONEncoder.default(self, obj)


@home.route('/get_sensor_data')
@login_required
def get_sensor_data():
    #app.json_encoder = SDEncoder

    today = datetime.today()
    today_morning = datetime(today.year, today.month, today.day)

    start_str = request.args.get('start', 'default', type=str)
    end_str = request.args.get('end', 'default', type=str)

    start_time = today_morning
    if start_str != 'default':
        start_time = datetime.strptime(start_str, '%Y%m%d %H:%M:%S')

    end_time = datetime.utcnow().strftime('%Y%m%d %H:%M:%S')
    if end_str != 'default':
        end_time = datetime.strptime(end_str, '%Y%m%d %H:%M:%S')

    sensor_name = request.args.get('sensor', 'all', type=str)
    #component_name = request.args.get('component', 'all', type=str)
    #data_type = request.args.get('type', 'all', type=str)
    limit = request.args.get('limit', 100000, type=int)
    
    result = SensorData.query\
        .filter(or_(SensorData.sensor_name==sensor_name, sensor_name=='all'))\
        .filter(and_(SensorData.time_stamp>start_time, SensorData.time_stamp<end_time))\
        .order_by(SensorData.time_stamp).limit(limit).all()

    #sample json return: 
    #{"data":[{"R1":"12.3","R2":0.0,"now":"Mon, 19 Nov 2018 16:19:15 GMT"},
    #         {"R1":"12.3","R2":0.0,"now":"Mon, 19 Nov 2018 16:19:16 GMT"}
    #        ]}
    ret = []
    for item in result:
        if item.component_name == 'R1':
            ret.append({'now':item.time_stamp.strftime('%Y%m%d %H:%M:%S'), 'R1':item.value, 'R2':'0.0'})
    
    index = 0
    for item in result:
        if item.component_name == 'R2':
            while index < len(ret) and ret[index]['now'] < item.time_stamp.strftime('%Y%m%d %H:%M:%S'):
                index += 1
            
            if index == len(ret):#time exceed max R1 time_stamp
                ret.append({'now': item.time_stamp.strftime('%Y%m%d %H:%M:%S'), 'R1':'0.0', 'R2':item.value})
            elif ret[index]['now'] == item.time_stamp.strftime('%Y%m%d %H:%M:%S'):#index < len & R2 time_stamp match with R1
                ret[index]['R2'] = item.value
            else:#index < len & R2 time stamp > ret[index].time stamp
                ret.insert(index, {'now':item.time_stamp.strftime('%Y%m%d %H:%M:%S'), 'R1':'0.0', 'R2':item.value})

    return jsonify(data=ret)
    '''
    return jsonify(data=SensorData.query\
        .filter(or_(SensorData.sensor_name==sensor_name, sensor_name=='all'))\
        .filter(or_(SensorData.component_name==component_name, component_name=='all'))\
        .filter(or_(SensorData.data_type==data_type, data_type=='all'))\
        .filter(and_(SensorData.time_stamp>start_time, SensorData.time_stamp<end_time))\
        .order_by(SensorData.time_stamp).limit(limit).all()
    )
    '''