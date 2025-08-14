CREATE TABLE track_suggestions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    track_name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    suggestion_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    
    INDEX idx_status (status),
    INDEX idx_suggestion_date (suggestion_date)
); 