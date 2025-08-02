# WeTheMakers Backend Assignment

This is a backend project for the WeTheMakers assignment built using **NestJS**, **Prisma**, and **PostgreSQL**.
It implements features related to user registration, job posting, and job application management.

---

## 🚀 Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mo7amed010/job-board-assignment
   cd job-board-assignment/backend
   
2. **Install dependencies:**
   ```bash
   npm install
3. **Create a .env file in the root directory and add:**
   ```bash
    DATABASE_URL=postgresql://user:password@localhost:5432/dbname
    JWT_SECRET=your_jwt_secret
  
4. **Run database migrations:**
   ```bash
   npx prisma migrate dev

5. **Start the development server:**
   ```bash
   npm run start:dev

### 🛠 Technologies Used:

- Node.js
- NestJS
- Prisma ORM
- PostgreSQL
- JWT for authentication
- Class-validator for input validation

### 📌 Assumptions Made:

- The system is admin-controlled: only admins can create/update/delete job postings.
- Each user can apply to a job once.
- Applications are linked to both the user and the job.
- The resume and cover letter are stored as text.
- Authentication is based on JWT, and role-based access is implemented manually.

### ⚠ Known Limitations / Areas for Improvement:

- No file upload support (resume is text only).
- No pagination or filtering on job or application listings.
- Basic error handling — can be enhanced with global filters and better validation responses.
- Currently lacks automated testing (unit/e2e).
- Email notifications (e.g., for application confirmation) are not implemented.
