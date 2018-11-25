'''
db fab tools
'''

from fab_tools import info
from fab_tools import Config
from fabric import task



@task
def upgrade(c):
    info('Start upgrade SQLAlchemy DB')
    info('Make sure the db path is under correct Access previlege')
    c.run('source /etc/anaconda/bin/activate '+Config['env_dir_path']
          +' && cd '+Config['git_repo_dist_prod_link']
          +' && python manage.py db upgrade', echo=True)

@task
def insert_testing_data(c):
    info('Start inserting QA testing data into db')
    info('Make sure the db path is under correct Access previlege')

    #here we temperarily set the owner to ec2 user for ftp access
    c.sudo('chown -R '+Config['ec2_usrname']+' '
           +Config['git_repo_dist_release_path'].format(''), echo=True)

    info('step1> drop existing tables')
    c.run('source /etc/anaconda/bin/activate '+Config['env_dir_path']
          +' && cd '+Config['git_repo_dist_prod_link']
          +' && python manage.py dropdb', echo=True)

    info('step2> create tables')
    c.run('source /etc/anaconda/bin/activate '+Config['env_dir_path']
          +' && cd '+Config['git_repo_dist_prod_link']
          +' && python manage.py insert_data', echo=True)

    info('step3> create tables')
    c.run('source /etc/anaconda/bin/activate '+Config['env_dir_path']
          +' && cd '+Config['git_repo_dist_prod_link']
          +' && python manage.py db_insertSensorData', echo=True)

    #now we set the owner back to www_client
    c.sudo('chown -R '+Config['website_client_role']
           +':'+Config['website_client_group']
           +' '+Config['git_repo_dist_release_path'].format(''), echo=True)