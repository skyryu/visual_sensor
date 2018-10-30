'''
Views for index page and error handles
'''

from flask import render_template, request, redirect, url_for, flash
from flask_login import login_required, current_user
from . import main
from website import db

@main.route('/')
@main.route('/index')
@login_required
def index():
    return render_template('index.html')
    #return redirect(url_for('home.main'))

@main.app_errorhandler(403)
def permission_deny(e):
    return render_template('403.html'), 403

@main.app_errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@main.app_errorhandler(500)
def server_error(e):
    return render_template('500.html'), 500

'''
@main.app_context_processor
def inject_tags():
    return dict(all_tags=Tag.all)
'''