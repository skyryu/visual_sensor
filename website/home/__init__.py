'''
Home page Blueprint
'''
from flask import Blueprint
home = Blueprint('home', __name__)
from . import home_views, home_models, home_ajax, home_file_serv