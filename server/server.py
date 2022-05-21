from flask import Flask, Response, request
from flask_cors import CORS, cross_origin
from bson.objectid import ObjectId
from datetime import date
import pymongo
import json

################################################################
app = Flask(__name__)
CORS(app)

try:
    mongo = pymongo.MongoClient(
        host="localhost", port=27017, serverSelectionTimeoutMS=1000
    )
    mongo.server_info()  # trigger exception if cant connect to db
    db = mongo.JobApplicationKanban
except:
    print("ERROR: Could not connect to db")

################################################################

# Create a new job application
@app.route("/api/applications", methods=["POST"])
def createNewApplication():
    try:
        app = {
            "company": request.form["company"],
            "title": request.form["title"],
            "link": request.form["link"],
            "dateApplied": date.today().strftime("%d/%m/%Y"),
            "dateUpdated": date.today().strftime("%d/%m/%Y"),
            "status": "APPLIED",
        }
        dbResponse = db.applications.insert_one(app)
        return Response(
            response=json.dumps(
                {
                    "message": "Application created successfully.",
                    "id": f"{dbResponse.inserted_id}",
                }
            ),
            status=200,
            mimetype="application/json",
        )
    except Exception as e:
        print(e)


# Get all job applications
@app.route("/api/applications", methods=["GET"])
def getApplications():
    try:
        data = list(db.applications.find())
        columns = {}
        for app in data:
            app["_id"] = str(app["_id"])
            if app["status"] in columns:
                columns[app["status"]].push(app)
            else:
                columns[app["status"]] = [app]
        return Response(
            response=json.dumps({"data": data, "columns": columns}),
            status=200,
            mimetype="application/json",
        )
    except Exception as e:
        print(e)
        return Response(
            response=json.dumps({"message": "Cannot retrieve applications."}),
            status=500,
            mimetype="application/json",
        )


# Update a single job application
@app.route("/api/applications/<id>", methods=["PATCH"])
def updateApplication(id):
    try:
        dbResponse = db.applications.update_one(
            {"_id": ObjectId(id)},
            {
                "$set": {
                    "status": request.form["status"],
                    "dateUpdated": date.today().strftime("%d/%m/%Y"),
                }
            },
        )
        return Response(
            response=json.dumps(
                {
                    "message": "Application successfully updated.",
                    "id": f"{id}",
                }
            ),
            status=200,
            mimetype="application/json",
        )
    except Exception as e:
        print(e)
        return Response(
            response=json.dumps({"message": "Cannot update application."}),
            status=500,
            mimetype="application/json",
        )


# Delete a job application
@app.route("/api/applications/<id>", methods=["DELETE"])
def deleteApplication(id):
    try:
        dbResponse = db.applications.delete_one({"_id": ObjectId(id)})
        return Response(
            response=json.dumps(
                {
                    "message": "Application deleted successfully.",
                    "id": f"{id}",
                }
            ),
            status=200,
            mimetype="application/json",
        )
    except Exception as e:
        print(e)
        return Response(
            response=json.dumps({"message": "Cannot delete application."}),
            status=500,
            mimetype="application/json",
        )


################################################################


if __name__ == "__main__":
    app.run(port=5555, debug=True)
