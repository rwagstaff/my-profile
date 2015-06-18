package rw.cv

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class CVService {

    @Autowired
    CVRepository repository


    def findCVs() {
        Job dion = new Job(company: 'Dion', title: 'Senior Developer', achievements: [
            'Did some Java',
            'Did some Angular'
        ])
        Job databarracks = new Job(company: 'Databarracks', title: 'Full Stack Developer', achievements: [
            'Built the portal',
            'Left the company'
        ])

        CV cv = new CV(jobs: [dion, databarracks], title: 'Senior Developer')
        return cv
    }

    def findAllCVs() {
        return repository.findAll()
    }

    def findOne(id) {
        return repository.findOne(id)
    }
}
