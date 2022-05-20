from flask import Flask, Response, request
from bson.objectid import ObjectId
import pymongo
import json

################################################################
app = Flask(__name__)

try:
    mongo = pymongo.MongoClient(
        host="localhost", port=27017, serverSelectionTimeoutMS=1000
    )
    mongo.server_info()  # trigger exception if cant connect to db
    db = mongo.test
except:
    print("ERROR: Could not connect to db")

################################################################

# Create a single user
@app.route("/users", methods=["POST"])
def create_user():
    try:
        user = {"name": request.form["name"], "email": request.form["email"]}
        dbResponse = db.users.insert_one(user)
        return Response(
            response=json.dumps(
                {
                    "message": "User created successfully.",
                    "id": f"{dbResponse.inserted_id}",
                }
            ),
            status=200,
            mimetype="application/json",
        )
    except Exception as e:
        print(e)


# Get all users
@app.route("/users", methods=["GET"])
def get_users():
    try:
        data = list(db.users.find())
        for user in data:
            user["_id"] = str(user["_id"])
        return Response(
            response=json.dumps(data),
            status=200,
            mimetype="application/json",
        )
    except Exception as e:
        print(e)
        return Response(
            response=json.dumps({"message": "Cannot retrieve users."}),
            status=500,
            mimetype="application/json",
        )


# Update a single user
@app.route("/users/<id>", methods=["PATCH"])
def update_user(id):
    try:
        dbResponse = db.users.update_one(
            {"_id": ObjectId(id)}, {"$set": {"name": request.form["name"]}}
        )
        return Response(
            response=json.dumps(
                {
                    "message": "User successfully updated.",
                    "id": f"{id}",
                }
            ),
            status=200,
            mimetype="application/json",
        )
    except Exception as e:
        print(e)
        return Response(
            response=json.dumps({"message": "Cannot update user."}),
            status=500,
            mimetype="application/json",
        )


# Delete a single user
@app.route("/users/<id>", methods=["DELETE"])
def delete_user(id):
    try:
        dbResponse = db.users.delete_one({"_id": ObjectId(id)})
        return Response(
            response=json.dumps(
                {
                    "message": "User successfully deleted.",
                    "id": f"{id}",
                }
            ),
            status=200,
            mimetype="application/json",
        )
    except Exception as e:
        print(e)
        return Response(
            response=json.dumps({"message": "Cannot delete user."}),
            status=500,
            mimetype="application/json",
        )


################################################################


if __name__ == "__main__":
    app.run(port=5555, debug=True)
