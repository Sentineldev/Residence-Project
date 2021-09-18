import mysql.connector as database
from flask import g,current_app
from flask.cli import with_appcontext
from .schema import schemas
import click


def get_db():
    if 'db' not in g:
        g.db = database.connect(
            host=current_app.config['FLASK_DATABASE_HOST'],
            user=current_app.config['FLASK_DATABASE_USER'],
            password=current_app.config['FLASK_DATABASE_PASSWORD'],
            database=current_app.config['FLASK_DATABASE']
        )
        g.c = g.db.cursor(dictionary=True,buffered=True)

        return g.db,g.c


def close_db(e=None):
    db = g.pop('db',None)

    if db is not None:
        db.close()

def init_db():
    db,c = get_db()
    
    for schema in schemas:
        print(f'In process of {schema}')
        c.execute(schema)
        db.commit()

@click.command('init-db')
@with_appcontext
def init_db_command():
    init_db()
    click.echo('Initialized the database.')

def init_app(app):
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)
