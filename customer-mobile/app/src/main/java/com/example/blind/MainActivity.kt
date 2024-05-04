package com.example.blind

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.speech.RecognizerIntent
import android.speech.tts.TextToSpeech
import android.speech.tts.UtteranceProgressListener
import android.util.Log
import android.widget.TextView
import androidx.activity.result.ActivityResultLauncher
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import kotlinx.coroutines.MainScope
import kotlinx.coroutines.launch
import java.util.*

class MainActivity : AppCompatActivity(), TextToSpeech.OnInitListener, FetchDirection.OnDataFetchedListener {


    private lateinit var textToSpeech: TextToSpeech
    private lateinit var tts: TextToSpeech
    private lateinit var speechRecognitionLauncher: ActivityResultLauncher<Intent>

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        textToSpeech = TextToSpeech(this, this)
//        startSpeechRecognition()

        speechRecognitionLauncher = registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { result ->
            onSpeechRecognitionResult(result.resultCode, result.data)
        }
    }

    override fun onInit(status: Int) {
        if (status == TextToSpeech.SUCCESS) {
            val message = "You are in the navigation page. Please give a command on where you need to go"
            val params = Bundle()
            params.putString(TextToSpeech.Engine.KEY_PARAM_UTTERANCE_ID, "utteranceId")
            textToSpeech.speak(message, TextToSpeech.QUEUE_FLUSH, params, "utteranceId")

            textToSpeech.setOnUtteranceProgressListener(object : UtteranceProgressListener() {
                override fun onStart(utteranceId: String?) {
                    // Do nothing
                }

                override fun onDone(utteranceId: String?) {
                    if (utteranceId == "utteranceId") {
                        startSpeechRecognition()
                    }
                }
                @Deprecated("Error")
                override fun onError(utteranceId: String?) {
                    // Handle error if any
                }
            })
        } else {
            Log.e("TTS", "Initialization failed")
        }
    }

    private fun startSpeechRecognition() {
        val intent = Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH).apply {
            putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM)
            putExtra(RecognizerIntent.EXTRA_LANGUAGE, Locale.getDefault())
            putExtra(RecognizerIntent.EXTRA_PROMPT, "Say something!")
        }
//        startActivityForResult(intent, SPEECH_RECOGNITION_REQUEST)
        speechRecognitionLauncher.launch(intent)
    }

