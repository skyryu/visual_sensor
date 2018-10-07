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
def start(c):
    info('Start launching the Supervisord')

    result = c.run(_source_env_str+' && supervisorctl'
                   +_use_config_str+' pid', hide='out')
    if result.stdout.strip().isdigit():
        info('Supervisord is already running')
        restart(c)

    else:
        c.run(_source_env_str+' && supervisord'+_use_config_str
              , echo=True)

        result = c.run(_source_env_str+' && supervisorctl'
                       +_use_config_str+' status', hide='out')
        info('Supervisord started:\n'+result.stdout.strip())

@task
def restart(c):
    info('Restart supervisor fcgi program')
    c.run(_source_env_str
          +' && supervisorctl'+_use_config_str+' stop all'
          +' && supervisorctl'+_use_config_str+' update'
          , echo=True)

    result = c.run(_source_env_str+' && supervisorctl'
                   +_use_config_str+' status', hide='out')
    info('fcgi program restarted:\n'+result.stdout.strip())
