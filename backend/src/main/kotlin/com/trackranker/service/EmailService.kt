package com.trackranker.service

import com.sendgrid.Method
import com.sendgrid.Request
import com.sendgrid.SendGrid
import com.sendgrid.helpers.mail.Mail
import com.sendgrid.helpers.mail.objects.Content
import com.sendgrid.helpers.mail.objects.Email
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import org.slf4j.LoggerFactory

@Service
class EmailService {
    
    private val logger = LoggerFactory.getLogger(EmailService::class.java)
    
    @Value("\${sendgrid.api.key}")
    private lateinit var sendGridApiKey: String
    
    @Value("\${sendgrid.from.email}")
    private lateinit var fromEmail: String
    
    @Value("\${sendgrid.to.email}")
    private lateinit var toEmail: String
    
    fun sendContactEmail(userEmail: String, subject: String, message: String): Boolean {
        return try {
            logger.info("Attempting to send email from $fromEmail to $toEmail")
            logger.info("API Key length: ${sendGridApiKey.length}")
            
            val from = Email(fromEmail)
            val to = Email(toEmail)
            val emailSubject = "Track Ranker Contact: $subject"
            
            val emailContent = """
                New contact form submission from Track Ranker:
                
                From: $userEmail
                Subject: $subject
                Message:
                $message
            """.trimIndent()
            
            val content = Content("text/plain", emailContent)
            val mail = Mail(from, emailSubject, to, content)
            
            val sg = SendGrid(sendGridApiKey)
            val request = Request()
            request.method = Method.POST
            request.endpoint = "mail/send"
            request.body = mail.build()
            
            logger.info("Sending request to SendGrid...")
            val response = sg.api(request)
            logger.info("SendGrid response status: ${response.statusCode}")
            logger.info("SendGrid response body: ${response.body}")
            
            val success = response.statusCode in 200..299
            if (!success) {
                logger.error("SendGrid returned error status: ${response.statusCode}")
                logger.error("SendGrid error body: ${response.body}")
            }
            
            success
        } catch (e: Exception) {
            logger.error("Exception in sendContactEmail: ${e.message}", e)
            false
        }
    }
} 