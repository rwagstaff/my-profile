package rw.cv

import static org.junit.Assert.*
import groovy.mock.interceptor.MockFor

import org.junit.Test;

class CVServiceTest {

    @Test
    public void shouldFindCV() {
        CVService service= new CVService()
        CV richardCv = service.findCVs()
        assert richardCv.title == 'Senior Developer'
    }

    @Test
    public void shouldFindAllCVs() {
        def mock = new MockFor(CVRepository)
        mock.demand.findAll(1) {
            [
                new CV(title : 'Senior'),
                new CV(title: 'Junior')
            ]
        }

        mock.use {
            def cvService = new CVService()
            //cvService.repository = new CVRepository()
            def cvs = cvService.findAllCVs()
            assert cvs.size() == 2
        }
    }
}
