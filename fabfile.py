'''
install fabric with pip
fab --list  #use this cmd to list all the tasks in $PWD/fabfile.py
fab -i /path/to/private_ssh_key_file -H user@public_domain_name task_name
'''

from fabric import task
from invoke import Exit
from invocations.console import confirm

from fab_tools import conda_tools as conda
from fab_tools import git_tools as git
from fab_tools import supervisor_tools as sup
from fab_tools import bower_tools as bower
from fab_tools import db_tools as db
from fab_tools import nginx_tools as nginx
from fab_tools import auth_tools as auth




@task
def test(c):
    auth.create_role_and_group(c)
    '''
    c.run('export PATH="$PATH:/etc/anaconda/bin"')
    c.run('source /etc/anaconda/bin/activate')
    '''

#All in One cmd set
@task
def deploy_dist(c):
    '''
    deploy a new server, install all tools
    '''
    if not confirm('the deployment will wipe out '
                   +'all the existing packages. Is this ok'):
        raise Exit('aborting dist deployment')
    #nginx installation currently is excluded
    #supervisor installation is delegated to conda using pip
    conda.install_anaconda(c)
    git.install_git(c)
    bower.install_bower(c)
    auth.create_role_and_group(c)

@task
def init_dist(c):
    '''
    First time code pulling for a new server
    '''
    if not confirm('make sure you have run deploy-dist'):
        raise Exit('dist initialization abort')
    git.create_new_release(c)
    conda.create_virtual_env(c)
    conda.create_deploy_env(c)
    bower.bower_pkg_install(c)
    auth.chmod_of_dist_repo(c)
    sup.d_start(c)
    nginx.start(c)

@task
def update_dist(c):
    '''
    code/virtual_env/DB updating
    '''
    if not confirm('make sure you have run init-dist'):
        raise Exit('aborting dist updating')
    git.create_new_release(c)
    conda.update_virtual_env(c)
    conda.update_deploy_env(c)
    bower.update_bower_pkg(c)
    auth.chmod_of_dist_repo(c)
    db.upgrade(c)
    auth.chmod_of_dist_repo(c)
    sup.d_start(c)
    nginx.reload(c)
