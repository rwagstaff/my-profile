package rw.cv

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.stereotype.Repository

@Repository
class CVRepository  {

    @Autowired
    MongoTemplate template

    def createCV() {
        template.createCollection(CV)
    }

    def insertCV(CV cv) {
        template.insert(cv)
    }

    def findAll() {
        return template.findAll(CV)
    }

    def findOne(id) {
        return template.findById(id, CV)
    }
}

