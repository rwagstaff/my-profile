package rw.cv

import org.junit.Ignore
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
    public void shouldDoCrud() {
        CV cv = CVUtils.createMe()
        cv.name = 'Test CV'
        repository.save(cv)
        CV cv2 = repository.findByName(cv.name)
        assert cv2 != null
        repository.delete(cv2)

        def deleted = repository.findByName(cv.name)
        assert deleted == null
    }

    @Test
    @Ignore
    public void createMe() {
        CV cv = CVUtils.createMe()
        repository.save(cv)
    }
}
