from covidIndiaApp import app
import json, plotly
from flask import render_template
from wrangling_scripts.wrangle_data import return_counts,return_testsdata,return_agegroups,return_hosp,return_worldmap
import pandas as pd


@app.route('/getFigure', methods=['GET'])
def index():

    figures = return_figures()

    # plot ids for the html id tag
    ids = ['figure-{}'.format(i) for i, _ in enumerate(figures)]

    # Convert the plotly figures to JSON for javascript in html template
    figuresJSON = json.dumps(figures, cls=plotly.utils.PlotlyJSONEncoder)

    return (figuresJSON)

@app.route("/getCounts",methods=["GET"])
def getCounts():
    df=return_counts()
    return df.to_json(orient='records')

@app.route("/getTests",methods=["GET"])
def getTests():
    df=return_testsdata()
    return df

@app.route("/getAges",methods=["GET"])
def getAges():
    df=return_agegroups()
    return df

@app.route("/getHospitals",methods=["GET"])
def getHospitals():
    df=return_hosp()
    return df

@app.route("/getWorldmap",methods=["GET"])
def getWorldmap():
    df=return_worldmap()
    return df