## User Routes Documentation

### 1. Register User

**Endpoint:** `/user/register`

**Method:** `POST`

**Description:** Registers a new user.

**Request:**
- **Headers:** None
- **Body:**
  - `fullname`
    - `firstname`: string (min length: 3)
    - `lastname`: string (optional)
  - `email`: string (valid email format)
  - `password`: string (min length: 8)

**Response:**
- **Success (200):**
  - `_id`: string
  - `fullname`
    - `firstname`: string
    - `lastname`: string
  - `email`: string
  - `message`: "User Registered successfully"
- **Error (400):**
  - `errors`
    - `msg`: "Invalid Email"
    - `param`: "email"
    - `location`: "body"
    - `msg`: "FirstName must be of length 3"
    - `param`: "fullname.firstname"
    - `location`: "body"
    - `msg`: "Password must be of atleast length 8"
    - `param`: "password"
    - `location`: "body"
  - `message`: "All fields are required"
  - `message`: "User already exists"
- **Error (500):**
  - `message`: "Error while registration!"

### 2. Login User

**Endpoint:** `/user/login`

**Method:** `POST`

**Description:** Logs in an existing user.

**Request:**
- **Headers:** None
- **Body:**
  - `email`: string (valid email format)
  - `password`: string (min length: 8)

**Response:**
- **Success (200):**
  - `_id`: string
  - `fullname`
    - `firstname`: string
    - `lastname`: string
  - `email`: string
  - `message`: "User Logged In Successfully"
- **Error (400):**
  - `errors`
    - `msg`: "Invalid Email"
    - `param`: "email"
    - `location`: "body"
    - `msg`: "Password must be of atleast length 8"
    - `param`: "password"
    - `location`: "body"
  - `message`: "All fields are required"
  - `message`: "User not found"
  - `message`: "Invalid credentials"

### 3. Logout User

**Endpoint:** `/user/logout`

**Method:** `POST`

**Description:** Logs out the currently logged-in user.

**Request:**
- **Headers:** None
- **Body:** None

**Response:**
- **Success (200):**
  - `message`: "User logged out successfully"
- **Error (401):**
  - `message`: "Unauthorized!!"

### 4. Get User Profile

**Endpoint:** `/user/profile`

**Method:** `GET`

**Description:** Retrieves the profile of the currently logged-in user.

**Request:**
- **Headers:** None
- **Body:** None

**Response:**
- **Success (200):**
  - `user`
    - `_id`: string
    - `fullname`
      - `firstname`: string
      - `lastname`: string
    - `email`: string
    - `socketId`: string
- **Error (401):**
  - `message`: "Unauthorized!!"

## Captain Routes Documentation

### 1. Register Captain

**Endpoint:** `/captain/register`

**Method:** `POST`

**Description:** Registers a new captain.

**Request:**
- **Headers:** None
- **Body:**
  - `fullname`
    - `firstname`: string (min length: 3)
    - `lastname`: string (optional)
  - `email`: string (valid email format)
  - `password`: string (min length: 8)
  - `vehicle`
    - `color`: string (min length: 3)
    - `plate`: string (min length: 8)
    - `capacity`: integer (min: 1)
    - `vechiletypes`: string (one of ['auto', 'car', 'motorcycle'])

**Response:**
- **Success (200):**
  - `_id`: string
  - `fullname`
    - `firstname`: string
    - `lastname`: string
  - `email`: string
  - `vehicle`
    - `color`: string
    - `plate`: string
    - `capacity`: integer
    - `vechiletypes`: string
  - `message`: "Captain Registered successfully"
- **Error (400):**
  - `errors`
    - `msg`: "Invalid Email"
    - `param`: "email"
    - `location`: "body"
    - `msg`: "FirstName must be of length 3"
    - `param`: "fullname.firstname"
    - `location`: "body"
    - `msg`: "Password must be of atleast length 8"
    - `param`: "password"
    - `location`: "body"
    - `msg`: "Color must be of at least length 3"
    - `param`: "vehicle.color"
    - `location`: "body"
    - `msg`: "Plate must be of at least length 8"
    - `param`: "vehicle.plate"
    - `location`: "body"
    - `msg`: "Capacity must be of at least 1"
    - `param`: "vehicle.capacity"
    - `location`: "body"
    - `msg`: "Invalid vehicle"
    - `param`: "vehicle.vechiletypes"
    - `location`: "body"
  - `message`: "All fields are required"
  - `message`: "User already exists"
- **Error (500):**
  - `message`: "Error while registration!"

### 2. Login Captain

**Endpoint:** `/captain/login`

**Method:** `POST`

**Description:** Logs in an existing captain.

**Request:**
- **Headers:** None
- **Body:**
  - `email`: string (valid email format)
  - `password`: string (min length: 8)

**Response:**
- **Success (200):**
  - `_id`: string
  - `fullname`
    - `firstname`: string
    - `lastname`: string
  - `email`: string
  - `vehicle`
    - `color`: string
    - `plate`: string
    - `capacity`: integer
    - `vechiletypes`: string
  - `message`: "Captain Logged In Successfully"
- **Error (400):**
  - `errors`
    - `msg`: "Invalid Email"
    - `param`: "email"
    - `location`: "body"
    - `msg`: "Password must be of atleast length 8"
    - `param`: "password"
    - `location`: "body"
  - `message`: "All fields are required"
  - `message`: "User not found"
  - `message`: "Invalid credentials"

### 3. Logout Captain

**Endpoint:** `/captain/logout`

**Method:** `POST`

**Description:** Logs out the currently logged-in captain.

**Request:**
- **Headers:** None
- **Body:** None

**Response:**
- **Success (200):**
  - `message`: "Captain logged out successfully"
- **Error (401):**
  - `message`: "Unauthorized!!"

### 4. Get Captain Profile

**Endpoint:** `/captain/profile`

**Method:** `GET`

**Description:** Retrieves the profile of the currently logged-in captain.

**Request:**
- **Headers:** None
- **Body:** None

**Response:**
- **Success (200):**
  - `captain`
    - `_id`: string
    - `fullname`
      - `firstname`: string
      - `lastname`: string
    - `email`: string
    - `vehicle`
      - `color`: string
      - `plate`: string
      - `capacity`: integer
      - `vechiletypes`: string
    - `socketId`: string
    - `status`: string
    - `location`
      - `ltd`: number
      - `lng`: number
- **Error (401):**
  - `message`: "Unauthorized!!"