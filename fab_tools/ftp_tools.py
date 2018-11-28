'''
ftp fab tools
'''
from datetime import datetime

from fab_tools import info
from fab_tools import Config
from fab_tools import Respond
from fabric import task

@task
def upload_static_src(c, local_path, serv_path, includes):
    archive_name = 'src.'\
                    +datetime.utcnow().strftime('%y%m%d_%H%M%S')\
                    +'.tar.gz'
    #includes = ['*.jpg', '*.mp4', '*.svg', '*.png', '*.doc']
    tar_cmd = 'cd '+Config[local_path]+' && tar -czvf '+archive_name\
              +' --exclude=\'.*\' '\
              +' '.join(includes)
    c.local(tar_cmd, echo=True)


    #here we temperarily set the owner to ec2 user for ftp access
    c.sudo('chown -R '+Config['ec2_usrname']+' '
           +Config['git_repo_dist_release_path'].format(''), echo=True)

    remote_src_path = Config['git_repo_dist_prod_link']+'/'+Config[serv_path]

    archive_file_path = Config[local_path]+'/'+archive_name
    info('starting putting:'+archive_file_path+' to:'+remote_src_path)
    c.put(archive_file_path, remote_src_path)
    info('put the archived src to '+remote_src_path+'/..')

    #c.sudo('mv '+remote_src_path+ ' '+remote_src_path+'_bak', echo=True)
    #c.sudo('rm -rf '+remote_src_path+'/*', echo=True)
    c.run('cd '+remote_src_path
           +' && tar -xzvf '+archive_name, echo=True)

    c.sudo('rm '+remote_src_path+'/'+archive_name)

    #now we set the owner back to www_client
    c.sudo('chown -R '+Config['website_client_role']
           +':'+Config['website_client_group']
           +' '+Config['git_repo_dist_release_path'].format(''), echo=True)
    
    c.local('cd '+Config[local_path]+' && rm '+archive_name, echo=True)