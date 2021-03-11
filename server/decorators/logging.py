from app import app
from flask import Flask, jsonify, request

# ? A decorator that flask provides for pre-request code.
@app.before_request
def log():
    print("Stocks log...")
    print("💰💰 Upwards 💰💰")
