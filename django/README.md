# Django Backend Project

Django Template

## Prerequisites

- Python 3.8 or above
- Django 4.0
- Git (optional, if cloning the repository)

## Project Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name

   ```

2. **Navigate to the main Folder**

   ```bash
   cd mainFolder

   ```

3. **Create and Activate Virtual Environment**

   ```bash
   python -m venv venv
   venv\Scripts\activate  # On Windows
    # OR
   source venv/bin/activate  # On macOS/Linux

   ```

4. **Navigate to the Project Folder**

   ```bash
   cd project

   ```

5. **Install Dependencies**

   ```bash
   pip install -r requirements.txt

   ```

6. **Create Migrations**

   ```bash
   python manage.py makemigrations

   ```

7. **Apply Migrations**

   ```bash
   python manage.py migrate

   ```

8. **Run Roles Script**
   **Run this command the first time you start the project.**

   ```bash
   python roles.py

   ```

9. **Run Django Server**

   ```bash
   python manage.py runserver

   ```

10. **Access the Application**
    Open http://127.0.0.1:8000 to view the project in your browser.
    Open http://127.0.0.1:8000/admin to view the django admin interface in your browser.
