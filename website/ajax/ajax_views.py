'''
Handlers to provide reponse for frontend ajax call
'''

from flask import render_template, request, redirect, url_for, flash
from flask_login import login_required, login_user, logout_user, current_user

from . import ajax
from website import db, login_manager


from flask import jsonify, request

@app.route('/_add_numbers')
def add_numbers():
    a = request.args.get('a', 0, type=int)
    b = request.args.get('b', 0, type=int)
    return jsonify(result=a + b)``