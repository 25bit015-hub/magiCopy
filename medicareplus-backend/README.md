# MediCare Plus — Backend (Spring Boot + MySQL)

Backend kamili ya mfumo wa MediCare Plus (clinic/hospital management), iliyotengenezwa
kuendana moja kwa moja na frontend ya React/TypeScript iliyoko kwenye `src/services/api.ts`.
Endpoints zote hapa chini zinalingana na zile ambazo frontend tayari inazitarajia.

## Teknolojia zilizotumika
- **Java 17**
- **Spring Boot 3.3** (Web, Data JPA, Security, Validation, Actuator)
- **MySQL 8** (database)
- **JWT** (io.jsonwebtoken / jjwt) kwa uthibitisho (authentication)
- **Lombok** kupunguza boilerplate code
- **Maven** kwa build

## Muundo wa mradi
```
src/main/java/com/medicareplus/backend/
 ├─ config/        SecurityConfig (JWT + CORS)
 ├─ security/      JwtService, JwtAuthenticationFilter, UserDetailsServiceImpl
 ├─ entity/        JPA entities (User, Patient, Doctor, Appointment, Consultation,
 │                  Prescription, PrescriptionItem, Medicine, LabTest, Invoice)
 ├─ enums/         Role, Gender, AppointmentStatus, n.k.
 ├─ repository/    Spring Data JPA repositories
 ├─ dto/           Request/Response DTOs (records) kwa kila module
 ├─ service/       Business logic
 ├─ controller/    REST controllers
 ├─ exception/     Global exception handling (JSON error responses)
 └─ seed/          DataSeeder — hupanda data ya mfano baada ya boot ya kwanza
```

## Hatua za kuanzisha (setup)

### 1. Hakikisha MySQL inaendesha
Unda database (au acha `createDatabaseIfNotExist=true` ifanye kazi kiotomatiki):
```sql
CREATE DATABASE medicareplus_db;
```

### 2. Weka environment variables (au tumia default zilizopo)
Faili `src/main/resources/application.yml` tayari lina default zifuatazo:

| Variable | Default | Maelezo |
|---|---|---|
| `DB_HOST` | `localhost` | Host ya MySQL |
| `DB_PORT` | `3306` | Port ya MySQL |
| `DB_NAME` | `medicareplus_db` | Jina la database |
| `DB_USERNAME` | `root` | Mtumiaji wa MySQL |
| `DB_PASSWORD` | `root` | Nenosiri la MySQL |
| `JWT_SECRET` | (imewekwa) | **Badilisha hii kabla ya production** |
| `JWT_EXPIRATION_MS` | `86400000` (masaa 24) | Muda wa token |
| `CORS_ALLOWED_ORIGINS` | `http://localhost:5173,http://localhost:3000` | Origins za frontend |
| `SEED_DEMO_DATA` | `true` | Panda data ya mfano wakati wa boot ya kwanza |

Unaweza kuweka hizi kama environment variables, au badilisha moja kwa moja kwenye `application.yml`.

### 3. Run (bila kujenga jar)
```bash
mvn spring-boot:run
```

### 4. Au jenga jar kisha run
```bash
mvn clean package -DskipTests
java -jar target/medicareplus-backend.jar
```

Backend itaanza kwenye: **http://localhost:8080/api**

### 5. Akaunti ya kwanza ya kuingia (imepandwa kiotomatiki)
```
Email:    amelia.hart@medicareplus.com
Password: Password123
```
(Badilisha/futa hii mara tu unapokuwa na watumiaji halisi — angalia `SEED_DEMO_DATA=false`.)

## Kuunganisha na Frontend (React)
Frontend tayari imewekwa kutumia:
```
VITE_API_BASE_URL=http://localhost:8080/api
```
Weka hii kwenye faili la `.env` la frontend (Vite) — hakuna mabadiliko mengine
yanayohitajika kwa sababu njia (endpoints) za `src/services/api.ts` zinalingana
moja kwa moja na controllers za backend hii.

## Endpoints kuu

### Auth
| Method | Path | Maelezo |
|---|---|---|
| POST | `/auth/login` | Ingia, inarudisha JWT token + user |
| POST | `/auth/register` | Sajili mtumiaji mpya (Admin) |
| GET | `/auth/me` | Taarifa za mtumiaji aliye-login (inahitaji token) |
| POST | `/auth/logout` | Logout (stateless) |

### Patients / Doctors / Appointments
| Method | Path |
|---|---|
| GET/POST | `/patients` |
| GET/PUT/DELETE | `/patients/{id}` |
| GET/POST | `/doctors` |
| GET/PUT/DELETE | `/doctors/{id}` |
| GET/POST | `/appointments` (query `?date=YYYY-MM-DD` inasaidiwa) |
| PUT/DELETE | `/appointments/{id}` |
| PATCH | `/appointments/{id}/status?status=CONFIRMED` |

### Kliniki (Medical)
| Method | Path |
|---|---|
| GET/POST | `/consultations` |
| GET/POST | `/prescriptions` |
| GET/POST/PUT/DELETE | `/medicines` |
| GET/POST | `/laboratory` |
| PATCH | `/laboratory/{id}?status=COMPLETED&result=Normal` |

### Fedha (Business)
| Method | Path |
|---|---|
| GET/POST | `/billing` |
| PATCH | `/billing/{id}/status?status=PAID` |

### Dashboard / Reports
| Method | Path |
|---|---|
| GET | `/dashboard/stats` |
| GET | `/reports/revenue` |
| GET | `/reports/demographics` |
| GET | `/reports/patient-registration` |
| GET | `/reports/appointment-stats` |

Kila request (isipokuwa `/auth/**`) inahitaji header:
```
Authorization: Bearer <token>
```

## Majina ya Enums muhimu (tumia hivi hivi kwenye request bodies)
- **Role**: `ADMIN, DOCTOR, NURSE, RECEPTIONIST, PHARMACIST, LABORATORY, CASHIER`
- **Gender**: `MALE, FEMALE, OTHER`
- **AppointmentStatus**: `PENDING, CONFIRMED, COMPLETED, CANCELLED`
- **InvoiceStatus**: `PAID, PENDING, OVERDUE`
- **PaymentMethod**: `CARD, CASH, INSURANCE, MOBILE_MONEY`
- **LabTestStatus**: `PENDING, PROCESSING, COMPLETED`
- **MedicineStatus** (huhesabiwa kiotomatiki): `IN_STOCK, LOW_STOCK, OUT_OF_STOCK, EXPIRING_SOON`

## Maelezo ya ziada
- `ddl-auto: update` — Hibernate itaunda/kusasisha majedwali kiotomatiki kutoka kwenye entities.
  Kwa production, pendekezo ni kutumia Flyway/Liquibase badala yake.
- Password zinahifadhiwa kwa BCrypt hashing — kamwe si plain text.
- CORS tayari imeruhusiwa kwa `localhost:5173` (Vite dev server ya frontend).
- Global exception handler inarudisha JSON yenye muundo thabiti kwa makosa yote (404, 400, 401, 403, 500).
