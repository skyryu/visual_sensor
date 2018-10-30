'''
Views for Login and sign up pages
'''

from flask import render_template, request, redirect, url_for, flash
from flask_login import login_required, login_user, logout_user, current_user

from .auth_forms import LoginForm, SignupForm
from .auth_models import User
from . import auth
from website import db, login_manager

@login_manager.user_loader
def load_user(userid):
    return User.query.get(int(userid))

@auth.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        print('form validate on submit')
        #login and validate the user...
        user = User.get_by_username(form.username.data)
        if user is None:
            form.username.errors.append("用户名不存在")
        elif not user.check_password(form.password.data):
            form.password.errors.append("密码错误")
        else:
            print('user login succeeds')
            login_user(user, True)
            return redirect(request.args.get('next') or url_for('main.index'))
    print('after validate on submit')
    return render_template('login.html', form=form)


@auth.route('/signup', methods=['GET', 'POST'])
def signup():
    form = SignupForm()
    if form.validate_on_submit():
        user = User(email=form.email.data,
                    username=form.username.data,
                    password=form.password.data)

        db.session.add(user)
        db.session.commit()
        return redirect(url_for('.login'))
    return render_template('signup.html', form=form)

@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('.login'))