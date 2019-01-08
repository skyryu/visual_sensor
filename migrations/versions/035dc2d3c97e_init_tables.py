"""init tables

Revision ID: 035dc2d3c97e
Revises: 
Create Date: 2019-01-09 00:45:12.898573

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '035dc2d3c97e'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('sensor_data',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('sensor_name', sa.String(length=64), nullable=True),
    sa.Column('component_name', sa.String(length=64), nullable=True),
    sa.Column('data_type', sa.String(length=64), nullable=True),
    sa.Column('value', sa.String(length=64), nullable=True),
    sa.Column('time_stamp', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index('ix_sensor_component_type_time', 'sensor_data', ['sensor_name', 'component_name', 'data_type', 'time_stamp'], unique=False)
    op.create_table('shsk_sensor_data',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('sensor_name', sa.String(length=64), nullable=True),
    sa.Column('component_name', sa.String(length=64), nullable=True),
    sa.Column('data_type', sa.String(length=64), nullable=True),
    sa.Column('value', sa.String(length=64), nullable=True),
    sa.Column('time_stamp', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index('ix_sensor_component_type_time_for_sk', 'shsk_sensor_data', ['sensor_name', 'component_name', 'data_type', 'time_stamp'], unique=False)
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=80), nullable=True),
    sa.Column('email', sa.String(length=120), nullable=True),
    sa.Column('password_hash', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user')
    op.drop_index('ix_sensor_component_type_time_for_sk', table_name='shsk_sensor_data')
    op.drop_table('shsk_sensor_data')
    op.drop_index('ix_sensor_component_type_time', table_name='sensor_data')
    op.drop_table('sensor_data')
    # ### end Alembic commands ###