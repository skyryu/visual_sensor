'''
Main page Blueprint
'''
from flask import Blueprint
main = Blueprint('main', __name__)
from . import main_views, main_models, main_ajax