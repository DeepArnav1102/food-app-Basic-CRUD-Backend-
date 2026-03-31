# 🍔 Food App — Basic CRUD Backend

A RESTful backend API for a food ordering application built with **Node.js**, **Express**, and **MongoDB**. Supports user authentication, restaurant management, food listings, category management, and order placement — all tested via Postman.

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcryptjs
- **Logging:** Morgan
- **Environment Variables:** dotenv
- **CORS:** cors

---

## 📁 Project Structure

```
├── config/
│   └── db.js                  # MongoDB connection
├── controllers/
│   ├── authController.js
│   ├── usercontroller.js
│   ├── restaurantController.js
│   ├── categoryController.js
│   ├── foodController.js
│   └── testcontroller.js
├── middleware/
│   ├── authmiddleware.js      # JWT verification
│   └── adminmiddleware.js     # Admin role check
├── models/
│   ├── userModel.js
│   ├── restaurantModel.js
│   ├── categoryModel.js
│   ├── foodModel.js
│   └── orderModel.js
├── routes/
│   ├── authroutes.js
│   ├── userroutes.js
│   ├── restaurantroutes.js
│   ├── categoryroutes.js
│   ├── foodroutes.js
│   └── testroutes.js
└── index.js                   # Entry point
```

---

## ⚙️ Setup & Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/DeepArnav1102/food-app-Basic-CRUD-Backend-.git
   cd food-app-Basic-CRUD-Backend-
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory
   ```env
   PORT=8080
   MONGO_URI=your_mongodb_connection_string
   JWT_key=your_jwt_secret_key
   ```

4. **Start the server**
   ```bash
   npm run server
   ```

   Server will run at `http://localhost:8080`

---

## 🔐 Authentication

Protected routes require a **Bearer token** in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

Admin-only routes additionally verify that the user's `usertype` is `"admin"`.

---

## 📡 API Endpoints

### 🧪 Test
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/test/test-controller` | Health check |

---

### 👤 Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/register` | Register a new user |
| POST | `/api/v1/auth/login` | Login and receive JWT token |

**Register Body:**
```json
{
  "username": "john",
  "email": "john@example.com",
  "password": "secret123",
  "phone": "9876543210"
}
```

**Login Body:**
```json
{
  "username": "john",
  "password": "secret123"
}
```

---

### 👤 User  *(Auth Required)*
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/user/getUser` | Get user info by username |
| PUT | `/api/v1/user/updateUser` | Update username, address, or password |
| DELETE | `/api/v1/user/deleteUser/:id` | Delete user account |

---

### 🏠 Restaurant  *(Auth Required)*
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/restaurant/create-restaurant` | Create a new restaurant |
| PUT | `/api/v1/restaurant/update-restaurant` | Update restaurant details |
| DELETE | `/api/v1/restaurant/delete-restaurant/:id` | Delete a restaurant |
| GET | `/api/v1/restaurant/get-restaurant` | Get restaurant info by name |

**Create Restaurant Body:**
```json
{
  "RestaurantName": "Burger Hub",
  "Location": "Kolkata",
  "food": ["Burger", "Fries"],
  "pickup": true,
  "delivery": true
}
```

---

### 🗂️ Category
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/v1/category/create-category` | ✅ | Create a new category |
| GET | `/api/v1/category/get-all-categories` | ❌ | Get all categories |
| PUT | `/api/v1/category/update-category` | ✅ | Update category title |
| DELETE | `/api/v1/category/delete-category/:id` | ✅ | Delete a category |

**Create Category Body:**
```json
{
  "title": "Fast Food",
  "imageURL": "https://example.com/image.png"
}
```

---

### 🍕 Food
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/v1/food/add-food` | ✅ | Add a new food item |
| GET | `/api/v1/food/get-all-food` | ❌ | Get all food items |
| GET | `/api/v1/food/get-foodbyname` | ❌ | Get food item by name |
| DELETE | `/api/v1/food/deleteFood/:id` | ❌ | Delete food by ID |
| POST | `/api/v1/food/place-order` | ✅ | Place an order |
| POST | `/api/v1/food/orderStatus/:id` | ✅ Admin | Update order status |

**Add Food Body:**
```json
{
  "foodName": "Margherita Pizza",
  "description": "Classic pizza with tomato and mozzarella",
  "price": "299",
  "category": "Pizza",
  "code": "MARG01",
  "available": true,
  "foodImage": "https://example.com/pizza.jpg",
  "restaurant": "<restaurant_object_id>",
  "rating": "4"
}
```

**Place Order Body:**
```json
{
  "cart": [
    { "price": "299" },
    { "price": "149" }
  ]
}
```

**Order Status Body:**
```json
{
  "status": "on the way"
}
```
> Status options: `preparing` | `prepared` | `on the way` | `delivered`

---

## 🧑‍💼 User Roles

| Role | Description |
|------|-------------|
| `customer` | Default role, can place orders |
| `admin` | Can change order status |
| `vendor` | Vendor role (extendable) |
| `driver` | Driver role (extendable) |

---

## 📦 Data Models

### User
`username`, `email`, `password` (hashed), `phone`, `address[]`, `usertype`, `profilePicture`

### Restaurant
`RestaurantName`, `Location`, `food[]`, `pickup`, `delivery`

### Category
`title`, `imageURL`

### Food
`foodName`, `description`, `price`, `category`, `code`, `Available`, `foodImage`, `restaurant` (ref), `rating`

### Order
`foods[]` (ref Food), `payment`, `buyer` (ref User), `status`

---

## 🧪 Testing

All endpoints were tested using **Postman**. Make sure to:
1. Register a user and log in to get your JWT token
2. Add the token to the `Authorization` header as `Bearer <token>` for protected routes
3. Use an admin account for order status updates

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
