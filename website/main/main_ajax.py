'''
Handlers to provide reponses for home page frontend ajax calls
'''

from datetime import datetime

from flask_login import login_required, login_user, logout_user, current_user
from flask import jsonify, request
from flask import json
from sqlalchemy import or_, and_

from . import main
from .main_models import CheckTable
from website import db



@main.route('/save_check_result', methods=['POST'])
@login_required
def save_check_result():
    project_name = request.form.get('proj', 'none', type=str)
    modal_name = request.form.get('modal', 'none', type=str)
    field_id_begin = request.form.get('f_beg', 0, type=int)
    field_id_end = request.form.get('f_end', 0, type=int)
    field_prefix = request.form.get('f_prefix', 0, type=str)
    check_date = request.form.get('date','none',type=str)

    if project_name == 'none' or modal_name == 'none'\
       or check_date == 'none' or check_date == '':
        return jsonify(data={'status':'invalid parameter'})

    #1) delete old data
    for i in range(field_id_begin, field_id_end+1):
        check_field = field_prefix+str(i)
        result = CheckTable.query\
            .filter(CheckTable.project_name==project_name)\
            .filter(CheckTable.modal_name==modal_name)\
            .filter(CheckTable.check_field==check_field)\
            .filter(CheckTable.check_date==check_date)\
            .all()
        for item in result:
            db.session.delete(item)
    db.session.commit()

    #2) create new one
    insert_cnt = 0
    for i in range(field_id_begin, field_id_end+1):
        check_field = field_prefix+str(i)
        value=request.form.get(check_field,'none',type=int),
        if value != 'none':
            checkTable = CheckTable(
                project_name=project_name,
                modal_name=modal_name,
                check_field=check_field,
                value=request.form.get(check_field,'none',type=int),
                check_date=check_date
            )
            db.session.add(checkTable)
            insert_cnt+=1
    db.session.commit()

    return jsonify(data={'status':'success','insert_cnt':insert_cnt})


@main.route('/get_check_result', methods=['GET'])
@login_required
def get_check_result():

    project_name = request.args.get('proj', 'none', type=str)
    modal_name = request.args.get('modal', 'none', type=str)
    check_date = request.args.get('date','none',type=str)

    print(project_name+' '+modal_name+' '+check_date)
    result = CheckTable.query\
        .filter(CheckTable.project_name==project_name)\
        .filter(CheckTable.modal_name==modal_name)\
        .filter(CheckTable.check_date==check_date)\
        .all()

    ret = []
    for item in result:
        ret.append({'field':item.check_field, 'value':item.value})
    return jsonify(data=ret)