schemas = [
    """
    CREATE TABLE person (
	person_id INT PRIMARY KEY AUTO_INCREMENT,
    name varchar(64),
    last_name varchar(64)
	);
    
    """,
    """

    CREATE TABLE owner (
	owner_id int PRIMARY KEY AUTO_INCREMENT,
    person_id INT,
    extra_balance DECIMAL(6,2),
    FOREIGN KEY (person_id) REFERENCES person(person_id)
    );
    
    """,
    """
    CREATE TABLE apartment  (
	apartment_id INT PRIMARY KEY AUTO_INCREMENT,
    owner_id int,
    identifier varchar(32) UNIQUE NOT NULL,
    floor INT
	);
    
    """,
    """
    CREATE TABLE apartment_payment (
	apartment_payment_id INT PRIMARY KEY AUTO_INCREMENT,
    apartment_id INT,
    year int,
    month VARCHAR(16),
	day int,
    dollar DECIMAL(6,2),
    dolar_rate DECIMAL(12,2),
    bolivares DECIMAL(12,2),
    pay_type varchar(16)
    );
    
    """,
    """
    CREATE TABLE apartment_payed_monthly (
	apartment_payed_monthly_id INT PRIMARY KEY AUTO_INCREMENT,
    apartment_id INT,
    year INT,
    month varchar(16),
    total_payed DECIMAL(6,2),
    FOREIGN KEY(apartment_id)REFERENCES apartment(apartment_id)
    );
    
    """,
    """
    CREATE TABLE user (
	user_id int PRIMARY KEY AUTO_INCREMENT,
    owner_id INT,
    username varchar(128) UNIQUE NOT NULL,
    password varchar(256),
    FOREIGN KEY(owner_id) REFERENCES owner (owner_id)
	);
    
    """,
    """
    CREATE TABLE admin (
	admin_id INT PRIMARY KEY AUTO_INCREMENT,
    person_id INT,
    username varchar(64) UNIQUE NOT NULL,
    password varchar(128),
    FOREIGN KEY(person_id) REFERENCES person(person_id)
	);
    
    """,
    """
    INSERT INTO person (name,last_name) VALUES ('Alcides','Figuera');
    
    """,
    """
    INSERT INTO admin (person_id,username,password) VALUES (1,'admin','admin');
    
    """,

    """
    CREATE TABLE expense (
	expense_id INT PRIMARY KEY AUTO_INCREMENT,
    year int,
    month varchar(16)
    );
    
    """,
    """
    CREATE TABLE expense_concept(
	expense_concept_id INT PRIMARY KEY AUTO_INCREMENT,
    expense_id INT,
    dollar_rate DECIMAL(12,2),
    dollars DECIMAL(6,2),
    bolivares DECIMAL(12,2),
    concept varchar(256),
    type varchar(16),
    FOREIGN KEY(expense_id) REFERENCES expense (expense_id)
    );
    
    
    """,
    """
    CREATE TABLE total_expense_monthly (
	total_expense_monthly_id INT PRIMARY KEY AUTO_INCREMENT,
    expense_id INT,
    total_expense DECIMAL(6,2),
    type varchar(16),
    FOREIGN KEY (expense_id) REFERENCES expense(expense_id)
	);
    
    """,
    """
    CREATE TABLE residence_balance (
	residence_balance_id INT PRIMARY KEY AUTO_INCREMENT,
    year INT,
    month varchar(16),
    dollars DECIMAL(6,2),
    bolivares DECIMAL(6,2),
    dollar_rate DECIMAL(6,2)
	);
    
    """,
    """
    CREATE TABLE monthly_payment (
	monthly_payment_id INT PRIMARY KEY AUTO_INCREMENT,
    year INT,
    month VARCHAR(16),
    dollars DECIMAL(6,2),
    comment VARCHAR(64)
	);
    
    """
]