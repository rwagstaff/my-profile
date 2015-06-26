package rw.cv

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
class CVController {

    @Autowired
    CVService cvService

    @RequestMapping('/cvs')
    def findCV() {
        return cvService.findAllCVs()
    }

    @RequestMapping('/cv/{id}')
    def findOneCV(@PathVariable('id') String id) {
        return cvService.findOne(id)
    }

    @RequestMapping('/cv')
    def findByName(@RequestParam('name') String name) {
        return cvService.findByName(name)
    }
}