from pymongo import MongoClient
import config

client = MongoClient(config.MONGO_URI) 
db = client["clothes_donation"]

result = db.ngos.update_many({}, {"$set": {"needRaised": False}})
print(f"Updated {result.modified_count} NGOs.")
