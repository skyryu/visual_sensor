'''
use SQLAlcheny to persist sensor data
'''

from sqlalchemy import desc
from website import db

class SensorData(db.Model):
    '''
    sensor data store
    '''
    id = db.Column(db.Integer, primary_key=True)
    sensor_name = db.Column(db.String(64))
    component_name = db.Column(db.String(64))
    data_type = db.Column(db.String(64))
    value = db.Column(db.String(64))
    time_stamp = db.Column(db.DateTime)

    __table_args__ = (
        db.Index('ix_sensor_component_type_time', 'sensor_name','component_name',
                 'data_type','time_stamp'),
    )