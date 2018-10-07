'''
flup is a fcgi server which implement the fcgi protocal to receive the fcgi msg
from nginx and pass it to flask app. 
'''
from flup.server.fcgi import WSGIServer
from website import app

if __name__ == '__main__':
    WSGIServer(app, bindAddress='/tmp/flask_fastcgi.sock').run()