'''
use SQLAlcheny to persist proj check table
'''

from website import db

class CheckTable(db.Model):
    '''
    the table for daily and scheduled check
    '''
    id = db.Column(db.Integer, primary_key=True)
    project_name = db.Column(db.String(64))
    modal_name = db.Column(db.String(64))#what type of check
    check_field = db.Column(db.String(64))
    value = db.Column(db.String(64))
    check_date = db.Column(db.String(32))

    __table_args__ = (
        db.Index('ix_proj_modal_date', 'project_name','modal_name',
                 'check_date'),
    )