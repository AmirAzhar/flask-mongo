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

def getAllJobsHelper():
    jobs = {}
    jobsList = list(db.jobs.find())
    for job in jobsList:
        job["_id"] = str(job["_id"])
        jobs[job["_id"]] = job
    
    return jobs
    
def getJobsColumnsHelper():
    columns = {
        "APPLIED": {"id": "APPLIED", "jobs": []},
        "INTERVIEW": {"id": "INTERVIEW", "jobs": []},
        "OFFER": {"id": "OFFER", "jobs": []},
        "REJECTED": {"id": "REJECTED", "jobs": []},
    }
    columnOrder = ["APPLIED", "INTERVIEW", "OFFER", "REJECTED"]

    for job in list(db.jobs.find()):
        job["_id"] = str(job["_id"])
        columns[job["status"]]["jobs"].append(job["_id"])
    
    return columns, columnOrder
    

# Create a new job application
@app.route("/api/jobs/apply", methods=["POST"])
def createJob():
    try:
        content = request.get_json()
        app = {
            "company": content["company"],
            "title": content["title"],
            "link": content["link"],
            "remarks": content["remarks"],
            "dateApplied": date.today().strftime("%d/%m/%Y"),
            "dateUpdated": date.today().strftime("%d/%m/%Y"),
            "status": "APPLIED",
        }
        dbResponse = db.jobs.insert_one(app)
        newJob = db.jobs.find_one({"_id": dbResponse.inserted_id})
        newJob["_id"] = str(newJob["_id"])
        
        
        jobs = getAllJobsHelper()
        columns, columnOrder = getJobsColumnsHelper()
        
        return Response(
            response=json.dumps(
                {
                    "message": "Job created successfully.",
                    "newJob": newJob,
                    "jobs": jobs,
                    "columns": columns,
                    "columnOrder": columnOrder
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
        jobs = getAllJobsHelper()

        return Response(
            response=json.dumps({"jobs": jobs}),
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
        columns, columnOrder = getJobsColumnsHelper()

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
@app.route("/api/jobs/status/<id>", methods=["PATCH"])
def updateJobStatus(id):
    try:
        content = request.get_json()
        dbResponse = db.jobs.update_one(
            {"_id": ObjectId(id)},
            {
                "$set": {
                    "status": content['status'],
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

@app.route("/api/jobs/remarks/<id>", methods=["PATCH"])
def updateJobRemarks(id):
    try:
        content = request.get_json()
        dbResponse = db.jobs.update_one(
            {"_id": ObjectId(id)},
            {
                "$set": {
                    "remarks": content['remarks'],
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
