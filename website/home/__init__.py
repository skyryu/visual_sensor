'''
Home page Blueprint
'''
from flask import Blueprint
home = Blueprint('home', __name__, url_prefix='/home_jinrong')
from . import home_views, home_models, home_ajax, home_file_serv