//    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
//        super.onActivityResult(requestCode, resultCode, data)
//        if (requestCode == SPEECH_RECOGNITION_REQUEST && resultCode == RESULT_OK) {
//            val resultText: ArrayList<String>? = data?.getStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS)
//            val spokenText = resultText?.get(0).toString()
//            Log.d("SpeechRecognition", "Command: $spokenText")
//            // Call FetchDirection AsyncTask with the spokenText as argument
////            FetchDirection(this).execute(spokenText)
//            val intent = Intent(this, FetchDirection::class.java)
//            startActivity(intent)
//        } else {
////            Toast.makeText(this, "Speech recognition failed", Toast.LENGTH_SHORT).show()
////            finish() // Finish activity if speech recognition fails
//
//            val message = "Speech recognition failed"
//            val params = Bundle()
//            params.putString(TextToSpeech.Engine.KEY_PARAM_UTTERANCE_ID, "utteranceId")
//            textToSpeech.speak(message, TextToSpeech.QUEUE_FLUSH, params, "utteranceId")
//
//            textToSpeech.setOnUtteranceProgressListener(object : UtteranceProgressListener() {
//                override fun onStart(utteranceId: String?) {
//                    // Do nothing
//                }
//
//                override fun onDone(utteranceId: String?) {
//                    if (utteranceId == "utteranceId") {
//                        startSpeechRecognition()
//                    }
//                }
//
//                override fun onError(utteranceId: String?) {
//                    // Handle error if any
//                }
//            })
//
//        }
//    }

    private fun onSpeechRecognitionResult(resultCode: Int, data: Intent?) {
        if (resultCode == Activity.RESULT_OK) {
            val resultText: ArrayList<String>? = data?.getStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS)
            val spokenText = resultText?.get(0).toString()
//            val intent = Intent(this, FetchDirection::class.java)
//            intent.putExtra("spokenText", spokenText)
//            startActivity(intent)
            //Log.d("SpeechRecognition", "Spoken text: $spokenText")
            // Updated specific command to "Go to navigation"
            //val specificCommand = "section"
            val fetchDirection = FetchDirection(object : FetchDirection.OnDataFetchedListener {
                override fun onDataFetched(aisleList: List<Location>, sectionList: List<Location.Section>) {
                    val aisle = aisleList.firstOrNull() // Assuming you only have one aisle/location
                    val section = sectionList.firstOrNull() // Assuming you only have one section
                    Log.d("SpeechRecognition", "Aisle: $aisle")
                    Log.d("SpeechRecognition", "Section: $section")
                    if (aisle != null && section != null) {
                        val message = "You have to go to ${aisle.name}.So ${aisle.path}. There is a ${section.name} and you have to make ${section.path}"
                        val params = Bundle()
                        params.putString(TextToSpeech.Engine.KEY_PARAM_UTTERANCE_ID, "utteranceId")
                        textToSpeech.speak(message, TextToSpeech.QUEUE_FLUSH, params, "utteranceId")

                        val intent = Intent(this@MainActivity, Home::class.java)
                        startActivity(intent)
                    } else {
                        val errorMessage = "Location data not found or incomplete."
                        val params = Bundle()
                        params.putString(TextToSpeech.Engine.KEY_PARAM_UTTERANCE_ID, "utteranceId")
                        textToSpeech.speak(errorMessage, TextToSpeech.QUEUE_FLUSH, params, "utteranceId")
                    }
                }
            })

            MainScope().launch {
                fetchDirection.fetchDirection(spokenText)
            }

        } else {
            val text = "Speech recognition failed"
            val params = Bundle()
            params.putString(TextToSpeech.Engine.KEY_PARAM_UTTERANCE_ID, "utteranceId")
            tts.speak(text, TextToSpeech.QUEUE_FLUSH, params, "utteranceId")

            tts.setOnUtteranceProgressListener(object : UtteranceProgressListener() {
                override fun onStart(utteranceId: String?) {
                    // Do nothing
                }

                override fun onDone(utteranceId: String?) {
                    if (utteranceId == "utteranceId") {
                        startSpeechRecognition()
                    }
                }
                @Deprecated("Error")
                override fun onError(utteranceId: String?) {
                    // Handle error if any
                }
            })

        }
    }

    override fun onDestroy() {
        // Shutdown TextToSpeech when activity is destroyed
//        if (textToSpeech != null) {
            super.onDestroy()
            textToSpeech.stop()
            textToSpeech.shutdown()
        //}

    }

    override fun onDataFetched(aisleList: List<Location>, sectionList: List<Location.Section>) {
        // Handle fetched data here
        val stringBuilder = StringBuilder()
        for (direction in aisleList) {
            stringBuilder.append("ID: ${direction.id}\n")
            stringBuilder.append("Name: ${direction.name}\n")
            stringBuilder.append("Path: ${direction.path}\n")

            // Handle sections
            for (section in direction.section) {
                stringBuilder.append("Section ID: ${section.id}\n")
                stringBuilder.append("Section Name: ${section.name}\n")
                stringBuilder.append("Section Path: ${section.path}\n")
            }

            stringBuilder.append("\n") // Add some spacing between directions
        }

        // Assuming you have a TextView with id "textView" to display the data
//        runOnUiThread {

        findViewById<TextView>(R.id.tv_text).text = stringBuilder.toString()
        val logContent = stringBuilder.toString()
        Log.d("DataFetched",logContent)
//        }
    }

    companion object {
        private const val SPEECH_RECOGNITION_REQUEST = 100
    }
}

