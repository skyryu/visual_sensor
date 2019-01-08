'''
file upload/download services for home page
'''
import os
from flask import send_from_directory, make_response
from flask_login import login_required
from . import home_sk


@home_sk.route('/download/<filename>')
@login_required
def download(filename):
    cwd = os.getcwd()
    print('download:'+cwd+'/website/static/downloads/'+filename)
    response = make_response(send_from_directory(
        cwd+'/website/static/downloads', filename, as_attachment=True)
    )
    response.headers.set('Content-Disposition', 
        'attachment; filename={}'.format(filename.encode().decode('latin-1'))
    )
    return response