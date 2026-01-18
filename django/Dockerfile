# Use the official Python image from the Docker Hub
FROM python:3.12.8

# Define build arguments
ARG app_migrations=false
ARG reports_migrations=false
ARG create_superuser=false


# Set the working directory inside the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . .

# Install dependencies
RUN pip install --default-timeout=100 -r project/requirements.txt 

# Make entrypoint script executable
RUN chmod +x entrypoint.sh

# Expose the port the app runs on
EXPOSE 8000

# Pass build args as environment variables to be used in entrypoint
ENV APP_MIGRATIONS=${app_migrations}
ENV REPORTS_MIGRATIONS=${reports_migrations}
ENV CREATE_SUPERUSER=${create_superuser}
ENV RUN_REPORTS=false
ENV RUN_ROLES=false

# Use entrypoint script
ENTRYPOINT ["./entrypoint.sh"]
CMD ["python", "/app/project/manage.py", "runserver", "0.0.0.0:8000"]
