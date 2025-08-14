package com.trackranker.controller

import com.trackranker.service.EmailService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

data class ContactRequest(
    val email: String,
    val subject: String,
    val message: String
)

@RestController
@RequestMapping("/contact")
class ContactController(private val emailService: EmailService) {
    
    @PostMapping("/submit")
    fun submitContact(@RequestBody request: ContactRequest): ResponseEntity<Map<String, String>> {
        return try {
            val success = emailService.sendContactEmail(
                userEmail = request.email,
                subject = request.subject,
                message = request.message
            )
            
            if (success) {
                ResponseEntity.ok(mapOf("message" to "Message sent successfully!"))
            } else {
                ResponseEntity.status(500).body(mapOf("error" to "Failed to send message"))
            }
        } catch (e: Exception) {
            ResponseEntity.status(500).body(mapOf("error" to "An error occurred"))
        }
    }
} 