package rw

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class RichController {

    @Autowired
    String framework;

    @RequestMapping("/rich")
    String home() {
        return 'Hello World from ' + framework;
    }
}