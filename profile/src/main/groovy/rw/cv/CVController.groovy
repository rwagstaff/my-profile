package rw.cv

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class CVController {

    @Autowired
    CVService cvService;

    @RequestMapping('/cv')
    def findCV() {
        return cvService.findAllCVs()
    }

    @RequestMapping('/cv/{id}')
    def findOneCV(@PathVariable('id') String id) {
        return cvService.findOne(id)
    }
}