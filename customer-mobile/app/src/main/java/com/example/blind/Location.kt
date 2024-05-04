package com.example.blind

data class Location(
    val id: String,
    val name: String,
    val path: String,
    val section: List<Section>
) {
    data class Section(
        val name: String,
        val path: String,
        val id: String
    )
}


