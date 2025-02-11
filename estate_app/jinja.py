import frappe


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
    return f"BTC {float(price)/cur}"

def exp(num):
    return float(num)**2


def add(v1,v2):
    if (v1+ v2)%2==0:
        return int(v1) + int(v2)
    return float(v1) + float(v2)
