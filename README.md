Purpose of the Project: -
In many hostels, meal planning is done manually, which often leads to:
    a. Wrong meal counts
    b. Last-minute confusion
    c. Food wastage
    d. Lack of accountability
This system solves those problems by allowing students to apply or cancel meals within a fixed time window and allowing admins to see accurate daily counts.

User Roles: -
1. Student: -
    a. Login using provided credentials (no self-registration)
    b. View today’s menu (read-only)
    c. Apply for tomorrow’s meal before cutoff time
    d. Cancel and reapply before cutoff
    e. View notices published by admin
    f. View monthly meal summary
2. Admin: -
    a. Login as admin
    b. View today’s meal count
    c. View tomorrow’s meal count (Tentative / Final)
    4. Upload and manage mess menu
    5. Create notices with priority and effective date

Monitor mess operations (read-only controls): -
1. Core Business Rules: -
    a. A student can have only one meal record per day
    b. Meal application closes at 10:30 PM
2. After cutoff:
    a. Meal count becomes Final
    b. No apply or cancel is allowed
    c. Backend strictly enforces all rules
    d. No manual override of meal records

Technology Used: -
1.Frontend: -
    React (Vite)
    React Router
    Axios
    Context API for authentication
    Simple UI styling (no heavy UI libraries)
2. Backend: -
    Node.js
    Express.js
    MongoDB with Mongoose
    JWT authentication
    Role-based access control
3. bcrypt for password hashing
4. Authentication & Security
    a. JWT-based authentication
    b. Role-based route protection
    c. No public student registration
    d. Users are created/administered by admin
    e. Passwords stored securely using hashing

Features Implemented: -
    a. Student meal apply / cancel / reapply flow
    b. Cutoff-time enforcement
    c. Admin live meal counts (today and tomorrow)
    d. Tentative vs Final meal status
    e. Notice management (admin → students)
    f. Menu management
    g. Role-based navigation
    h. Clean and simple UI

Project Structure: -
1. client/
        pages/
        components/
        context/
        services/
2. server/
        controllers/
        routes/
        models/
        middleware/
        config/

How to Run the Project: -
1. Backend
        cd server
        npm install
        npm run dev
2. Frontend
        cd client
        npm install
        npm run dev


Create a .env file in the server folder:
    PORT=5000
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_secret

Design Decisions: -
    1. Public student registration was intentionally avoided
    2. Users are provisioned by admin (realistic hostel workflow)
    3. Backend is the single source of truth
    Focused on correctness over feature overload
    4. No unnecessary complexity
    
 Future Improvements (Optional): -
    1. Bulk student onboarding (CSV upload)
    2. Attendance analytics
    3. Report export

Author
Rojaline Sahoo
MCA | OUTR | Full Stack Developer (MERN)