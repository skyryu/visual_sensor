#! /usr/bin/env python

from website import app, db
from website.auth.auth_models import User  
from flask_script import Manager, prompt_bool
from flask_migrate import Migrate, MigrateCommand

manager = Manager(app)
migrate = Migrate(app, db)

manager.add_command('db', MigrateCommand)

@manager.command
def insert_data():
    db.create_all()
    db.session.add(User(username='hongjin', email='skyryuhhj@gmail.com', password='test'))
    db.session.add(User(username='skyryu', email='skyryu@126.com', password='test'))
    db.session.commit()
    print('Initalized the database')

@manager.command
def dropdb():
    if prompt_bool('Are you sure you want to lose all your data'):
        db.drop_all()
        print('Dropped the database')

if __name__ == '__main__':
    manager.run()