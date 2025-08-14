CREATE TABLE track_reviews (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    track_id BIGINT NOT NULL,
    user_difficulty_rating INT NOT NULL CHECK (user_difficulty_rating >= 1 AND user_difficulty_rating <= 10),
    user_review_text TEXT NOT NULL,
    review_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_name VARCHAR(255),
    
    FOREIGN KEY (track_id) REFERENCES tracks(id) ON DELETE CASCADE,
    INDEX idx_track_id (track_id),
    INDEX idx_review_date (review_date)
); 