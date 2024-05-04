package com.example.blind

import android.Manifest
import android.app.Activity
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Bundle
import android.speech.RecognizerIntent
import android.util.Log
import android.widget.Button
import android.widget.Toast
import androidx.activity.result.ActivityResultLauncher
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import android.speech.tts.TextToSpeech
import android.media.MediaPlayer
import android.speech.tts.UtteranceProgressListener
import java.util.*

class Home : AppCompatActivity(), TextToSpeech.OnInitListener {
    private lateinit var btnAddProduct: Button
    private lateinit var btnGoToNavigation: Button
    private lateinit var btnOther: Button
    private val RECORD_AUDIO_PERMISSION_CODE = 101
    private lateinit var tts: TextToSpeech
    private lateinit var mediaPlayer: MediaPlayer
    private lateinit var speechRecognitionLauncher: ActivityResultLauncher<Intent>
    private var isSpeechRecognitionInProgress = false
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.home_activity)
        tts = TextToSpeech(this, this)
//        mediaPlayer = MediaPlayer.create(this, R.raw.beep_sound)

        // Initialize views
        btnAddProduct = findViewById(R.id.btn_add_product)
        btnGoToNavigation = findViewById(R.id.btn_go_to_navigation)
        btnOther = findViewById(R.id.btn_other)

        // Set click listener for the buttons
        btnAddProduct.setOnClickListener {
            addProduct()
        }

        btnGoToNavigation.setOnClickListener {
            checkPermissionsAndStartSpeechRecognition()
        }

        btnOther.setOnClickListener {
            otherAction()
        }

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
            val text = "Voice can not recognize"
            val params = Bundle()
            params.putString(TextToSpeech.Engine.KEY_PARAM_UTTERANCE_ID, "utteranceId")
            tts.speak(text, TextToSpeech.QUEUE_FLUSH, params, "utteranceId")
        }
    }

    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<out String>, grantResults: IntArray) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        if (requestCode == RECORD_AUDIO_PERMISSION_CODE) {
            if (grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                startSpeechRecognition()
            } else{
                val text = "Permission Denied"
                val params = Bundle()
                params.putString(TextToSpeech.Engine.KEY_PARAM_UTTERANCE_ID, "utteranceId")
                tts.speak(text, TextToSpeech.QUEUE_FLUSH, params, "utteranceId")
            }
        }
    }

    private fun startSpeechRecognition() {
//        playBeepSound()
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
            Log.d("SpeechRecognition", "Spoken text: $spokenText")
            // Updated specific command to "Go to navigation"
            val specificCommand = "navigation"


            if (spokenText.equals(specificCommand, ignoreCase = true)) {

//                Log.d("SpeechRecognition", "im in the if clause");
//                 Trigger navigation to activity_main.xml
                val intent = Intent(this, MainActivity::class.java)
                startActivity(intent)
            }else {
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

    private fun addProduct() {
        // Implement add product logic here
        Toast.makeText(this, "Add Product button clicked", Toast.LENGTH_SHORT).show()
    }

    private fun otherAction() {
        // Implement other action logic here
        Toast.makeText(this, "Other button clicked", Toast.LENGTH_SHORT).show()
    }

    override fun onInit(status: Int) {
        if (status == TextToSpeech.SUCCESS) {
            // Read content of the page
            val text = "Please select what button would you like to press? First Button, Add Product, Second Button, Go to Navigation, Third Button, Assistance"
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

                @Deprecated("Deprecated in Java")
                override fun onError(utteranceId: String?) {
                    // Handle error if any
                }
            })
        }
    }




//    private fun playBeepSound() {
//        mediaPlayer.start()
//    }

    override fun onDestroy() {
        super.onDestroy()
        // Release resources
        tts.stop()
        tts.shutdown()
//        mediaPlayer.release()
    }
}

