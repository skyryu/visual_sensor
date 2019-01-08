'''
Home page Blueprint
'''
from flask import Blueprint
home_sk = Blueprint('home_sk', __name__, template_folder=None, url_prefix='/home_sk')
from . import home_views, home_models, home_ajax, home_file_serv