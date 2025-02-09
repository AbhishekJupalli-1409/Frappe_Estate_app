import frappe
from bitcoin_value import currency

jenvs = {
    "methods": [
        "estate_app.jinja.exp",
        "estate_app.jinja.property_in_btc", 
    ],
    "filters": [
        "estate_app.jinja.add",
    ]
}



def property_in_btc(price):
    cur = currency("INR")
    btc_value = float(price)/cur
    return f"BTC - {btc_value:.8f}"

def exp(num):
    return float(num)**2

def add(v1, v2):
    if (v1 + v2) % 2 == 0:
        return int(v1) + int(v2)
    return float(v1) + float(v2)
