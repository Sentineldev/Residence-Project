from flask import Blueprint,render_template
from auth.auth import login_required
from datetime import date
bp = Blueprint('admin',__name__,url_prefix='/admin')


months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',

]

@bp.route('/gastos')
@login_required
def gastos():
    date_now = date.today().strftime("%B %d, %Y")
    print(date_now)
    return render_template('admin/expenses-admin.html',months=months,current_date=date_now)
