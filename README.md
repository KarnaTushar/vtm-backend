# vtm-backend

<h3>transfer table details</h3>

| Column Name          | Data Type                 | Description                                       |
|-----------------------|---------------------------|----------------------------------------------------|
| id                    | INT PRIMARY KEY AUTOINCREMENT | Auto-increment primary key for the Transfer table. |
| fromDriverId          | INT (FK) REFERENCES Driver(id) | Nullable foreign key referencing the id column in the Driver table. |
| toDriverId            | INT (FK) REFERENCES Driver(id) | Nullable foreign key referencing the id column in the Driver table. |
| vehicleId             | INT (FK) REFERENCES Vehicle(id) NOT NULL | Non-nullable foreign key referencing the id column in the Vehicle table. |
| transferDate          | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | Timestamp column that defaults to the current timestamp. |
| toEntity              | INT (FK) REFERENCES Entity(id) | Nullable column for future transfers to entities other than drivers. |
|active                 | BOOLEAN | Describes if the current mapping is active or not. | 

### driver table details

| Column Name          | Data Type                 | Description                                       |
|-----------------------|---------------------------|----------------------------------------------------|
| id                    | INT AUTO_INCREMENT PRIMARY KEY | Auto-increment primary key for the Driver table. |
| name                  | VARCHAR(100) NOT NULL       | Driver's name.                                      |
| phone_number          | VARCHAR(15)               | Driver's phone number (optional).                   |
| profile_photo         | VARCHAR(255)              | Path to the driver's profile photo (optional).     |

### vehicle table details

| Column Name          | Data Type                 | Description                                       |
|-----------------------|---------------------------|----------------------------------------------------|
| id                    | INT AUTO_INCREMENT PRIMARY KEY | Auto-increment primary key for the Vehicle table. |
| vehicleNumber        | VARCHAR(20) UNIQUE NOT NULL | Unique vehicle registration number.                 |
| vehicleType           | VARCHAR(50) NOT NULL       | Type of vehicle (e.g., car, SUV, truck).            |
| puc_certificate       | VARCHAR(255)              | Path to the PUC certificate (optional).           |
| insurance_certificate | VARCHAR(255)              | Path to the insurance certificate (optional).     |


<h3>CURL</h3>

-- Create transfer<br>
curl -X POST localhost:3000/transfers/transfer -H "Content-Type: application/json" -d '{"fromDriverId": "1", "toDriverId": "4","vehicleId": "1"}'

-- Create Driver<br>
curl -X POST localhost:3000/drivers/create -H "Content-Type: application/json" -d '{"profile_photo": "uploads/driver/photo1.jpg ", "name": "John Smith 2nd", "phone_number": "+919876456387"}'

-- Create Vehicle<br>
curl -X POST localhost:3000/vehicles/create -H "Content-Type: application/json" -d '{"puc_certificate": "uploads/vehicle/puc1.jpg", "insurance_certificate": "uploads/vehicle/insurance.png", "vehicleNumber": "MH 05 AB 1233", "vehicleType": "SUV"}'
