from flask import Blueprint,render_template,flash,request,session,redirect,url_for
from database.db import get_db
from werkzeug.security import check_password_hash
from functools import wraps

bp = Blueprint('auth',__name__,url_prefix='/auth')


@bp.route('/user/login')
def user_login():
    return render_template('auth/login.html')


@bp.route('/admin/login',methods=['POST','GET'])
def admin_login():
    if request.method == 'POST':
        db,c = get_db()
        error = None
        username = request.form['username']
        password = request.form['password']

        c.execute(
            'SELECT admin_id,username,password FROM admin WHERE username = %s',(username,)
        )
        admin = c.fetchone()
        if admin == None:
            error = 'Usuario o Contraseña invalido!'
        else:
            if admin['username'] == username and admin['password'] == password:
                error = 'Successfully Logged in!'
                session.clear()
                session['user_id'] = admin['admin_id']
                return redirect(url_for('admin.gastos'))
            elif admin['username'] == username and check_password_hash(admin['password'], password):
                error = 'Successfully Logged in!'
            else:
                error = 'Usuario o Contraseña invalido!'
        flash(error)
    return render_template('auth/login.html')


def login_required(view):
    @wraps(view)
    def decorated_function(*args,**kwargs):
        if session.get('user_id') is None:
            return redirect(url_for('auth.user_login'))
        return view(*args,**kwargs)
    return decorated_function

@bp.route('/logout')
def logout():
    return 'Logout'