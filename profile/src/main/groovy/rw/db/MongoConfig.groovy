package rw.db

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.data.mongodb.MongoDbFactory
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.SimpleMongoDbFactory

import com.mongodb.MongoClient

@Configuration
class MongoConfig {

    @Bean
    def MongoDbFactory mongoDbFactory() {
        return new SimpleMongoDbFactory(new MongoClient('127.0.0.1', 32768), 'cv');
    }

    @Bean
    def MongoTemplate mongoTemplate() {
        MongoTemplate mongoTemplate = new MongoTemplate(mongoDbFactory());
        return mongoTemplate;
    }
}
