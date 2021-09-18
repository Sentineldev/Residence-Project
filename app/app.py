from flask import Flask,redirect,url_for
from dotenv import load_dotenv,find_dotenv
from os import getenv,path
from database import db

from auth import auth
from admin import admin
from api import api


def create_app():
    load_dotenv(find_dotenv())

    app = Flask(__name__)
    

    app.config.from_mapping(
        SECRET_KEY=getenv('SECRET_KEY'),
        FLASK_DATABASE_HOST=getenv('FLASK_DATABASE_HOST'),
        FLASK_DATABASE_USER=getenv('FLASK_DATABASE_USER'),
        FLASK_DATABASE_PASSWORD=getenv('FLASK_DATABASE_PASSWORD'),
        FLASK_DATABASE=getenv('FLASK_DATABASE')
    )
    db.init_app(app)


    app.register_blueprint(auth.bp)
    app.register_blueprint(admin.bp)
    app.register_blueprint(api.bp)

    @app.route('/')
    def root():
        return redirect(url_for('auth.user_login'))


    return app


app = create_app()