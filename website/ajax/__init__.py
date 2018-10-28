'''
Ajax Blueprint
'''
from flask import Blueprint
ajax = Blueprint('ajax', __name__)
from . import ajax_views