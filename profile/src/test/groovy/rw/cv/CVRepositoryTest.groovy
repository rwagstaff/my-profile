package rw.cv

import static org.junit.Assert.*

import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.SpringApplicationConfiguration
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner

import rw.Application

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application)
class CVRepositoryTest {

    @Autowired
    private CVRepository repository

    @Test
    public void test() {
        CV cv = new CVService().findCVs()
        repository.insertCV(cv)
        println 'done!'
    }
}
