# Pomodoro Timer App

A full-stack Pomodoro timer application with:

- **FastAPI + Supabase** backend for user auth & task management  
- **React + Vite** frontend for timer UI and task list  

---

## 🛠️ Tech Stack

- **Backend**: Python 3.12, FastAPI, Pydantic, Supabase (Postgres + GoTrue auth), Uvicorn  
- **Frontend**: Node 16+, React 18, Vite, Flowbite-React (Tailwind CSS components)  

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/pomodoro-app.git
cd pomodoro-app
```

---

## 🔧 Backend Setup

1. **Create & configure your Supabase project**  
   - Go to https://app.supabase.com, create a new project.  
   - In the SQL Editor, run:

     ```sql
     -- users table is managed by Supabase Auth
     -- tasks table:
     create table if not exists public.tasks (
       id                uuid         primary key default gen_random_uuid(),
       user_id           uuid         not null references auth.users(id),
       task_name         text         not null,
       estimated_sessions integer     not null,
       duration          integer      not null,
       completed_task    boolean      not null default false,
       created_at        timestamptz  not null default now()
     );
     ```

2. **Copy & edit `.env.example`**  
   ```bash
   cd backend
   cp .env.example .env
   ```
   Populate `.env` with your Supabase credentials:
   ```env
   # .env
   SUPABASE_URL=<your-supabase-project-url>
   SERVICE_ROLE_KEY=<your-service-role-key>
   ```

3. **Install Python dependencies**  
   ```bash
   python -m venv .venv
   source .venv/bin/activate
   pip install --upgrade pip
   pip install -r requirements.txt
   ```

4. **Run the server**  
   ```bash
   uvicorn main:app --reload --port 8000
   ```
   The API will be available at `http://localhost:8000/`.  
   Open `http://localhost:8000/docs` for automatic Swagger UI.

---

## ⚛️ Frontend Setup

1. **Copy & edit `.env.local`**  
   ```bash
   cd ../frontend
   cp .env.local.example .env.local
   ```
   Populate `.env.local`:
   ```env
   # .env.local
   VITE_API_URL=http://localhost:8000
   ```

2. **Install Node dependencies**  
   ```bash
   npm install
   ```

3. **Start the dev server**  
   ```bash
   npm run dev
   ```
   Your app will open at `http://localhost:5173/` by default.

---

## 📦 Available Scripts

### Backend

- `uvicorn main:app --reload` — start FastAPI with hot-reload  
- `pytest` — run backend tests

### Frontend

- `npm run dev` — start Vite dev server  
- `npm run build` — bundle for production  
- `npm run preview` — locally preview production build

---

## 📑 API Overview

| Method | Path                  | Description                         |
| ------ | --------------------- | ----------------------------------- |
| POST   | `/auth/register`      | Create a new user                   |
| POST   | `/auth/token`         | Log in & receive a JWT              |
| GET    | `/auth/me`            | Get current user (requires Bearer)  |
| POST   | `/tasks`              | Create a new task                   |
| GET    | `/tasks`              | List all tasks for current user     |
| PUT    | `/tasks/{id}/complete`| Mark a task as completed            |

_All endpoints that act on tasks require an `Authorization: Bearer <JWT>` header._

---


---

## 📄 License

MIT © [Your Name]
