from flask import Flask, render_template, request, redirect, flash
from dotenv import load_dotenv
import os
import smtplib
from email.message import EmailMessage


# Load .env
load_dotenv()


# Flask app
app = Flask(__name__)

app.secret_key = os.getenv(
    "FLASK_SECRET_KEY",
    "sachin-portfolio-secret-key"
)


# =========================
# HOME
# =========================

@app.route("/")
def home():
    return render_template("index.html")


# =========================
# ABOUT
# =========================

@app.route("/about")
def about():
    return render_template("about.html")


# =========================
# SKILLS
# =========================

@app.route("/skills")
def skills():
    return render_template("skills.html")


# =========================
# PROJECTS
# =========================

@app.route("/projects")
def projects():
    return render_template("projects.html")


# =========================
# CERTIFICATIONS
# =========================

@app.route("/certifications")
def certifications():
    return render_template("certifications.html")


# =========================
# EXPERIENCE
# =========================

@app.route("/experience")
def experience():
    return render_template("experience.html")


# =========================
# CONTACT
# =========================

@app.route("/contact", methods=["GET", "POST"])
def contact():

    # Display contact page
    if request.method == "GET":
        return render_template("contact.html")


    # Receive form
    name = request.form.get("name", "").strip()
    email = request.form.get("email", "").strip()
    subject = request.form.get("subject", "").strip()
    message = request.form.get("message", "").strip()


    # Validate form
    if not name or not email or not message:

        flash(
            "Please fill in all required fields.",
            "error"
        )

        return redirect("/contact")


    # Get Gmail settings
    mail_username = os.getenv("MAIL_USERNAME")
    mail_password = os.getenv("MAIL_PASSWORD")


    # Check credentials
    if not mail_username or not mail_password:

        print("=" * 60)
        print("EMAIL ERROR:")
        print("MAIL_USERNAME or MAIL_PASSWORD is missing from .env")
        print("=" * 60)

        flash(
            "Email service is not configured yet.",
            "error"
        )

        return redirect("/contact")


    try:

        # Create email
        msg = EmailMessage()


        if subject:

            msg["Subject"] = f"Portfolio Contact: {subject}"

        else:

            msg["Subject"] = "New Portfolio Contact"


        # Your Gmail
        msg["From"] = mail_username

        msg["To"] = mail_username

        # Visitor's email
        msg["Reply-To"] = email


        # Email body
        msg.set_content(
            f"""
New message from Sachin's Portfolio
====================================

Name: {name}

Email: {email}

Subject: {subject}

Message:
{message}

====================================
Sent from Sachin's Portfolio
"""
        )


        # Connect to Gmail
        print("Connecting to Gmail SMTP...")


        with smtplib.SMTP(
            "smtp.gmail.com",
            587
        ) as smtp:

            smtp.ehlo()

            smtp.starttls()

            smtp.ehlo()

            print("Logging into Gmail...")

            smtp.login(
                mail_username,
                mail_password
            )

            print("Sending email...")

            smtp.send_message(msg)


        # Only reached if email was actually sent
        print("=" * 60)
        print("EMAIL SENT SUCCESSFULLY")
        print("=" * 60)


        flash(
            "Message sent successfully! I'll get back to you soon.",
            "success"
        )

        return redirect("/contact")


    except Exception as e:

        # Print REAL error in terminal
        print("=" * 60)
        print("EMAIL ERROR:")
        print(repr(e))
        print("=" * 60)


        flash(
            "Unable to send message right now. Please try again later.",
            "error"
        )

        return redirect("/contact")


# =========================
# RUN
# =========================

if __name__ == "__main__":

    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )