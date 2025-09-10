package com.trackranker

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class TrackRankerApplication

fun main(args: Array<String>) {
    // Redeploy trigger - September 2024
    runApplication<TrackRankerApplication>(*args)
} 