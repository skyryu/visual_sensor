'''
visual sensor Blueprint
'''
from flask import Blueprint
visual_sensor = Blueprint('visual_sensor', __name__)
from . import visual_sensor_views, visual_sensor_models