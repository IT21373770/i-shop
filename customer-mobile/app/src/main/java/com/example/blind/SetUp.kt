package com.example.blind

import android.util.Log
import com.mongodb.MongoException
import com.mongodb.client.model.Filters.eq
import com.mongodb.kotlin.client.coroutine.MongoClient
import com.mongodb.kotlin.client.coroutine.MongoDatabase
import kotlinx.coroutines.flow.firstOrNull
import kotlinx.coroutines.runBlocking
import org.bson.BsonInt64
import org.bson.Document

// Create data class to represent a MongoDB document
data class Aisle(val title: String, val year: Int, val cast: List<String>)

suspend fun main(){
    suspend fun setupConnection(
        databaseName: String = "test",
        connectionEnvVariable: String = "MONGODB_URI"
    ): MongoDatabase? {
        val connectString = if (System.getenv(connectionEnvVariable) != null) {
            System.getenv(connectionEnvVariable)
        } else {
            "mongodb+srv://udayngadissanayke99:d6Q7ZWuYTBSMDQRu@pro-db.ks4li6d.mongodb.net/?retryWrites=true&w=majority&appName=pro-db"
        }

        val client = MongoClient.create(connectionString = connectString)
        val database = client.getDatabase(databaseName = databaseName)
        return try {
            // Send a ping to confirm a successful connection
            val command = Document("ping", BsonInt64(1))
            database.runCommand(command)
            Log.d("Pinged your deployment" ," You successfully connected to MongoDB!")
            database
        } catch (me: MongoException) {
            System.err.println(me)
            null
        }
    }
    setupConnection();
}


