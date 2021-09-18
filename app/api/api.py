from flask import Blueprint,jsonify,request
from auth.auth import login_required
from database.db import get_db

bp = Blueprint('api',__name__,url_prefix='/api')


"""
Residence Expenses CREATE-DELETE-UPDATE-GET

"""

@bp.route("/create_expense",methods=['POST'])
@login_required
def created_expense():
    db,c = get_db()

    expense = request.get_json()

    if expense:
        c.execute(
            """
            SELECT expense_id
            FROM expense 
            WHERE year = %s and month = %s
            """,(expense['year'],expense['month'])
        )
        expense_id = c.fetchone()
        if expense_id == None:
            c.execute(
                """
                INSERT INTO expense(
                    year,
                    month
                ) 
                VALUES (%s,%s)
                """,(expense['year'],expense['month'])
            )
            db.commit()

            c.execute(
                'SELECT expense_id FROM expense WHERE year = %s and month = %s',(expense['year'],expense['month'])
            )
            expense_id = c.fetchone()

            c.execute(
                """
                INSERT INTO total_expense_monthly (expense_id,total_expense,type)
                VALUES (%s,%s,%s)
                """,(expense_id['expense_id'],0,'Estimated')
            )
            db.commit()
            
            c.execute(
                """
                INSERT INTO total_expense_monthly (expense_id,total_expense,type)
                VALUES (%s,%s,%s)
                """,(expense_id['expense_id'],0,'Real')
            )
            db.commit()

            

            response = jsonify({'message':'Expense successfully register!','status':200,'content':''})
        else:
            response = jsonify({'message':'Expense already registered','status':201,'content':''})
    else:
        response = jsonify({'message':'The request send an error.','status':400,'content':''})
    return response

@bp.route('/create_expense_concept',methods=['POST'])
@login_required
def create_expense_concept():

    expense_concept = request.get_json()

    db,c = get_db()

    c.execute(
        """
        SELECT expense_id,year,month
        FROM expense
        WHERE year = %s and month = %s
        """,(expense_concept['year'],expense_concept['month'])
    )

    expense = c.fetchone()

    if expense == None:
        response = {'message':f'No hay gasto registrado!','status':201,'content':''}
    else:
        c.execute(
            """
            INSERT INTO expense_concept
            (
                expense_id,
                dollar_rate,
                dollars,
                bolivares,
                concept,
                type
            ) VALUES (%s,%s,%s,%s,%s,%s)
            """,(
                expense['expense_id'],
                expense_concept['dollar_rate'],
                expense_concept['dollars'],
                expense_concept['bolivares'],
                expense_concept['concept'],
                expense_concept['type'],
                )
        )
        db.commit()

        c.execute(
            """
            SELECT total_expense
            FROM total_expense_monthly 
            WHERE expense_id = %s and type = %s
            """,(expense['expense_id'],expense_concept['type'])
        )

        total_expense = c.fetchone()['total_expense']
        total_expense = float(total_expense)+float(expense_concept['dollars'])
        
        c.execute(
            """
            UPDATE total_expense_monthly
            SET total_expense = %s
            WHERE expense_id = %s and type = %s
            """,(total_expense,expense['expense_id'],expense_concept['type'])
        )
        db.commit()

        response = {'message':'Concept Successfully Register!','status':200,'content':''}
    return jsonify(response)

@bp.route('/get_all_concepts_expenses/<year>/<month>/<expense_type>',methods=['GET'])
@login_required
def get_all_estimated_expenses(year,month,expense_type):


    db,c = get_db()

    c.execute(
        """
        SELECT expense_id
        FROM expense
        WHERE year = %s and month = %s
        """,(year,month)
    )

    expense_id = c.fetchone()


    if expense_id != None:
        c.execute(
            """
            SELECT *
            FROM expense
            JOIN expense_concept USING(expense_id)
            WHERE year = %s and month = %s and type = %s
            """,(year,month,expense_type)
        )

        expense_concepts = c.fetchall()



        for expense in expense_concepts:
            expense['dollars'] = float(expense['dollars'])
            expense['bolivares'] = float(expense['bolivares'])
            expense['dollar_rate'] = float(expense['dollar_rate'])
        return jsonify({'message':'Request Successfull!','status':200,'content':expense_concepts})
    else:
        return jsonify({'message':'Not record found in that month!','status':201,'content':''})

    return year,month

@bp.route('/get_total_expense/<year>/<month>/<expense_type>')
@login_required
def get_total_expense(year,month,expense_type):

    db,c = get_db()

    c.execute(
        """
        SELECT expense_id
        FROM expense
        WHERE year = %s and month = %s
        
        """,(year,month)
    )
    expense_id = c.fetchone()

    if expense_id == None:
        response = {'message':'Records not found','status':201,'content':''}        
    else:
        c.execute(
            """
            SELECT total_expense
            FROM total_expense_monthly
            WHERE expense_id = %s and type = %s
            
            """,(expense_id['expense_id'],expense_type)
        )

        total_expense = float(c.fetchone()['total_expense'])
        response = {'message':'','status':200,'content':total_expense}
    return jsonify(response)



