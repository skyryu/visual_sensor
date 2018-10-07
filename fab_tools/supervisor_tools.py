'''
supervisor fab tools
Notice:
1) when setting up the fcgi_program, the unix domain socket
should start with unix:// like the https://
2) when use the supervisorctl, must use:
    supervisorctl -c config/file/path action
to make sure the ctl use unix domain socket to RPC with supervisord
server. By default it will use the tcp port.

In web server terminal, you may use below cmd to check all the
available CLI interactions with supervisord:
supervisorctl -c /srv/dist/site/prod/supervisord.conf help 
'''

from fab_tools import info
from fab_tools import Config
from fabric import task


_source_env_str = 'source '+Config['conda_install_path']\
                  +'/bin/activate '+Config['deploy_env_path']
_use_config_str = ' -c '+Config['git_repo_dist_prod_link']\
                  +'/'+Config['supervisor_config_file_path']

@task
def d_start(c):
    '''
    supervisord needs to be restarted if there is a change of
    the set of programs controlled by it
    '''

    info('Start launching the Supervisord')

    ctl_path = c.run(_source_env_str+' && which supervisorctl').stdout.strip()
    d_path = c.run(_source_env_str+' && which supervisord').stdout.strip()

    result = c.run(_source_env_str+' && sudo '+ctl_path+' '
                   +_use_config_str+' pid', hide='out', warn=True)
    if result.stdout.strip().isdigit():
        info('Supervisord is already running, restarting')
        c.sudo('kill -SIGTERM '+result.stdout.strip(), echo=True)
    
    c.run(_source_env_str+ '&& sudo '+d_path+' '+_use_config_str, echo=True, pty=True)

    result = c.run(_source_env_str+' && sudo '+ctl_path+' '
                   +_use_config_str+' status', hide='out')
    info('Supervisord started:\n'+result.stdout.strip())

@task
def ctl_restart(c):
    info('Restart supervisor fcgi program')
    c.run(_source_env_str
          +' && supervisorctl'+_use_config_str+' stop all'
          +' && supervisorctl'+_use_config_str+' update'
          , echo=True)

    result = c.run(_source_env_str+' && supervisorctl'
                   +_use_config_str+' status', hide='out')
    info('fcgi program restarted:\n'+result.stdout.strip())
