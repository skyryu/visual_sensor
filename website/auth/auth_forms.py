from flask_wtf import FlaskForm
from wtforms.fields import StringField, PasswordField, BooleanField,\
SubmitField, SelectMultipleField
from wtforms.validators import DataRequired, url, Length, Email, Regexp,\
EqualTo, ValidationError


from .auth_models import User

class LoginForm(FlaskForm):
    '''
    this is the form for user login page
    '''
    username = StringField('Username:', validators=[DataRequired('尚未填写用户名')])
    password = PasswordField('Password:', validators=[DataRequired('尚未填写密码')])

    def validate_username(self, username_field):
        if not User.query.filter_by(username=username_field.data).first():
            raise ValidationError("用户名不存在")

class SignupForm(FlaskForm):
    '''
    this is the form for user sign up page
    '''
    username = StringField('Username:',
                            validators=[DataRequired('请输入用户名'), Length(3, 80),
                                        Regexp('^[A-Za-z0-9_]{3,}$',
                                                message='用户名只能包含字母,数字及下划线'
                                                )])

    password = PasswordField('Password:', validators=[DataRequired('请输入密码')])
    password2 = PasswordField('Confirm password:',
                                validators=[DataRequired('请确认密码'),
                                            EqualTo('password',
                                                    message='两次输入密码不同'
                                                    )])

    email = StringField('Email', validators=[DataRequired('请输入邮箱地址'),
                                             Email('邮箱地址格式错误')])

    def validate_email(self, email_field):
        if User.query.filter_by(email=email_field.data).first():
            raise ValidationError('邮箱已被注册')

    def validate_username(self, username_field):
        if User.query.filter_by(username=username_field.data).first():
            raise ValidationError('用户名已存在')