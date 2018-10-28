#! /usr/bin/env python

from website import app, db
from website.auth.auth_models import User  
from website.home.home_models import SensorData  
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

@manager.command
def qa_realtime_data_test():
    db.session.query(SensorData).delete()
    print('delete all sensor data')

    from datetime import datetime
    from time import sleep
    from random import Random
    rand = Random()
    rand.seed()

    n = 0
    while n < 500:
        db.session.add(SensorData(sensor_name='sensorA',
                                  component_name='compA',
                                  data_type='typeA',
                                  value=rand.uniform(1,100),
                                  time_stamp=datetime.utcnow()
                                 ))
        db.session.commit()
        sleep(1)
        

if __name__ == '__main__':
    manager.run()