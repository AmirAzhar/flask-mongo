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
@app.route("/api/jobs/apply", methods=["POST"])
def createJob():
    try:
        data = list(db.jobs.find({"status": "APPLIED"}))
        app = {
            "company": request.form["company"],
            "title": request.form["title"],
            "link": request.form["link"],
            "dateApplied": date.today().strftime("%d/%m/%Y"),
            "dateUpdated": date.today().strftime("%d/%m/%Y"),
            "status": "APPLIED",
            "index": len(data),
        }
        dbResponse = db.jobs.insert_one(app)
        return Response(
            response=json.dumps(
                {
                    "message": "Job created successfully.",
                    "id": f"{dbResponse.inserted_id}",
                }
            ),
            status=200,
            mimetype="application/json",
        )
    except Exception as e:
        print(e)


# Get all job jobs
@app.route("/api/jobs/all", methods=["GET"])
def getAllJobs():
    try:
        jobs = {}
        for job in list(db.jobs.find()):
            job["_id"] = str(job["_id"])
            jobs[job["_id"]] = job

        return Response(
            response=json.dumps(jobs),
            status=200,
            mimetype="application/json",
        )
    except Exception as e:
        print(e)
        return Response(
            response=json.dumps({"message": "Cannot retrieve jobs."}),
            status=500,
            mimetype="application/json",
        )


# Get all jobs listed by columns and get column order
@app.route("/api/jobs/columns", methods=["GET"])
def getJobsColumns():
    try:
        columns = {
            "APPLIED": {"id": "APPLIED", "jobs": []},
            "INTERVIEW": {"id": "INTERVIEW", "jobs": []},
            "OFFER": {"id": "OFFER", "jobs": []},
            "REJECTED": {"id": "REJECTED", "jobs": []},
        }
        columnOrder = ["APPLIED", "INTERVIEW", "OFFER", "REJECTED"]

        for job in list(db.jobs.find()):
            job["_id"] = str(job["_id"])
            columns[job["status"]]["jobs"].append((job["index"], job["_id"]))

        for col in columns:
            columns[col]["jobs"].sort(key=lambda tup: tup[1])

        return Response(
            response=json.dumps({"columns": columns, "columnOrder": columnOrder}),
            status=200,
            mimetype="application/json",
        )
    except Exception as e:
        print(e)
        return Response(
            response=json.dumps({"message": "Cannot retrieve jobs columns."}),
            status=500,
            mimetype="application/json",
        )


# Update a single job application
@app.route("/api/jobs/<id>", methods=["PATCH"])
def updateJob(id):
    try:
        dbResponse = db.jobs.update_one(
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
                    "message": "Job successfully updated.",
                    "id": f"{id}",
                }
            ),
            status=200,
            mimetype="application/json",
        )
    except Exception as e:
        print(e)
        return Response(
            response=json.dumps({"message": "Cannot update job."}),
            status=500,
            mimetype="application/json",
        )


# Delete a job application
@app.route("/api/jobs/<id>", methods=["DELETE"])
def deleteApplication(id):
    try:
        dbResponse = db.jobs.delete_one({"_id": ObjectId(id)})
        return Response(
            response=json.dumps(
                {
                    "message": "Job deleted successfully.",
                    "id": f"{id}",
                }
            ),
            status=200,
            mimetype="application/json",
        )
    except Exception as e:
        print(e)
        return Response(
            response=json.dumps({"message": "Cannot delete job."}),
            status=500,
            mimetype="application/json",
        )


################################################################


if __name__ == "__main__":
    app.run(port=5555, debug=True)
