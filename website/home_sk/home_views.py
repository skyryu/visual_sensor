'''
Views for home page
'''

from flask import render_template, request, redirect, url_for
from flask_login import login_required, current_user

from . import home_sk
from website import db

@home_sk.route('/main')
@login_required
def main():
    return render_template('home_sk/home.html')