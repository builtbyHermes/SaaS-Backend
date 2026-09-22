## Project 1 — Authentication & User Management API

### 🎯 End Goal

Build a **production-style REST API for user authentication and account management**.

Imagine you're building the backend that a frontend SaaS application would consume.

https://github.com/builtbyHermes/SaaS-Backend.git

### Core features

Your API should eventually support:

- User registration
- User login
- User logout
- Password hashing
- JWT-based authentication
- Protected routes
- Get current authenticated user
- Update user profile
- Change password
- Forgot password
- Reset password
- Email verification
- Account deletion
- User roles
- Admin user management

### 👤 Users

A user should have information such as:

- ID
- Name
- Email
- Password
- Role
- Email verification status
- Account creation date
- Updated date

You decide the exact structure.

### 🔐 Authentication

The finished API should be able to handle:

**Registration → Login → Authentication → Protected resources**

You should also deal with things like:

- Invalid credentials
- Duplicate accounts
- Expired/invalid tokens
- Unauthorized requests
- Unverified accounts
- Password security

### 👑 Authorization

Have at least two roles:

```text
User
Admin
```

A normal user should only be able to access/modify their own account.

An admin should have access to user-management functionality.

### 👨‍💼 Admin functionality

An administrator should be able to:

- View users
- View an individual user
- Update users
- Delete users
- Change user roles
- Potentially deactivate accounts

### 🧪 Validation & Error Handling

Your API should properly handle:

- Invalid request data
- Missing fields
- Invalid email formats
- Weak passwords
- Duplicate emails
- Non-existent users
- Unauthorized requests
- Forbidden requests
- Invalid IDs
- Server errors

Your responses should be consistent and understandable.

### 🛡️ Security

The project should also make you think about:

- Password security
- Token security
- Environment variables
- Sensitive information
- Request validation
- Rate limiting
- CORS
- HTTP security headers
- Preventing common authentication vulnerabilities

### 🧰 Testing

By the end, you should be able to test the entire authentication flow using something like **Postman** or **Insomnia**.

You should be able to demonstrate:

```text
Register
   ↓
Verify account
   ↓
Login
   ↓
Receive authentication
   ↓
Access protected resource
   ↓
Update account
   ↓
Change password
   ↓
Logout
```

And separately:

```text
Admin Login
     ↓
Access user management
     ↓
Manage users
```

### 📌 What you're trying to learn

Don't think of this project as simply **"make an authentication API."**

The real goal is to become comfortable with:

**Node.js → Express → REST APIs → Middleware → Authentication → Authorization → Validation → Error Handling → Database → Security → Testing**

You should finish the project feeling that you can look at a backend requirement and independently figure out how to structure and implement it.

**Your first step:** before writing code, define the API's requirements and decide exactly what features and user flows your finished application will have.
