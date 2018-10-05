'''
Views for home page
'''

from flask import render_template, request, redirect, url_for
from flask_login import login_required

from . import home
from website import db

@home.route('/main')
@login_required
def main():
    return render_template('home.html')