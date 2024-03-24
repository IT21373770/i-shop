package com.example.blind
import android.Manifest
import android.app.Activity
import android.content.Intent
import android.content.pm.PackageManager
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.speech.RecognizerIntent
import android.speech.tts.TextToSpeech
import android.speech.tts.UtteranceProgressListener
import android.util.Log
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import androidx.activity.result.ActivityResultLauncher
import androidx.activity.result.contract.ActivityResultContracts
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import java.util.*

class MainActivity : AppCompatActivity(), TextToSpeech.OnInitListener {

    private lateinit var btn_button: Button
    private lateinit var tv_text: TextView
    private val RECORD_AUDIO_PERMISSION_CODE = 101
    private lateinit var speechRecognitionLauncher: ActivityResultLauncher<Intent>
    private lateinit var textToSpeech: TextToSpeech

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        Log.d("SpeechRecognition", "i'm in main activity")

        // Initialize views
        btn_button = findViewById(R.id.btn_button)
        tv_text = findViewById(R.id.tv_text)

        // Initialize TextToSpeech
        textToSpeech = TextToSpeech(this, this)

        // Initialize the launcher
        speechRecognitionLauncher = registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { result ->
            onSpeechRecognitionResult(result.resultCode, result.data)
        }

        checkPermissionsAndStartSpeechRecognition()
    }

    private fun checkPermissionsAndStartSpeechRecognition() {
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.RECORD_AUDIO) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this, arrayOf(Manifest.permission.RECORD_AUDIO), RECORD_AUDIO_PERMISSION_CODE)
        } else {
            startSpeechRecognition()
        }
    }

    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<out String>, grantResults: IntArray) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        if (requestCode == RECORD_AUDIO_PERMISSION_CODE) {
            if (grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                startSpeechRecognition()
            } else {
                Toast.makeText(this, "Permission Denied", Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun startSpeechRecognition() {
        val intent = Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH).apply {
            putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM)
            putExtra(RecognizerIntent.EXTRA_LANGUAGE, Locale.getDefault())
            putExtra(RecognizerIntent.EXTRA_PROMPT, "Say something!")
        }
        speechRecognitionLauncher.launch(intent)
    }

    private fun onSpeechRecognitionResult(resultCode: Int, data: Intent?) {
        if (resultCode == Activity.RESULT_OK) {

            val resultText: ArrayList<String>? = data?.getStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS)
            val spokenText = resultText?.get(0).toString()
            Log.d("SpeechRecognition", "Navigation_text: $spokenText")
            tv_text.text = spokenText


            // Now, you can search for the text in the MongoDB database and retrieve the data

            // After getting the data, speak it out to the user
            speakDataToUser("Your data from the database goes here")
        } else {
            Toast.makeText(this, "Speech recognition failed", Toast.LENGTH_SHORT).show()
        }
    }

    private fun speakDataToUser(data: String) {
        val params = Bundle()
        params.putString(TextToSpeech.Engine.KEY_PARAM_UTTERANCE_ID, "utteranceId")
        textToSpeech.speak(data, TextToSpeech.QUEUE_FLUSH, params, "utteranceId")
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

                override fun onError(utteranceId: String?) {
                    // Handle error if any
                }
            })
        } else {
            Log.e("TTS", "Initialization failed")
        }
    }

    override fun onDestroy() {
        // Shutdown TextToSpeech when activity is destroyed
        if (textToSpeech != null) {
            textToSpeech.stop()
            textToSpeech.shutdown()
        }
        super.onDestroy()
    }
}
