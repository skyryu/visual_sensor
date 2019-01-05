'''
fab_tools package defines all the environment package
for server deployment, initialization and updating.
'''
from invoke import Responder

Branch={
    #introduced in feature/supportBranchBasedWebSiteDist
    #check the README of this feature for more details
    'name':'feature/supportBranchBasedWebSiteDist',
    'site_root':'/srv/dist/supportBranchBasedWebSiteDist',
}

Config={
    #auth
    'website_client_role':'www',
    'website_client_group':'www',

    #nginx
    'nginx_conf_file_srv_path':'/etc/nginx',
    'nginx_conf_file_repo_path':'config/nginx.conf',
    'nginx_tmp_buffer':'/var/lib/nginx', #this is the buffer place for large content 

    #supervisor
    #'pname':'flask_app',
    'supervisor_config_file_path':'config/supervisord.conf',
    'fastcgi_sock':'/tmp/flask_fastcgi.sock',

    #AWS EC2 config
    'ec2_usrname':'ec2-user',

    #conda config
    'conda_script_path':'~/anaconda.sh',
    'conda_install_path':'/etc/anaconda',
    'conda_version':'Anaconda2-5.2.0-Linux-x86_64.sh',


    #conda env config
    #'env_name':'flask_py3', the -n will override the -p option
    'env_dir_path':Branch['site_root']+'/prod/conda_env/flask_py3',
    'deploy_env_path':Branch['site_root']+'/prod/conda_env/deploy_py2',
    'deploy_env_yaml_path':Branch['site_root']+'/prod/deploy_env.yaml',
    'env_yaml_path':Branch['site_root']+'/prod/environment.yaml',
    'pip_conf_path':'~/.pip/pip.conf',

    #git config
    'git_username':'skyryu',
    'git_useremail':'skyryu@126.com',
    'git_ssh_key_path': "/home/ec2-user/.ssh/id_rsa",

    #git repo config
    'git_repo_dist_prod_link': Branch['site_root']+'/prod',
    'git_repo_dist_release_path': Branch['site_root']+'{0}',
    'github_repo_url':'git@github.com:skyryu/visual_sensor.git',

    #bower config
    'bower_path':Branch['site_root']+'/prod/website/static',

    #ftp
    'local_src_path': '/Users/hongjin/Code/Py/git_repo/visual_sensor/website/static/src',
    'srv_src_path': 'website/static/src',

    'local_download_path': '/Users/hongjin/Code/Py/git_repo/visual_sensor/website/static/downloads',
    'srv_download_path': 'website/static/downloads',
}


INSTALL_RESPOND = Responder(pattern=r"Is this ok \[(Y|N|y|n)+.*]:.*",
                            response="y\n")
Respond = {
    #git install responder
    'git_(un)install_confirm':INSTALL_RESPOND,
    'git_passphrase':Responder(
        pattern=r"Enter (same )*passphrase.*",
        response="\n"),
    'git_ssh_path_confirm':Responder(
        pattern=r"Enter file in which to save the key.*",
        response=Config['git_ssh_key_path']+"\n"),

    #bower install responder
    'npm_(un)install_confirm':INSTALL_RESPOND,
}


def info(info_str):
    '''
    provide colorful terminal info output.
    '''
    INFO_COLOR = "\033[0;36m"
    INFO_END = "\033[0m"
    print(INFO_COLOR+'[INFO]'+info_str+INFO_END)
