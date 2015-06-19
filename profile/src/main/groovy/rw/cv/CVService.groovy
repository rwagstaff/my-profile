package rw.cv

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class CVService {

    @Autowired
    CVRepository repository

    def findAllCVs() {
        return repository.findAll()
    }

    def findOne(id) {
        return repository.findOne(id)
    }

    def findByName(name) {
        return repository.findByName(name)
    }
}
