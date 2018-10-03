'''
use SQLAlcheny to persist auth data
'''

from sqlalchemy import desc
from flask_login import UserMixin
from werkzeug.security import check_password_hash, generate_password_hash

from website import db

class User(db.Model, UserMixin):
    '''
    user store
    '''
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True)
    email = db.Column(db.String(120), unique=True)
    password_hash = db.Column(db.String) #store the hash of password instead
                                         #of the plain text as password in plain text is dangerous

    @property
    def password(self):
        raise AttributeError('Password: write-only field')

    @password.setter
    def password(self, pswd):
        self.password_hash = generate_password_hash(pswd)

    def check_password(self, pswd):
        return check_password_hash(self.password_hash, pswd)

    @staticmethod
    def get_by_username(username):
        return User.query.filter_by(username=username).first()

    def __repr__(self):
        return '<User %r>' % self.username