package rw

import static org.junit.Assert.*

import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.SpringApplicationConfiguration
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner

import rw.cv.CVService

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application)
class ApplicationContextTest {

    @Autowired
    CVService service

    @Test
    public void test() {
        assert service != null
        println service.findCVs()
    }
}