@bp.route('/delete_expense_concept/<expense_concept_id>',methods=['DELETE'])
@login_required
def delete_expense_concept(expense_concept_id):

    db,c = get_db()

    c.execute(
        
        """
        SELECT total_expense,dollars,total_expense_monthly_id
        FROM expense_concept
        JOIN total_expense_monthly
        USING(expense_id)
        WHERE expense_concept.type = total_expense_monthly.type
        AND expense_concept_id = %s

        """,(expense_concept_id,)
    )

    total_expense = c.fetchone()
    updated_total_expense_monthly = (float(total_expense['total_expense']) - float(total_expense['dollars']) )
    

    c.execute(
        """
        UPDATE total_expense_monthly
        SET total_expense = %s
        WHERE total_expense_monthly_id = %s

        """,(updated_total_expense_monthly,total_expense['total_expense_monthly_id'])
    )
    db.commit()


    c.execute(
        """
        DELETE FROM expense_concept
        WHERE expense_concept_id = %s
        
        """,(expense_concept_id,)
    )
    db.commit()
    response = {'message':'Deleted Successfully','status':200,'content':''}
    return jsonify(response)

@bp.route('/modify_expense_concept/<expense_concept_id>',methods=['PUT'])
def modify_expense_concept(expense_concept_id):

    new_expense_concept = request.get_json()

    db,c = get_db()

    

    c.execute(
        """
        SELECT total_expense,dollars,total_expense_monthly_id
        FROM expense_concept
        JOIN total_expense_monthly
        USING(expense_id)
        WHERE expense_concept.type = total_expense_monthly.type
        AND expense_concept_id = %s
        """,(new_expense_concept['expense_concept_id'],)
    )

    total_expense = c.fetchone()
    new_total_expense = float(total_expense['total_expense']) - float(total_expense['dollars'])
    new_total_expense += float(new_expense_concept['dollars'])

    c.execute(
        """
        UPDATE total_expense_monthly
        SET total_expense = %s
        WHERE total_expense_monthly_id = %s
        
        """,(new_total_expense,total_expense['total_expense_monthly_id'])
    )
    db.commit()

    c.execute(
        """
        UPDATE expense_concept
        SET dollar_rate = %s,dollars = %s, bolivares = %s, concept = %s
        WHERE expense_concept_id = %s
        
        """,(
            new_expense_concept['dollar_rate'],
            new_expense_concept['dollars'],
            new_expense_concept['bolivares'],
            new_expense_concept['concept'],
            expense_concept_id,
        )
    )
    db.commit()
    response = {'message':'Updated Successfully','status':200,'content':''}

    return jsonify(response)

"""
Residence Balance

"""

@bp.route('/get_balance/<year>/<month>',methods=['GET'])
def get_balance(year,month):

    db,c = get_db()
    c.execute(
        """
        SELECT *
        FROM residence_balance
        WHERE year = %s and month = %s
        
        """,(year,month)
    )

    balance = c.fetchone()
    if balance == None:
        return jsonify({'message':'No record found','status':201,'content':''})
    else:
        balance['dollars'] = float(balance['dollars'])
        balance['bolivares'] = float(balance['bolivares'])
        balance['dollar_rate'] = float(balance['dollar_rate'])
        return jsonify({'message':'','status':200,'content':balance})
    

    
@bp.route('/create_balance',methods=['POST'])
@login_required
def create_balance():

    db,c = get_db()

    balance = request.get_json()

    c.execute(
        """
        SELECT residence_balance_id
        FROM residence_balance
        WHERE year = %s and month = %s
        """,(balance['year'],balance['month'])
    )

    residence_balance_id = c.fetchone()

    if residence_balance_id == None:
        print(balance)
        c.execute(
            """
            INSERT INTO residence_balance
            (year,month,dollars,bolivares,dollar_rate)
            VALUES (%s,%s,%s,%s,%s)
            
            """,(balance['year'],balance['month'],balance['dollars'],balance['bolivares'],balance['dollar_rate'])
        )
        db.commit()
        response = jsonify({'message':'Successfully Register!','status':200,'content':''})
    else:
        response = jsonify({'message':'Error, try again.','status':201,'content':''})
    return response


@bp.route('/get_monthly_payment/<year>/<month>',methods=['GET'])
@login_required
def get_monthly_payment(year,month):

    db,c = get_db()

    c.execute(
        """
        SELECT *
        FROM monthly_payment
        WHERE year = %s and month = %s
        """,(year,month)
    )

    monthly_payment = c.fetchone()

    if monthly_payment == None:
        response = {'message':'No register found!','status':201,'content':''}
    else:
        monthly_payment['dollars'] = float(monthly_payment['dollars'])
        response = {'message':'Register successfully found!','status':200,'content':monthly_payment}
    return response


@bp.route('/create_monthly_payment',methods=['POST'])
@login_required
def create_monthly_payment():

    db,c = get_db()

    monthly_payment = request.get_json()

    print(monthly_payment)
    c.execute(
        """
        SELECT monthly_payment_id
        FROM monthly_payment
        WHERE year = %s and month = %s
        """,(monthly_payment['year'],monthly_payment['month'])
    )
    monthly_payment_id = c.fetchone()

    if monthly_payment_id == None:
        c.execute(
            """
            INSERT INTO monthly_payment
            (year,month,dollars,comment)
            VALUES (%s,%s,%s,%s)
            
            """,(monthly_payment['year'],monthly_payment['month'],monthly_payment['dollars'],monthly_payment['comment'])
        )

        db.commit()
        response = {'message':'Successfully Register!','status':200,'content':''}
    else:
         response = {'message':'Record already registered!','status':201,'content':''}

    return jsonify(response)