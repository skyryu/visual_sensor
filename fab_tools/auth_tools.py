'''
access management and role/group creation fab tools
'''

from fab_tools import info
from fab_tools import Config
from fabric import task


@task
def remove_role_and_group(c):
    info('Start removing role and group')
    c.sudo('userdel -r '+Config['website_client_role']+' && groupdel '
           +Config['website_client_group'], echo=True)

@task
def create_role_and_group(c):
    info('Start adding role and group')
    result = c.run('less /etc/group | grep -n '
                   +Config['website_client_group'],
                   hide='out', warn=True)
    if result.stdout.strip():
        info('group already exists:'+result.stdout.strip())
    else:
        c.sudo('groupadd '+Config['website_client_group'], echo=True)
    
    result = c.run('less /etc/passwd | grep -n '
                   +Config['website_client_role'],
                   hide='out', warn=True)
    if result.stdout.strip():
        info('username already exists:'+result.stdout.strip())
    else:
        c.sudo('useradd -s /sbin/nologin '+Config['website_client_role']
               +' -g '+Config['website_client_group'], echo=True)

@task
def chmod_of_dist_repo(c):
    c.sudo('chown -R '+Config['website_client_role']
           +':'+Config['website_client_group']
           +' '+Config['git_repo_dist_prod_link'])