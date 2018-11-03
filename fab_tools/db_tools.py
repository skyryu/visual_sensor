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


