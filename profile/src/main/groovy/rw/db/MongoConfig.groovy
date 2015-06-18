package rw.db

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.data.mongodb.MongoDbFactory
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.SimpleMongoDbFactory

import com.mongodb.MongoClient

@Configuration
@ConfigurationProperties(prefix='db')
class MongoConfig {

    String host
    Integer port
    String name

    @Bean
    def MongoDbFactory mongoDbFactory() {
        return new SimpleMongoDbFactory(new MongoClient(host, port), name)
    }

    @Bean
    def MongoTemplate mongoTemplate() {
        return new MongoTemplate(mongoDbFactory())
    }
}
